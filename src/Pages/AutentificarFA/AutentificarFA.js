import React, { useState, useRef } from 'react';
import './AutentificarFA.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { AutentifyFA } from '../../Datos/AutentificarFA/AutentificarFA';
import { useDispatch } from 'react-redux';
import { setUser } from '../../Redux/Actions/UserActions';

export function AutentificarFA() {
    const [codes, setCodes] = useState(['', '', '', '', '', '']);
    const { userid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const codeInputs = useRef([]);

    const handleCodeChange = (index, value) => {
        const newCodes = [...codes];
        newCodes[index] = value;
        setCodes(newCodes);

        if (value !== '' && index < 5) {
            codeInputs.current[index + 1].focus();
        }
    };

    const handleSubmit = async () => {
        const code = codes.join('');
        const data = { id: userid, code: code };
        const autentResponse = await AutentifyFA(data);
        if (autentResponse.data) {
            sessionStorage.setItem('tokenSesion', autentResponse.data.token);
            dispatch(setUser(autentResponse.data.name, autentResponse.data.permission[0].idPermission));
            navigate('/', { replace: true });
        }
    };

    return (
        <div className="container__fa">
            <div className="container__fa__two">
                <h2>Two Step Authentication </h2>
                <p>Please enter the code that was sent to you by SMS</p>
                <div className="container__fa__two__code">
                    {codes.map((value, index) => (
                        <input key={index} ref={(input) => (codeInputs.current[index] = input)} type="text" value={value} onChange={(e) => handleCodeChange(index, e.target.value)} maxLength={1} />
                    ))}
                </div>
                <button onClick={handleSubmit}>Enviar</button>
            </div>
        </div>
    );
}
