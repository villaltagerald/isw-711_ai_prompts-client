import UserPost from '../../Datos/User/UserPost';
import './Registration.scss';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Registration() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    repeatPassword: '',
    varified: false,
  });

  const userCreated = () => {
    alert('User created');
    navigate(`/login`);
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
    if (formData.password === formData.repeatPassword) {
      UserPost(formData, userCreated);
      console.log(formData);
    } else {
      alert('Password do not match');
    }
  }

  return (
    <div className='container'>
      <h2>Registration User</h2>
      <form className='container__registration' onSubmit={handleSubmit}>
        <div className="container__registration__group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="container__registration__group">
          <label htmlFor="first_name">First Name:</label>
          <input type="text" id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} required />
        </div>
        <div className="container__registration__group">
          <label htmlFor="last_name">Last Name:</label>
          <input type="text" id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} required />
        </div>
        <div className="container__registration__group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="container__registration__group">
          <label htmlFor="repeatPassword">Repeat Password:</label>
          <input type="password" id="repeatPassword" name="repeatPassword" value={formData.repeatPassword} onChange={handleChange} required />
        </div>
        <div className="registration__box__buttons">
          <button type="submit">Guardar</button>
        </div>
      </form>
    </div>
  );
}
