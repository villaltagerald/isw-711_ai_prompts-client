import UserPost from '../../Datos/User/UserPost';
import { SendMail } from '../../Datos/VerificationAuto/SendMail';
import './Registration.scss';
import 'bootstrap/dist/css/bootstrap.css';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Registration() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    phone: '',
    password: '',
    repeatPassword: '',
    two_fa: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleStatusChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: checked,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password === formData.repeatPassword) {
      const repontePostUser = await UserPost(formData);
      const responseSendMail = await SendMail(repontePostUser);
      if (responseSendMail == 200 && repontePostUser) {
        navigate(`/signup_successfully`);
      }
    } else {
      alert('Password do not match');
    }
  }

  return (
    <div className='container'>
      <h2>Registration User</h2>
      <form className='container__registration' onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <label  className="input-group-text" id="basic-addon1">Email:</label >
          <input className="form-control" type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="input-group mb-3">
          <label className="input-group-text">First Name:</label>
          <input className="form-control" type="text" id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} required />
        </div>
        <div className="input-group mb-3">
          <label className="input-group-text">Last Name:</label>
          <input className="form-control" type="text" id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} required />
        </div>
        <div className="input-group mb-3">
          <label className="input-group-text">Phone:</label>
          <input className="form-control" type="tel" id="phone" name="phone" pattern="[0-9]{4}[0-9]{4}" title="Formato requerido: 12345678" value={formData.phone || ""} onChange={handleChange} required={formData.two_fa} />
        </div>
        <div className="input-group mb-3">
          <label className="input-group-text">Password:</label>
          <input className="form-control" type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="input-group mb-3">
          <label className="input-group-text">Repeat Password:</label>
          <input className="form-control" type="password" id="repeatPassword" name="repeatPassword" value={formData.repeatPassword} onChange={handleChange} required />
        </div>
        <div className="registration__box__twofa">
          <label className="two_fa">Two authentication factors:</label>
          <input type="checkbox" id="two_fa" name='two_fa' checked={formData.two_fa === true} onChange={handleStatusChange} />
          {formData.two_fa === true ? 'Active' : 'Inactive'}
        </div>
        <div className="registration__box__buttons">
          <button type="submit">Guardar</button>
        </div>
      </form>
    </div>
  );
}
