import React from 'react';
import './PromptTable.scss';
import Spinner from '../Spinner/Spinner';


const PromptTable = ({ prompts, onView, onEdit, onDelete }) => {

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Tags</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {prompts ? prompts.map((prompt, index) => (
            <tr key={index}>
              <td>{prompt.name}</td>
              <td>{prompt.type}</td>
              <td>{prompt.tags ? (prompt.tags.map(tag => tag).join('\n')) : <span>Sin Etiquetas</span>}</td>
              <td>
                <button onClick={() => onView(prompt._id)}><i className="fa-solid fa-eye" style={{ color: '#ffffff', }} /></button>
                <button onClick={() => onEdit(prompt._id)}><i className="fa-solid fa-pen-to-square" style={{ color: '#ffffff', }} /></button>
                <button onClick={() => onDelete(prompt._id)}><i className="fa-solid fa-trash" style={{ color: '#ffffff', }} /></button>
              </td>
            </tr>
          )) : <Spinner />}
        </tbody>
      </table>
    </div>
  );
};

export default PromptTable;
