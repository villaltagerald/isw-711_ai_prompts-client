import PromptTable from "../../Components/PromptTable/PromptTable";
import { PromptsGet } from "../../Datos/Prompts/PromptsGet";
import { PromptsSearch } from "../../Datos/Prompts/PromptsSearch";
import { PromptsDelete } from "../../Datos/Prompts/PromptsDelete";
import { AlertMessage } from "../../Components/AlertMessage/AlertMessage";
import Spinner from "../../Components/Spinner/Spinner";
import './PromptViews.scss'
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

export function PromptViews() {
    const [prompts, setPrompts] = useState([]);

    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState("");
    const [typeAlert, setTypeAlert] = useState("");
    const [showNameInput, setShowNameInput] = useState(false);
    const [showTypeInput, setShowTypeInput] = useState(false);
    const [showTagsInput, setShowTagsInput] = useState(false);

    const [nameValue, setNameValue] = useState('');
    const [typeValue, setTypeValue] = useState('');

    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedOpcionTags, setSelectedOpcionTags] = useState([]);
    const tags = ["Programación", "Inteligencia Artificial", "Ciberseguridad", "Big Data", "Redes", "Cardiología", "Dermatología", "Neurología", "Pediatria", "Cirugía", "Matemáticas", "Historia", "Ciencias", "Idiomas", "Arte"];

    const handleNameCheckboxChange = () => {
        setShowNameInput(!showNameInput);
    };

    const handleTypeCheckboxChange = () => {
        setShowTypeInput(!showTypeInput);
    };

    const handleTagsCheckboxChange = () => {
        setShowTagsInput(!showTagsInput);
    };

    const handleNameInputChange = (event) => {
        setNameValue(event.target.value);
    };

    const handleTypeInputChange = (event) => {
        setTypeValue(event.target.value);
    };

    const handleTagChange = selectedOptions => {
        const selectedValues = selectedOptions.map(option => option.value);
        setSelectedOpcionTags(selectedValues);
        setSelectedTags(selectedOptions);
    };

    const options = tags.map(tag => ({ value: tag, label: tag }));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const promptResponse = await PromptsGet();
                setPrompts(promptResponse);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if ((showNameInput || showTagsInput || showTypeInput)) {
            //console.log(selectedOpcionTags)
            if ((nameValue || (typeValue && typeValue !== "") || selectedOpcionTags.length > 0)) {
                const promptResponse = await PromptsSearch(showNameInput ? nameValue : null, showTypeInput ? typeValue : null, showTagsInput ? selectedOpcionTags : null);
                //console.log(promptResponse.data.searchPrompt);
                setPrompts(promptResponse.data.searchPrompt);
            }
        } else {
            setShowAlert(true);
            setMessage("You must enter some data to be able to search");
            setTypeAlert("danger");
        }
    }

    const userDelete = () => {
        setShowAlert(true);
        setMessage("Prompts eliminated successfully");
        setTypeAlert("success");
    }

    const onView = (promptId) => {
        navigate(`/promptview/${promptId}`);
    }

    const onEdit = (userId) => {
        navigate(`/promptedit/${userId}`);
    }

    const onDelete = (promptId) => {
        PromptsDelete(promptId, userDelete);
        setPrompts(prompts.filter((prompt) => prompt._id !== promptId));
    }
    return (
        <div className="container_table">
            {showAlert && (<AlertMessage showAlert={showAlert} setShowAlert={setShowAlert} message={message} variant={typeAlert} />)}
            <div className="container text-center">
                <div className="row row-cols-4">
                    <form className="d-flex" role="search" onSubmit={handleSubmit}>
                        <div className="col-md-auto">
                            <div className="input-group mb-3">
                                <div className="input-group-text">
                                    <input type="checkbox" className="btn-check" id="btn-check-Name" autoComplete="off" onChange={handleNameCheckboxChange} />
                                    <label className="btn btn-outline-primary" htmlFor="btn-check-Name">Name</label>
                                </div>
                                {showNameInput && (
                                    <input className="form-control" type="text" id="nameInput" value={nameValue} onChange={handleNameInputChange} />
                                )}
                            </div>
                        </div>
                        <div className="col-md-auto">
                            <div className="input-group mb-3">
                                <div className="input-group-text">
                                    <input type="checkbox" className="btn-check" id="btn-check-Type" autoComplete="off" onChange={handleTypeCheckboxChange} />
                                    <label className="btn btn-outline-primary" htmlFor="btn-check-Type">Type</label>
                                </div>
                                {showTypeInput && (
                                    <select className="form-select" id="type" name="type" value={typeValue} onChange={handleTypeInputChange} >
                                        <option value="">Select type</option>
                                        <option value="Edit">Edit</option>
                                        <option value="Images">Image</option>
                                        <option value="Completitions">Completitions</option>
                                    </select>
                                )}
                            </div>
                        </div>
                        <div className="col-md-auto">
                            <div className="input-group mb-3">
                                <div className="input-group-text">
                                    <input type="checkbox" className="btn-check" id="btn-check-Tags" autoComplete="off" onChange={handleTagsCheckboxChange} />
                                    <label className="btn btn-outline-primary" htmlFor="btn-check-Tags">Tags</label>
                                </div>
                                {showTagsInput && (
                                    <Select className="form-control" isMulti options={options} value={selectedTags} onChange={handleTagChange} placeholder="Select tags" />
                                )}
                            </div>
                        </div>
                        <div className="col col-lg-2">
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </div>
                    </form>
                </div>
            </div>
            <button onClick={() => navigate(`/promptnew`)}><i className="fa-regular fa-square-plus fa-2xl" style={{ color: '#ffffff', }} />  NEW</button>

            <PromptTable prompts={prompts} onView={onView} onEdit={onEdit} onDelete={onDelete} />
        </div>
    )
}