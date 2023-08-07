import UserTable from "../../Components/UserTable/UserTable"
import { UserGet } from "../../Datos/User/UserGet";
import { UserDelete } from "../../Datos/User/UserDelete";
import './UserViews.scss';
import { AlertMessage } from "../../Components/AlertMessage/AlertMessage";

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function UserViews() {
    const [showAlert, setShowAlert] = useState(false);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    // Uso de la función userGet
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await UserGet();
                setUsers(userResponse);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const userDelete = () => {
        setShowAlert(true);

    }

    const onView = (userId) => {
        navigate(`/userview/${userId}`);
    }

    const onEdit = (userId) => {
        navigate(`/useredit/${userId}`);
    }

    const onDelete = (userId) => {
        UserDelete(userId, userDelete);
        setUsers(users.filter((user) => user._id !== userId));
    }
    //const users = GetCourse();
    //console.log(users); users, onView
    return (
        <div className="container_table">
            {showAlert && (<AlertMessage showAlert={showAlert} setShowAlert={setShowAlert} message={"User successfully deleted"} variant={"success"} />)}

            <button onClick={() => navigate(`/usernew`)}><i className="fa-regular fa-square-plus fa-2xl" style={{ color: '#ffffff', }}></i></button>

            <UserTable users={users} onView={onView} onEdit={onEdit} onDelete={onDelete} />
        </div>
    )
}