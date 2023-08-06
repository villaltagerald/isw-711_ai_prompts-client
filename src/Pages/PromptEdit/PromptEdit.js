import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import { PromptsGet } from '../../Datos/Prompts/PromptsGet';
import { PromptsPatch } from '../../Datos/Prompts/PromptsPatch';
import { CheckBox } from '../../Components/ChecBox/ChecBox';
//OpenAi
import { ImagePost } from '../../Datos/OpenAi/ImagePost';
import { EditPost } from '../../Datos/OpenAi/EditPost';
import { CompletitionPost } from '../../Datos/OpenAi/CompletitionPost';
//Estilo
import './PromptEdit.scss';
import Spinner from '../../Components/Spinner/Spinner';

export function PromptEdit() {

  const { promptId } = useParams();//ID PASADO POR URL
  const [questionsData, setQuestionsData] = useState([]);//ARREGLO PARA LAS RESPUESTAS
  const [isLoading, setIsLoading] = useState(false);
  const [isQuestionModified, setIsQuestionModified] = useState({});// Estado para rastrear las preguntas modificadas
  const [isQuestionExecuted, setIsQuestionExecuted] = useState({}); // Estado para rastrear las preguntas ejecutadas

  //OBJETO SEGUNDARIO
  const [question, setQuestion] = useState({
    responseCount: 1,
    input: "",
    instruction: "",
    temperature: 1,
    imagesize: ""
  });
  //OBJETO PRINCIPAL
  const [promptData, setPromptData] = useState({
    _id: '',
    name: '',
    type: '',
    tags: [],
    response: [],
    questions: []
  });

  // CONSULTAR EL PROMPT POR ID 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const promptResponse = await PromptsGet(promptId);
        const { _id, name, type, tags, questions } = promptResponse;
        const updatedPromptData = {
          _id,
          name,
          type,
          tags,
          questions: promptData.questions
        };
        setPromptData(updatedPromptData);
        setQuestionsData(questions);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  //RESIVE LA RESPUESTA DEL PATCH Y LA ACTUALIZA EN LAS VARIABLES
  const promptEdit = (respronsePrompt) => {
    alert('Prompt edit');
    const { _id, name, type, tags, questions } = respronsePrompt;
    const updatedPromptData = {
      _id,
      name,
      type,
      tags,
      questions: promptData.questions // Mantienes las preguntas existentes
    };
    setPromptData(updatedPromptData);
    setQuestionsData(questions);
    setQuestion({
      responseCount: 1,
      input: "",
      instruction: "",
      temperature: 1,
      imagesize: ""
    });
  }
  //CAPTURA LOS DATOS DEL OBJETO PRINCIPAL
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPromptData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  //ACTUALIZAR EL OBJETO PRINCIPAL CADA VEZ QUE SE MODIFIQUE EL SEGUNDARIO
  useEffect(() => {
    setPromptData((prevFormData) => ({
      ...prevFormData,
      questions: { ...question },
    }));
  }, [question]);

  //CAPTURAR INFORMACION DE LOS INPUT DEL OBJETO SEGUNDARIO
  const handleChangeQuestion = (e) => {
    const { name, value } = e.target;
    setQuestion((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

  };

  //CAPTURA LOS CAMBIOS EN LAS PREGUNTAS GUARDADAS SIN RESPUESTA
  const handleChangeResponse = (e, id) => {
    const { name, value } = e.target;
    setQuestionsData((prevData) => {
      const updatedData = prevData.map((question) => {
        if (question._id === id) {
          return {
            ...question,
            [name]: value,
          };
        }
        return question;
      });
      return updatedData;
    });
    setIsQuestionModified((prevIsQuestionModified) => ({
      ...prevIsQuestionModified,
      [id]: true,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    promptEdit(await PromptsPatch(promptId, promptData));
    //console.log(promptData);
  };

  //ACTUALIZA LOS PROMPT YA GUARDADOS
  const updateQuestion = async (e, id) => {
    e.preventDefault();
    const data = questionsData.find((question) => question._id === id);
    const dataprompt = { questions: data }
    //console.log(id);
    promptEdit(await PromptsPatch(promptId, dataprompt));
    if (isQuestionExecuted[id]) {
      const { [id]: _, ...QuestionExecuted } = isQuestionExecuted;
      setIsQuestionExecuted(QuestionExecuted);
    }
  };

  //CARGAR LAS REPUESTAS UNA VEZ EJECUTADO 
  const updateResponse = (questionId, newResponse) => {
    setQuestionsData(prevQuestionsData => {
      return prevQuestionsData.map(question => {
        if (question._id === questionId) {
          return { ...question, response: newResponse };
        }
        return question;
      });
    });
  };

  //FUNCION DEL BOTON EJECUTAR HACE LA SOLICITUD AL API
  const createResponse = async (data) => {
    //console.log(data)
    if (promptData.type === 'Images') {
      setIsLoading(true);
      const response = await ImagePost(data);
      updateResponse(data._id, response);
    } else if (promptData.type === 'Edit') {
      setIsLoading(true);
      const response = await EditPost(data);
      updateResponse(data._id, response);
    } else {
      setIsLoading(true);
      const response = await CompletitionPost(data);
      updateResponse(data._id, response);
    }
    setIsLoading(false);
    // Después de ejecutar la pregunta, actualiza el estado para rastrear que la pregunta se ha ejecutado
    setIsQuestionExecuted((prevIsQuestionExecuted) => ({
      ...prevIsQuestionExecuted,
      [data._id]: true,
    }));
  }

  return (
    <div className="containerEdit">
      <div className="containerEdit__box">
        <h2>Edit Prompt</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <label className="input-group-text">Name:</label>
            <input className="form-control" type="text" id="name" name="name" value={promptData.name} onChange={handleChange} required />
          </div>
          <CheckBox formData={promptData} setFormData={setPromptData} />
          <div className="input-group mb-3">
            <label className="input-group-text">Type:</label>
            <input className="form-control" type="text" id="type" name="type" value={promptData.type} readOnly />
          </div>
          {/*inicio de respuestas*/}
          {questionsData && questionsData.map((question, index) => (
            <div className="containerEdit__box__respont" key={index}>
              <div className="input-group mb-3" key={index}>
                <label className="input-group-text">Response Count:</label>
                <input className="form-control" type="number" id="responseCount" name="responseCount" value={question.responseCount} readOnly={question.response && question.response.length > 0} onChange={(e) => handleChangeResponse(e, question._id)} />
              </div>
              {promptData.type === 'Edit' && (
                <div>
                  <div className="input-group mb-3">
                    <label className="input-group-text">Temperature:</label>
                    <input className="form-control" type="number" id="temperature" name="temperature" value={question.temperature} readOnly={question.response && question.response.length > 0} onChange={(e) => handleChangeResponse(e, question._id)} />
                  </div>
                  <div className="input-group mb-3">
                    <label className="input-group-text">Input:</label>
                    <textarea className="form-control" id="input" name="input" value={question.input} readOnly={question.response && question.response.length > 0} onChange={(e) => handleChangeResponse(e, question._id)} />
                  </div>
                </div>
              )}

              {promptData.type === 'Images' && (
                <div>
                  <div className="input-group mb-3">
                    <label className="input-group-text">Image Size:</label>
                    <select class="form-select" id="imagesize" name="imagesize" value={question.imagesize} onChange={(e) => handleChangeResponse(e, question._id)} disabled={question.response && question.response.length > 0}  >
                      <option value="">Select image size</option>
                      <option value="256x256">256x256</option>
                      <option value="512x512">512x512</option>
                      <option value="1024x1024">1024x1024</option>
                    </select>
                  </div>
                </div>
              )}

              {promptData.type === 'Completitions' && (
                <div className="input-group mb-3">
                  <label className="input-group-text">Temperature:</label>
                  <input className="form-control" type="number" id="temperature" name="temperature" min="0" max="2" step="1" value={question.temperature} readOnly={question.response && question.response.length > 0} onChange={(e) => handleChangeResponse(e, question._id)} />
                </div>
              )}

              <div className="input-group mb-3">
                <label className="input-group-text">Instruction:</label>
                <textarea className="form-control" id="instruction" name="instruction" value={question.instruction} readOnly={question.response && question.response.length > 0} onChange={(e) => handleChangeResponse(e, question._id)} />
              </div>
              {question.response && question.response.length > 0 ?
                <div className="input-group mb-3">
                  {promptData.type === 'Edit' || promptData.type === 'Completitions' ? (
                    question.response.map((response, index) => (
                      <div className="input-group mb-3" key={index}>
                        <label className={`response${index}`}>Response {index + 1}:</label>
                        <textarea className="form-control" id={`response${index}`} name={`response${index}`} value={response?.trim()} readOnly />
                      </div>
                    ))) : (question.response.map((url, index) => (
                      <div className="input-group mb-3" key={index}>
                        <label className={`response${index}`}>Response {index + 1}:</label>
                        <img src={url} alt={index + 1} style={{ width: '200px', height: 'auto' }} />
                      </div>
                    ))
                  )}{isQuestionExecuted[question._id] && (
                    <button type="button" onClick={(e) => updateQuestion(e, question._id)}>Save Response</button>)}
                </div> :
                (isLoading ? <Spinner /> : (
                  <div >
                    <button type="button" onClick={() => createResponse(question)}>Execute</button>
                    <button type="button" className={!isQuestionModified[question._id] ? 'disabledButton' : ''} onClick={(e) => updateQuestion(e, question._id)} disabled={!isQuestionModified[question._id]} >Update</button>
                  </div>
                ))}
            </div>
          ))}
          {/*fin de respuestas*/}
          <div className="input-group mb-3">
            <label className="input-group-text">Response Count:</label>
            <input className="form-control" type="number" id="responseCount" name="responseCount" min="0" max="10" value={question.responseCount} onChange={handleChangeQuestion} />
          </div>
          {promptData.type === 'Edit' && (
            <div>
              <div className="input-group mb-3">
                <label className="input-group-text">Temperature:</label>
                <input className="form-control" type="number" id="temperature" name="temperature" min="0" max="2" step="1" value={question.temperature} onChange={handleChangeQuestion} />
              </div>
              <div className="input-group mb-3">
                <label className="input-group-text">Input:</label>
                <textarea className="form-control" id="input" name="input" value={question.input} onChange={handleChangeQuestion} />
              </div>
            </div>
          )}
          {promptData.type === 'Images' && (
            <div>
              <div className="input-group mb-3">
                <label className="input-group-text">Image Size:</label>
                <select class="form-select" id="imagesize" name="imagesize" value={question.imagesize} onChange={handleChangeQuestion}  >
                  <option value="">Select image size</option>
                  <option value="256x256">256x256</option>
                  <option value="512x512">512x512</option>
                  <option value="1024x1024">1024x1024</option>
                </select>
              </div>
            </div>
          )}{promptData.type === 'Completitions' && (
            <div className="input-group mb-3">
              <label className="input-group-text">Temperature:</label>
              <input className="form-control" type="number" id="temperature" name="temperature" min="0" max="2" step="1" value={question.temperature} onChange={handleChangeQuestion} />
            </div>
          )}
          <div className="input-group mb-3">
            <label className="input-group-text">Instruction:</label>
            <textarea className="form-control" id="instruction" name="instruction" value={question.instruction} onChange={handleChangeQuestion} />
          </div>
          <div className="containerEdit__box__buttons">
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
