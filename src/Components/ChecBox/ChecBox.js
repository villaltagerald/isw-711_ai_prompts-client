import React, { useState, useEffect } from 'react';
import './ChecBox.scss';

export function CheckBox({ formData, setFormData }) {

    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        const combinedTags = formData.tags && formData.tags.flatMap(tag => [tag.tagId, ...tag.subTags]);
        setSelectedTags(combinedTags);
    }, [formData.tags]);

    const tags = [
        {
            "id": "Tecnologia",
            "subTags": [
                "Programación",
                "Inteligencia Artificial",
                "Ciberseguridad",
                "Big Data",
                "Redes"
            ]
        },
        {
            "id": "Medicina",
            "subTags": [
                "Cardiología",
                "Dermatología",
                "Neurología",
                "Pediatria",
                "Cirugía"
            ]
        },
        {
            "id": "Educacion",
            "subTags": [
                "Matemáticas",
                "Historia",
                "Ciencias",
                "Idiomas",
                "Arte"
            ]
        }
    ];

//FUNCION PARA ALMACENAR LOS TAGS SELECCIONADOS
    const handleCheckboxChange = (tagId, subTag) => {
        let tagOpcion = subTag ? subTag : tagId
        if (selectedTags.includes(tagOpcion)) {//ID TAGS EXISTE
            setSelectedTags(selectedTags.filter((id) => id !== tagOpcion));
            let updatedTags = [...formData.tags];
            const existingTagIndex = updatedTags.findIndex((tag) => tag.tagId === tagId);//BUSCA ID TAGS EN EL OBJETO PRINCIPAL
            if (existingTagIndex !== -1 && !subTag) {
                updatedTags = updatedTags.filter((tag) => tag.tagId !== tagId);//ELIMINA ID TAGS SI EXITE
            } if (existingTagIndex !== -1 && subTag) {
                updatedTags[existingTagIndex].subTags = updatedTags[existingTagIndex].subTags.filter((subtag) => subtag !== subTag);//ELIMINA  SUB TAGS SI EXITE
            }
            setFormData((prevFormData) => ({
                ...prevFormData,
                tags: updatedTags,
            }));
        } else {//GUARADAR ID TAGS SINO EXISTE
            setSelectedTags([...selectedTags, tagOpcion]);
            let updatedTags = [...formData.tags]; // Crea una copia del arreglo formData.tags
            const existingTagIndex = updatedTags.findIndex((tag) => tag.tagId === tagId);
            if (existingTagIndex !== -1) {
                updatedTags[existingTagIndex].subTags.push(subTag);//GUARADA EL SUB TAG
            } else {
                updatedTags.push({
                    tagId: tagId,
                    subTags: [],
                });
            }
            setFormData((prevFormData) => ({
                ...prevFormData,
                tags: updatedTags,
            }));
        }
    };
    return (<div><p>Tags</p>
        <div className="checkbox__container">
            {tags && tags.map((tag) => (
                <div key={tag.id} className="checkbox__container__tag">
                    <label>
                        <input type="checkbox" checked={selectedTags && selectedTags.includes(tag.id)} onChange={() => handleCheckboxChange(tag.id)} />
                        {tag.id}
                    </label>
                    {selectedTags && selectedTags.includes(tag.id) && (
                        <ul className="checkbox__container__tag__sub">
                            {tag.subTags.map((subTag) => (
                                <li key={subTag}>
                                    <label>
                                        <input type="checkbox" checked={selectedTags && selectedTags.includes(subTag)} onChange={() => handleCheckboxChange(tag.id, subTag)} />
                                        {subTag}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    </div>
    );
}