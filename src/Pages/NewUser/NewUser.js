import React, { useState } from 'react';

import UserPost from '../../Datos/User/UserPost';
import RegistrationForm from '../../Components/RegistrationForm/RegistrationForm';
import './NewUser.scss';

export function NewUser() {
  //const [varified, setVarified] = useState(false); // Estado inicial: 'pending'
  //const [data, setData] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    phone: '',
    password: '',
    repeatPassword: '',
    varified: false,
  });

  function userCreated() {
    alert('User created');
    setFormData({
      email: '',
      first_name: '',
      last_name: '',
      phone: '',
      password: '',
      repeatPassword: '',
      varified: false,
    });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  //CAPTURA LOS CAMBIOS EN EL OBJETO
  const handleStatusChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: checked,
    }));
    //const newStatus = e.target.checked ? true : false;
    //setVarified(newStatus);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    UserPost(formData, userCreated);///ENVIA LA SOLICITUD AL API
    //console.log(formData);
  }


  return (
    <RegistrationForm titulo={"Add User"} handleSubmit={handleSubmit} handleChange={handleChange} handleStatusChange={handleStatusChange} formData={formData} required={true} />
  );
}
