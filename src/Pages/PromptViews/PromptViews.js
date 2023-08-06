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
            <nav class="navbar bg-body-tertiary">
                <div class="container-fluid">
                    <button onClick={() => navigate(`/promptnew`)}><i class="fa-solid fa-file-circle-plus fs-xl" style={{color: '#ffffff',}}/></button>
                    <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </nav>

            <PromptTable prompts={prompts} onView={onView} onEdit={onEdit} onDelete={onDelete} />
        </div>
    )
}