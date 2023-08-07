import React, { useState, useEffect } from 'react';
import './ChecBox.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

export function CheckBox({ formData, setFormData }) {
    const [selectedTags, setSelectedTags] = useState([]);
    const tags = ["Programación", "Inteligencia Artificial", "Ciberseguridad", "Big Data", "Redes", "Cardiología", "Dermatología", "Neurología", "Pediatria", "Cirugía", "Matemáticas", "Historia", "Ciencias", "Idiomas", "Arte"];
    tags.sort();
    useEffect(() => {
        if (formData.tags) {
            setSelectedTags(formData.tags);

        }
    }, [formData.tags]);

    const handleTagSelect = (event) => {
        const selectedTag = event.target.value;
        if (selectedTag && !selectedTags.includes(selectedTag) ) {
            setSelectedTags([...selectedTags, selectedTag]);
            setFormData((prevFormData) => ({
                ...prevFormData,
                tags: [...prevFormData.tags, selectedTag], // Utiliza el valor actualizado de selectedTags
              }));
        }
    };

    const handleTagRemove = (tagToRemove) => {
        setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove));
        setFormData((prevFormData) => ({
            ...prevFormData,
            tags: selectedTags.filter((tag) => tag !== tagToRemove), // Utiliza el valor actualizado de selectedTags
          }));
    };

    return (
        <div className="selector">
            <div className='input-group mb-3'> 
            <label className="input-group-text">Tags:</label>
            <select className="input-group-text" onChange={handleTagSelect}>
                <option value="">Selecciona un tag</option>
                {tags.map((tag) => (
                    <option key={tag} value={tag}>
                        {tag}
                    </option>
                ))}
            </select></div>
            <div className="selector__tags">
                {selectedTags.map((tag) => (
                    <div key={tag} className="selector__tags__tag">
                        {tag}
                        <span className="selector__tags__tag__closebtn" onClick={() => handleTagRemove(tag)}>&times;</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
