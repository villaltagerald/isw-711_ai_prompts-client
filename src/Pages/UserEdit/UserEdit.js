import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import { UserGet } from '../../Datos/User/UserGet';
import { UserPatch } from '../../Datos/User/UserPatch';
import RegistrationForm from '../../Components/RegistrationForm/RegistrationForm';
import './UserEdit.scss';

export function UserEdit() {

  const { userId } = useParams();
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    repeatPassword: '',
    varified: false,
  });

  // Uso de la función userGet
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await UserGet(userId);
        setFormData(userResponse);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [userId]);

  function userEdit() {
    alert('User edit');
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    UserPatch(userId, formData, userEdit);
    //console.log(formData);
  }

  const handleStatusChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      varified: e.target.checked ? true : false,
    }));
    //const newStatus = e.target.checked ? true : false;
    //setVarified(newStatus);
  };

  return (
    <RegistrationForm titulo={"Edit User"} handleSubmit={handleSubmit} handleChange={handleChange} handleStatusChange={handleStatusChange} formData={formData} required={false}/>
  );
}
