import React, { useState, useEffect } from 'react';

import { UserGetProfile } from '../../Datos/User/UserGetProfile';
import { UserPatch } from '../../Datos/User/UserPatch';
import './UserProfile.scss';

export const UserProfile = () => {

    const [formData, setFormData] = useState({
        _id: "",
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        repeatPassword: '',
        phone: "",
        two_fa: false,
    });

    // Uso de la función userGet
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await UserGetProfile();
                setFormData(userResponse);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    function userEdit() {
        alert('User edit');
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        UserPatch(formData._id, formData, userEdit);
        //console.log(formData);
    }

    const handleStatusChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            two_fa: e.target.checked ? true : false,
        }));
        //const newStatus = e.target.checked ? true : false;
        //setVarified(newStatus);
    };


    return (
        <div className='container'>
            <h2>Profile Edition</h2>
            <form className='container__registration' onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <label className="input-group-text">Email:</label>
                    <input className="form-control" type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="input-group mb-3">
                    <label className="input-group-text">First Name:</label>
                    <input className="form-control" type="text" id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} required />
                </div>
                <div className="input-group mb-3">
                    <label className="input-group-text">Last Name:</label>
                    <input className="form-control" type="text" id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} required />
                </div>
                <div className="input-group mb-3">
                    <label className="input-group-text">Phone:</label>
                    <input className="form-control" type="tel" id="phone" name="phone" pattern="[0-9]{4}[0-9]{4}" title="Formato requerido: 12345678" value={formData.phone || ""} onChange={handleChange} required={formData.two_fa} />
                </div>
                <div className="input-group mb-3">
                    <label className="input-group-text">Password:</label>
                    <input className="form-control" type="password" id="password" name="password" value={formData.password || ""} onChange={handleChange} />
                </div>
                <div className="input-group mb-3">
                    <label className="input-group-text">Repeat Password:</label>
                    <input className="form-control" type="password" id="repeatPassword" name="repeatPassword" value={formData.repeatPassword || ""} onChange={handleChange} />
                </div>
                <div className="form-check form-switch">
                    <label className="form-check-label">Two authentication factors</label>
                    <input className="form-check-input" type="checkbox" id="two_fa" name='two_fa' checked={formData.two_fa === true} onChange={handleStatusChange} />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};
