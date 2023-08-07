import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import React, { useState,useEffect } from 'react';

import './AlertMessage.scss'

export const AlertMessage = ({showAlert, setShowAlert,message,variant}) => {

    const toggleAlert = () => {
        setShowAlert(!showAlert);
    };

    useEffect(() => {
        if (showAlert) {
          const timer = setTimeout(() => {
            setShowAlert(false);
          }, 5000);
    
          return () => clearTimeout(timer);
        }
      }, [showAlert]);

    return (
        <div className="app-container">
            {showAlert && (
                <Alert variant={variant} className="custom-alert" onClose={toggleAlert} >
                    {message}
                </Alert>
            )}
        </div>
    );
}