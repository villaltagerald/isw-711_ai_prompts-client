import React from 'react';

import './UserTable.scss';
import Spinner from '../Spinner/Spinner';

const UserTable = ({users, onView, onEdit, onDelete}) => {
  return (
  <div>{users?(
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Verified</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <td>{user.first_name+" "+user.last_name}</td>
            <td>{user.email}</td>
            <td>{user.varified?<i className="fa-solid fa-square-check fa-xl" style={{color: '#278c03',}}></i>:<i className="fa-solid fa-square-xmark fa-xl" style={{color: '#d10000',}}></i>}</td>
            <td>
              <button onClick={() => onView(user._id)}><i className="fa-solid fa-eye" style={{color: '#ffffff',}}></i></button>
              <button onClick={() => onEdit(user._id)}><i className="fa-solid fa-pen-to-square" style={{color: '#ffffff',}}></i></button>
              <button onClick={() => onDelete(user._id)}><i className="fa-solid fa-trash" style={{color: '#ffffff',}}></i></button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>):<Spinner/>}
    </div>
  );
};

export default UserTable;
