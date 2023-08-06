import './PromptView.scss';
import { PromptsGet } from '../../Datos/Prompts/PromptsGet';

import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

export const PromptView = () => {

  const { promptId } = useParams();
  const question = [{
    responseCount: "",
    input: "",
    instruction: "",
    temperature: "",
    imagesize: ""
  }];
  const [promptData, setPromptData] = useState({
    userId: '',
    name: '',
    type: '',
    tags: [],
    questions: question
  });

  //HACE LA CONSULTA AL API AL REDERIZAR
  useEffect(() => {
    const fetchData = async () => {
      try {
        const promptResponse = await PromptsGet(promptId);
        setPromptData(promptResponse);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [promptId]);

  return (
    <div className="container">
      <div className="container__box">
        <h2>View Prompt</h2>
        <form>
          <div className="input-group mb-3">
            <label className="input-group-text">Name:</label>
            <input className="form-control" type="text" id="name" name="name" value={promptData.name} readOnly />
          </div>
          <div className="input-group mb-3">
            <label className="input-group-text">Type:</label>
            <input className="form-control" type="text" id="type" name="type" value={promptData.type} readOnly />
          </div>
          <div className="container__box__tags">
            {promptData.tags.map((tag, index) => (
              <div key={index} className="container__box__tags__tag">
                <p>{tag.tagId}</p>
                <div className="container__box__tags__tag__sub">
                  {tag.subTags.map((subTag, subIndex) => (
                    <span key={subIndex} className="container__box__tags__tag__sub">
                      {subTag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {promptData.questions.map((question, index) => (
            <div className="container__box__respont" key={index}>
              <div className="input-group mb-3" key={index}>
                <label className="input-group-text">Response Count:</label>
                <input className="form-control" type="number" id="responseCount" name="responseCount" value={question.responseCount} readOnly />
              </div>
              {promptData.type === 'Edit' && (
                <div>
                  <div className="input-group mb-3">
                    <label className="input-group-text">Temperature:</label>
                    <input className="form-control" type="number" id="temperature" name="temperature" value={question.temperature} readOnly />
                  </div>
                  <div className="input-group mb-3">
                    <label className="input-group-text">Input:</label>
                    <textarea className="form-control" id="input" name="input" value={question.input} readOnly />
                  </div>
                </div>
              )}

              {promptData.type === 'Images' && (
                <div>
                  <div className="input-group mb-3">
                    <label className="input-group-text">Image Size:</label>
                    <input className="form-control" type="text" id="imageSize" name="imageSize" value={question.imagesize} readOnly />
                  </div>
                </div>
              )}

              <div className="input-group mb-3">
                <label className="input-group-text">Instruction:</label>
                <textarea className="form-control" id="instruction" name="instruction" value={question.instruction} readOnly />
              </div>
              {question.response && question.response.length > 0 ? <div className="input-group mb-3">
                {promptData.type === 'Edit' || promptData.type === 'Completitions' ? (
                  question.response.map((response, index) => (
                    <div className="input-group mb-3" key={index}>
                      <label className="input-group-text">Response {index + 1}:</label>
                      <textarea className="form-control" id={`response${index}`} name={`response${index}`} value={response?.trim()} readOnly />
                    </div>
                  ))) : (question.response.map((url, index) => (
                    <div className="input-group mb-3" key={index}>
                      <label className={`response${index}`}>Response {index + 1}:</label>
                      <img src={url} alt={index + 1} style={{ width: '200px', height: 'auto' }} />
                    </div>
                  ))
                )}
              </div> :
                (<span></span>)}
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};