import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistrationSuccess.scss';

export const RegistrationSuccess = () => {
    const navigate = useNavigate();
  return (
    <div className="registration-success">
      <h1>Registration Successful!</h1>
      <h2>Check your email to verify your account and log in</h2>
      <button className="login-button" onClick={()=>navigate(`/login`)}>Login</button>
    </div>
  );
};


