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
    // Aquí realizas la verificación utilizando el token en la URL
    // Puedes llamar a una API o realizar cualquier proceso necesario
    // para verificar el token.

    // Ejemplo de simulación de verificación exitosa después de 2 segundos
    const verifyUser = async () => {
      try {
        const respuesta = await VerifiedUser(validationCode);
        //console.log(respuesta);

        // Si la respuesta tiene la propiedad 'message', la verificación fue exitosa
        if (respuesta && respuesta.message) {
          setVerificationStatus('success');
        } else {
          // Si la respuesta tiene la propiedad 'error', la verificación falló
          setVerificationStatus('failed');
        }
      } catch (error) {
        // Si ocurre algún error al realizar la verificación
        //console.error('Error al verificar el usuario:', error);
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
          <i class="fa-solid fa-circle-check fa-beat fa-2xl" style={{color: '#0fdb38',}}></i>
            <p>Verificación exitosa</p>
            <button onClick={handleReturnToLogin}>Volver al Login</button>
          </>
        )}
        {verificationStatus === 'failed' && (
          <>
          <i class="fa-solid fa-circle-xmark fa-beat fa-2xl" style={{color: '#d92612',}}></i>
            <p>Verificación fallida</p>
            <span class="bi bi-patch-check-fill"/>
            <button onClick={handleReturnToLogin}>Volver al Login</button>
          </>
        )}
      </div>
    </div>
  );
};
