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
            <Link to="/" className="nav__item__link">Home</Link>
          </li>
          <li>
            <Link to="/userviews" className="nav__item__link">User</Link>
          </li>
          <li>
            <Link to="/login" className="nav__item__link" onClick={handleLogout}>Exit</Link>
          </li>
        </ul>
      )}

      {userRole === 'prompts' && (
        <ul>
          <li>
            <Link to="/" className="nav__item__link">Home</Link>
          </li>
          <li>
            <Link to="/promptviews" className="nav__item__link">Prompt</Link>
          </li>
          <li>
            <Link to="/login" className="nav__item__link" onClick={handleLogout}>Exit</Link>
          </li>
        </ul>
      )}
    </nav>

  );
};

export default Navigation;
//<Link to="/" className="nav__item__link">Home</Link>
