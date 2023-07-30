import { useNavigate } from "react-router-dom";

export default function ValidToken(jsonResponse){
    const navigate = useNavigate();
    console.log(jsonResponse)
    if(jsonResponse.valid===false){
        sessionStorage.removeItem('tokenSesion');
        navigate("/login");
    }
}