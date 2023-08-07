import React, { useState } from 'react';
import { ResetMail } from '../../Datos/ResetPassword/ResetMail';
import { AlertMessage } from '../../Components/AlertMessage/AlertMessage';
import './ResetPassword.scss';

export const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState("");
    const [typeAlert, setTypeAlert] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Aquí puedes agregar la lógica para enviar el correo y actualizar el estado a submitted

        if (email) {
            const responseMail = await ResetMail({ email: email });
            if (responseMail === 200) {
                setSubmitted(true);
            } else {
                setShowAlert(true);
                setMessage(responseMail.error);
                setTypeAlert("danger");
            }
        } else {
            setShowAlert(true);
            setMessage("You must enter an email address");
            setTypeAlert("danger");
        }
    };

    return (
        <div className="reset-password-page">
            {showAlert && (<AlertMessage showAlert={showAlert} setShowAlert={setShowAlert} message={message} variant={typeAlert} />)}
            <div className="reset-password-box">
                {!submitted ? (
                    <>
                        <h2>Reset password</h2>
                        <p>Enter the email address associated with our site</p>
                        <form className='input-group mb-3' onSubmit={handleSubmit}>
                            <label className="input-group-text">E-mail:</label>
                            <input className="form-control" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <button type="submit">Submit reset link</button>
                        </form>
                    </>
                ) : (
                    <div className="success-message">
                        <p>Check your email for reset instructions.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
