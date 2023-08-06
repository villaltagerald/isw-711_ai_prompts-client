import React from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import './navigation.scss';


const Navigation = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const userRole = user.role;

  const handleLogout = () => {
    // Aquí puedes agregar la lógica para eliminar el token de sesión
    sessionStorage.removeItem('tokenSesion');
    localStorage.removeItem('reduxState');
    dispatch({ type: 'RESET_STATE' });
  };
  return (
    <nav className="navigation">
    {userRole === 'users' && (
      <ul>
        <li>
          <Link to="/" className="nav__item__link"><i class="fa-solid fa-house fa-2xl" style={{color: "#ffffff",}}></i></Link>
        </li>
        <li>
          <Link to="/userviews" className="nav__item__link"><i class="fa-solid fa-user-pen fa-2xl" style={{color: "#ffffff",}}></i> </Link>
        </li>
        <li>
          <Link to="/login" className="nav__item__link" onClick={handleLogout}><i className="fas fa-sign-out-alt fa-2xl" style={{color: "#ffffff",}}></i></Link>
        </li>
      </ul>
    )}

    {userRole === 'prompts' && (
      <ul>
        <li>
          <Link to="/" className="nav__item__link"><i class="fa-solid fa-house fa-2xl" style={{color: "#ffffff",}} ></i> </Link>
        </li>
        <li>
          <Link to="/promptviews" className="nav__item__link"><i className="fas fa-pencil-alt fa-2xl" style={{color: "#ffffff",}}></i> </Link>
        </li>
        <li>
          <Link to="/login" className="nav__item__link" onClick={handleLogout}><i className="fas fa-sign-out-alt fa-2xl" style={{color: "#ffffff",}}></i> </Link>
        </li>
      </ul>
    )}

    {/* Perfil en la parte inferior */}
    <div className="profile-link">
      <Link to="/userprofile" className="nav__item__link"><i className="fas fa-user fa-2xl" style={{color: "#ffffff",}}></i></Link>
    </div>
  </nav>
  );
};

export default Navigation;
//<Link to="/" className="nav__item__link">Home</Link>
