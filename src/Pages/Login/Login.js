import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setUser } from '../../Redux/Actions/UserActions';
import { AlertMessage } from '../../Components/AlertMessage/AlertMessage';
import { SessionToken } from '../../Datos/Authorization/SessionToken';

import './Login.scss';

export const Login = () => {

  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [username, SetUsername] = useState("");
  const [password, SetPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    const autentResponse = await SessionToken(username, password);
    console.log(autentResponse);
    if (autentResponse.data) {
      sessionStorage.setItem("tokenSesion", autentResponse.data.token);
      dispatch(setUser(autentResponse.data.name, autentResponse.data.permission[0].idPermission));
      navigate('/', { replace: true });
    } else if (autentResponse.two_fa) { 
      navigate(`/autenticartwofa/${autentResponse.id}`, { replace: true });
    } 
      else {
      setShowAlert(true);
      setMessage(autentResponse.error);
      }
  };

  return (
    <div className="containerLogin">
      {showAlert && (<AlertMessage showAlert={showAlert} setShowAlert={setShowAlert} message={message} variant={"danger"} />)}
      <div className="containerLogin__box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group mb-3">
            <label className="input-group-text">Email</label>
            <input className="form-control" type="text" id="user" name="user" value={username} onChange={(e) => SetUsername(e.target.value)} required />
          </div>
          <div className="input-group mb-3">
            <label className="input-group-text">Password</label>
            <input className="form-control" type="password" id="password" name="password" value={password} onChange={(e) => SetPassword(e.target.value)} required />
          </div>
          <p> Forgot your password? <Link to="/reset-password">Reset it here</Link>.</p>
          <button type="submit" >Login</button>
        </form>
        <p className="signup-link">
          If you don't have an account, <Link to="/signup">Signup here</Link>.
        </p>
      </div>
    </div>
  );
};

