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
                <div className="container__registration__group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="container__registration__group">
                    <label htmlFor="first_name">First Name:</label>
                    <input type="text" id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} required />
                </div>
                <div className="container__registration__group">
                    <label htmlFor="last_name">Last Name:</label>
                    <input type="text" id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} required />
                </div>
                <div className="container__registration__group">
                    <label htmlFor="phone">Phone:</label>
                    <input type="tel" id="phone" name="phone" pattern="[0-9]{4}[0-9]{4}" title="Formato requerido: 12345678" value={formData.phone || ""} onChange={handleChange} required={formData.two_fa} />
                </div>
                <div className="container__registration__group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={formData.password || ""} onChange={handleChange} />
                </div>
                <div className="container__registration__group">
                    <label htmlFor="repeatPassword">Repeat Password:</label>
                    <input type="password" id="repeatPassword" name="repeatPassword" value={formData.repeatPassword || ""} onChange={handleChange} />
                </div>
                <div className="registration__box__twofa">
                    <label htmlFor="two_fa">Two authentication factors:</label>
                    <input type="checkbox" id="two_fa" name='two_fa' checked={formData.two_fa === true} onChange={handleStatusChange} />
                    {formData.two_fa === true ? 'Active' : 'Inactive'}
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};
