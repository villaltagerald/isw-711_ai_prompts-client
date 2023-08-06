import PromptTable from "../../Components/PromptTable/PromptTable";
import { PromptsGet } from "../../Datos/Prompts/PromptsGet";
import { PromptsDelete } from "../../Datos/Prompts/PromptsDelete";

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function PromptViews() {
    const [prompts, setPrompts] = useState([]);

    const navigate = useNavigate();

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
        alert('Prompts delete');
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
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <button onClick={() => navigate(`/promptnew`)}><i className="fa-solid fa-file-circle-plus fs-xl" style={{color: '#ffffff',}}/></button>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </nav>

            <PromptTable prompts={prompts} onView={onView} onEdit={onEdit} onDelete={onDelete} />
        </div>
    )
}