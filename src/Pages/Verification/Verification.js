import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Spinner from '../../Components/Spinner/Spinner';

import './Verification.scss';
import { VerifiedUser } from '../../Datos/VerificationAuto/VerifiedUser';

export const Verification = () => {
  const { validationCode } = useParams();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState('verifying');

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const respuesta = await VerifiedUser(validationCode);
        if (respuesta && respuesta.message) {
          setVerificationStatus('success');
        } else {
          setVerificationStatus('failed');
        }
      } catch (error) {
        setVerificationStatus('failed');
      }
    };

    verifyUser();
  }, [validationCode]);

  const handleReturnToLogin = () => {
    navigate('/', { replace: true })
  };

  return (
    <div className="verification-container">
      <div className="verification-content">
        {verificationStatus === 'verifying' && <><Spinner/> <p>Verificando...</p></>}
        {verificationStatus === 'success' && (
          <>
          <i className="fa-solid fa-circle-check fa-beat fa-2xl" style={{color: '#0fdb38',}}></i>
            <p>Verificación exitosa</p>
            <button onClick={handleReturnToLogin}>Volver al Login</button>
          </>
        )}
        {verificationStatus === 'failed' && (
          <>
          <i className="fa-solid fa-circle-xmark fa-beat fa-2xl" style={{color: '#d92612',}}></i>
            <p>Verificación fallida</p>
            <span className="bi bi-patch-check-fill"/>
            <button onClick={handleReturnToLogin}>Volver al Login</button>
          </>
        )}
      </div>
    </div>
  );
};
