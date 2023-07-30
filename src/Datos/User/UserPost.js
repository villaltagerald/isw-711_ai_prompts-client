export default function UserPost(data, userCreated) {
    var tokenGuardado = sessionStorage.getItem("tokenSesion");
    const ajaxRequest = new XMLHttpRequest();
    ajaxRequest.addEventListener("load", (response) => {
        if (response.target.status === 201) {
            userCreated();
        }
    });
    ajaxRequest.addEventListener("error", error);
    ajaxRequest.open("POST", "http://localhost:3000/api/users");
    ajaxRequest.setRequestHeader("Content-Type", "application/json");
    tokenGuardado && ajaxRequest.setRequestHeader("Authorization", "Bearer " + tokenGuardado);
    ajaxRequest.send(JSON.stringify(data));
}
const error = (e) => console.log(e.target.responseText);