import React , { useState, useEffect }from 'react';
import './UserView.scss';
import { UserGet } from '../../Datos/User/UserGet';

import { useParams } from "react-router-dom";

export const UserView = () => {

    const { userId} = useParams();
    const [users, setUsers] = useState([]);

    // Uso de la función userGet
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await UserGet(userId);
                setUsers(userResponse);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [userId]);

  return (
    <div className="user__view">
      <h2>User Details</h2>
      <form className="user__view__form">
        <div className="input-group mb-3">
          <label className="input-group-text">Email:</label>
          <input className="form-control" type="email" id="email" name="email" value={users.email} readOnly />
        </div>
        <div className="input-group mb-3">
          <label className="input-group-text">First Name:</label>
          <input className="form-control" type="text" id="firstName" name="firstName" value={users.first_name} readOnly />
        </div>
        <div className="input-group mb-3">
          <label className="input-group-text">Last Name:</label>
          <input className="form-control" type="text" id="lastName" name="lastName" value={users.last_name} readOnly />
        </div>
        <div className="form-check form-switch">
          <label className="form-check-label">Status</label>
          <input className="form-check-input" type="checkbox" id="statusCheckbox" checked={users.varified === true} readOnly/>
        </div>
        <div className="form-check form-switch">
          <label className="form-check-label">Two authentication factors</label>
          <input className="form-check-input" type="checkbox" id="statusCheckbox" checked={users.two_fa === true} readOnly/>
        </div>
      </form>
    </div>
  );
};
