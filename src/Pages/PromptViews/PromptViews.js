import PromptTable from "../../Components/PromptTable/PromptTable";
import { PromptsGet } from "../../Datos/Prompts/PromptsGet";
import { PromptsDelete } from "../../Datos/Prompts/PromptsDelete";
import { AlertMessage } from "../../Components/AlertMessage/AlertMessage";

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function PromptViews() {
    const [prompts, setPrompts] = useState([]);

    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await PromptsGet();
                setPrompts(userResponse);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const userDelete = () => {
        setShowAlert(true);

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
            {showAlert && (<AlertMessage showAlert={showAlert} setShowAlert={setShowAlert} message={"Prompts eliminated successfully"} variant={"success"} />)}
            <div className="container text-center">
                <div className="row">
                    <div className="col col-lg-2">
                        <button onClick={() => navigate(`/promptnew`)}><i className="fa-regular fa-square-plus fa-2xl" style={{ color: '#ffffff', }} /></button>
                    </div>
                    <div className="col-md-auto">
                        <span>Filter:  </span>
                        <input type="checkbox" className="btn-check" id="btn-check-Name" autoComplete="off" />
                        <label className="btn btn-outline-primary" htmlFor="btn-check-Name">Name</label>
                        <input type="checkbox" className="btn-check" id="btn-check-Type" autoComplete="off" />
                        <label className="btn btn-outline-primary" htmlFor="btn-check-Type">Type</label>
                        <input type="checkbox" className="btn-check" id="btn-check-Tags" autoComplete="off" />
                        <label className="btn btn-outline-primary" htmlFor="btn-check-Tags">Tags</label>
                    </div>
                    <div className="col">
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </div>

            <PromptTable prompts={prompts} onView={onView} onEdit={onEdit} onDelete={onDelete} />
        </div>
    )
}