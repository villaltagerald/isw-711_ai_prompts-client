import UserPost from '../../Datos/User/UserPost';
import { SendMail } from '../../Datos/VerificationAuto/SendMail';
import './Registration.scss';
import 'bootstrap/dist/css/bootstrap.css';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertMessage } from '../../Components/AlertMessage/AlertMessage';

export function Registration() {

  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState(false);
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
      //console.log(repontePostUser)
      if (!repontePostUser.error) {
        const responseSendMail = await SendMail(repontePostUser);
        if (responseSendMail === 200) {
          navigate(`/signup_successfully`);
        }
      } else {
        setShowAlert(true);
        setMessage(repontePostUser.error);
      }
    } else {
      setShowAlert(true);
      setMessage('Password do not match')
    }
  }

  return (
    <div className='container'>
      {showAlert && (<AlertMessage showAlert={showAlert} setShowAlert={setShowAlert} message={message} variant={"danger"} />)}
      <h2>Registration User</h2>
      <form className='container__registration' onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <label className="input-group-text">Email:</label >
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
        <div className="form-check form-switch">
          <label className="two_fa">Two authentication factors</label>
          <input className="form-check-input" type="checkbox" id="two_fa" name='two_fa' checked={formData.two_fa === true} onChange={handleStatusChange} />
        </div>
        <div className="registration__box__buttons">
          <button type="submit">Sign up</button>
        </div>
      </form>
    </div>
  );
}
