import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ResetPassword } from '../../Datos/ResetPassword/ResetPassword';
import { AlertMessage } from '../../Components/AlertMessage/AlertMessage';

import './NewPassword.scss';

export const NewPassword = () => {
    const { resetcode } = useParams();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState("");
    const [typeAlert, setTypeAlert] = useState("");
    const [showCountdown, setShowCountdown] = useState(false);
    const [countdown, setCountdown] = useState(5);

    const handleResetPassword = async () => {
        if (newPassword === confirmPassword) {
            const responsePassword = await ResetPassword({ password: newPassword }, resetcode);
            console.log(responsePassword)
            if (responsePassword.message) {
                setShowAlert(true);
                setMessage(responsePassword.message);
                setTypeAlert("success");
                setShowCountdown(true);

                setTimeout(() => {
                    navigate('/login');
                }, 5000); // 5 seconds
            } else {
                setShowAlert(true);
                setMessage(responsePassword.error);
                setTypeAlert("danger");
            }
        } else {
            setShowAlert(true);
            setMessage("Passwords do not match");
            setTypeAlert("danger");
        }
    };

    useEffect(() => {
        let timer;
        if (showCountdown && countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
        } else if (showCountdown && countdown === 0) {
            navigate('/login');
        }

        return () => clearInterval(timer);
    }, [showCountdown, countdown, navigate]);

    return (
        <div className="contener__password">
            {showAlert && (<AlertMessage showAlert={showAlert} setShowAlert={setShowAlert} message={message} variant={typeAlert} />)}
            {showCountdown && (
                <div className="contener__password__wrapper">
                    <p className="contener__password__wrapper__countdown">{countdown}</p>
                    <p className="contener__password__wrapper__text">Redirecting to login in seconds...</p>
                    <button onClick={() => navigate('/login')}>Go to Login Now</button>
                </div>
            )}
            {!showCountdown && (
                <div className="contener__password__reset" >
                    <h2>Reset Password</h2>
                    <div className="contener__password__reset__form">
                        <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <button onClick={handleResetPassword}>Reset Password</button>
                </div>
            )}
        </div>
    );
};
