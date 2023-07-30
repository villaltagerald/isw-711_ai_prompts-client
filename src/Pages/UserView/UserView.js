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
        <div className="user__view__form__group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={users.email} readOnly />
        </div>
        <div className="user__view__form__group">
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" name="firstName" value={users.first_name} readOnly />
        </div>
        <div className="user__view__form__group">
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" name="lastName" value={users.last_name} readOnly />
        </div>
        <div className="user__view__form__group">
          <label htmlFor="statusCheckbox">Status:</label>
          <input type="checkbox" id="statusCheckbox" checked={users.varified === true} readOnly/>
          {users.varified === true ? 'Active' : 'Pending'}
        </div>
      </form>
    </div>
  );
};
