import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import { UserGet } from '../../Datos/User/UserGet';
import { UserPatch } from '../../Datos/User/UserPatch';
import RegistrationForm from '../../Components/RegistrationForm/RegistrationForm';
import './UserEdit.scss';

import { AlertMessage } from '../../Components/AlertMessage/AlertMessage';

export function UserEdit() {

  const [showAlert, setShowAlert] = useState(false);
  const { userId } = useParams();
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    phone: '',
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
    setShowAlert(true);
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
  };

  const handleStatusChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: checked,
    }));
  };

  
  return (
    <>
    {showAlert && (<AlertMessage showAlert={showAlert} setShowAlert={setShowAlert} message={"User successfully modified"} variant={"success"}/>)}
    <RegistrationForm titulo={"Edit User"} handleSubmit={handleSubmit} handleChange={handleChange} handleStatusChange={handleStatusChange} formData={formData} required={false} />
    </>
  );
}
