import React from 'react';
import './PromptTable.scss';
import Spinner from '../Spinner/Spinner';

const PromptTable = ({ prompts, onView, onEdit, onDelete }) => {
  return (
    <table className="prompt__table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Tags</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {prompts?prompts.map((prompt, index) => (
          <tr key={index}>
            <td>{prompt.name}</td>
            <td>{prompt.type}</td>
            <td>{prompt.tags?(prompt.tags.map(tag => tag.tagId).join(', ')):<span>Sin Etiquetas</span>}</td>
            <td>
              <button onClick={() => onView(prompt._id)}>Vista</button>
              <button onClick={() => onEdit(prompt._id)}>Editar</button>
              <button onClick={() => onDelete(prompt._id)}>Eliminar</button>
            </td>
          </tr>
        )):<Spinner/>}
      </tbody>
    </table>
  );
};

export default PromptTable;
