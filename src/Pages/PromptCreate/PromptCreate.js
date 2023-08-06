import React, { useState, useEffect } from 'react';
//Estilo
import './PromptCreate.scss';

import { CheckBox } from '../../Components/ChecBox/ChecBox';
import PromptsPost from '../../Datos/Prompts/PromptsPost';

export function PromptCreate() {
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
        userId: '',
        name: '',
        type: '',
        tags: [],
        response: [],
        questions: []
    });
    //CAPTURA INFORMACION DEL OBJETO PRINCIPAL
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

    //CAPTURA LOS DATOS DEL OBJETO SEGUNDARIO
    const handleChangeQuestion = (e) => {
        const { name, value } = e.target;
        setQuestion((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const createPrompt = () => {
        alert('User Created');
        setQuestion({
            responseCount: 1,
            input: "",
            instruction: "",
            temperature: 1,
            imagesize: ""
        });
        setPromptData({
            userId: '',
            name: '',
            type: '',
            tags: [],
            response: [],
            questions: []
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        PromptsPost(promptData, createPrompt);//ENVIO LA SOLICITUD AL API
        //console.log(promptData, promptData.questions);
    };

    return (
        <div className="container">
            <div className="container__prompt">
                <h2>Add new Prompt</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                        <label className="input-group-text">Name:</label>
                        <input className="form-control" type="text" id="name" name="name" value={promptData.name} onChange={handleChange} required />
                    </div>
                    <CheckBox formData={promptData} setFormData={setPromptData} />
                    <div className="input-group mb-3">
                        <label className="input-group-text">Type:</label>
                        <select class="form-select" id="type" name="type" value={promptData.type} onChange={handleChange} required >
                            <option value="">Select type</option>
                            <option value="Edit">Edit</option>
                            <option value="Images">Image</option>
                            <option value="Completitions">Completitions</option>
                        </select>
                    </div>

                    <div className="input-group mb-3">
                        <label className="input-group-text">Response Count:</label>
                        <input className="form-control" type="number" id="responseCount" name="responseCount" min="0" max="10" value={question.responseCount} onChange={handleChangeQuestion} required />
                    </div>
                    {promptData.type === 'Edit' && (
                        <div>
                            <div className="input-group mb-3">
                                <label className="input-group-text">Temperature:</label>
                                <input className="form-control" type="number" id="temperature" name="temperature" min="0" max="2" step="0.1" value={question.temperature} onChange={handleChangeQuestion} required />
                            </div>
                            <div className="input-group mb-3">
                                <label className="input-group-text">Input:</label>
                                <textarea className="form-control" id="input" name="input" value={question.input} onChange={handleChangeQuestion} required />
                            </div>
                        </div>
                    )}
                    {promptData.type === 'Images' && (
                        <div>
                            <div className="input-group mb-3">
                                <label className="input-group-text">Image Size:</label>
                                <select class="form-select" id="imagesize" name="imagesize" value={question.imagesize} onChange={handleChangeQuestion} required >
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
                            <input className="form-control" type="number" id="temperature" name="temperature" min="0" max="2" step="0.1" value={question.temperature} onChange={handleChangeQuestion} required />
                        </div>
                    )}
                    <div className="input-group mb-3">
                        <label className="input-group-text">Instruction:</label>
                        <textarea className="form-control" id="instruction" name="instruction" value={question.instruction} onChange={handleChangeQuestion} required />
                    </div>
                    <button type="submit">Add</button>
                </form>
            </div>
        </div>
    );
};
