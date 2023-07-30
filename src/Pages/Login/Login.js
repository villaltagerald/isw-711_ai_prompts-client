import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setUser } from '../../Redux/Actions/UserActions';

import { SessionToken } from '../../Datos/Authorization/SessionToken';

import './Login.scss';

export const Login = () => {

  const navigate = useNavigate();
  const [username, SetUsername] = useState("");
  const [password, SetPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    const autentResponse = await SessionToken(username, password);
    if (autentResponse) {
      sessionStorage.setItem("tokenSesion", autentResponse.token);
      dispatch(setUser(autentResponse.name, autentResponse.permission[0].idPermission));
      navigate('/', { replace: true });
    }
  };

  return (
    <div className="containerLogin">
      <div className="containerLogin__box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="containerLogin__box__group">
            <label htmlFor="user">Email</label>
            <input type="text" id="user" name="user" value={username} onChange={(e) => SetUsername(e.target.value)} required />
          </div>
          <div className="containerLogin__box__group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={password} onChange={(e) => SetPassword(e.target.value)} required />
          </div>
          <button type="submit" >Login</button>
        </form>
        <p className="signup-link">
          If you don't have an account, <Link to="/signup">Signup here</Link>.
        </p>
      </div>
    </div>
  );
};

