import React, { useState, useEffect } from 'react';
import './ChecBox.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

export function CheckBox({ formData, setFormData }) {
    const [selectedTags, setSelectedTags] = useState([]);
    const tags = ["Programación", "Inteligencia Artificial", "Ciberseguridad", "Big Data", "Redes", "Cardiología", "Dermatología", "Neurología", "Pediatria", "Cirugía", "Matemáticas", "Historia", "Ciencias", "Idiomas", "Arte"];

    const handleTagSelect = (event) => {
        const selectedTag = event.target.value;
        if (!selectedTags.includes(selectedTag)) {
            setSelectedTags([...selectedTags, selectedTag]);
        }
    };

    const handleTagRemove = (tagToRemove) => {
        setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove));
    };

    return (
        <div className="selector">
            <span>Tags</span>
            <select className="selector__combobox" onChange={handleTagSelect}>
                <option value="">Selecciona un tag</option>
                {tags.map((tag) => (
                    <option key={tag} value={tag}>
                        {tag}
                    </option>
                ))}
            </select>
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
