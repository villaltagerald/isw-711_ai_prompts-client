import React from 'react';

import './UserTable.scss';
import Spinner from '../Spinner/Spinner';

const UserTable = ({users, onView, onEdit, onDelete}) => {
  return (
  <div>{users?(
    <table className="user__table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <td>{user.first_name+" "+user.last_name}</td>
            <td>{user.email}</td>
            <td>{user.varified?<span>Verificado</span>:<span>Sin Verificado</span>}</td>
            <td>
              <button onClick={() => onView(user._id)}>Vista</button>
              <button onClick={() => onEdit(user._id)}>Editar</button>
              <button onClick={() => onDelete(user._id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>):<Spinner/>}
    </div>
  );
};

export default UserTable;
