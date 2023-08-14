import React, { useState } from 'react';
import './AutentificarFA.scss';
import { useParams,Link, useNavigate } from "react-router-dom";
import { AutentifyFA } from '../../Datos/AutentificarFA/AutentificarFA';
import { useDispatch } from 'react-redux';
import { setUser } from '../../Redux/Actions/UserActions';


export function AutentificarFA() {
    const [code, setCode] = useState('');
    const { userid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleCodeChange = (event) => {
        setCode(event.target.value);
    };

    const handleSubmit = async () => {
        const data = { id: userid, code: code };
        const autentResponse = await AutentifyFA(data);
        if (autentResponse.data) {
            sessionStorage.setItem("tokenSesion", autentResponse.data.token);
            dispatch(setUser(autentResponse.data.name, autentResponse.data.permission[0].idPermission));
            navigate('/', { replace: true });
        }
        // Aquí puedes agregar la lógica para manejar el código enviado
        console.log('Código enviado:', code);
    };

    return (
        <div className="app">
            <div className="container">
                <input
                    type="text"
                    value={code}
                    onChange={handleCodeChange}
                    maxLength={6}
                    placeholder="Ingrese el código de 6 caracteres"
                />
                <button onClick={handleSubmit}>Enviar</button>
            </div>
        </div>
    );
}


