
import React from 'react';
import {  useNavigate } from "react-router-dom";

import './Unauthorized.scss';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="unauthorized">
      <h1 className="unauthorized__title">Unauthorized</h1>
      <p className="unauthorized__message">
        Oops! It seems like you don't have permission to access this page.
      </p>
      <button className="unauthorized__button" onClick={()=>navigate('/', { replace: true })}>Go Back</button>
    </div>
  );
};

export default Unauthorized;

