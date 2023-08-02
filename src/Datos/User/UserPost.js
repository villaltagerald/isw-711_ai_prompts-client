export default function UserPost(data) {
    return new Promise((resolve, reject) => {
        var tokenGuardado = sessionStorage.getItem("tokenSesion");
        const ajaxRequest = new XMLHttpRequest();
        ajaxRequest.addEventListener("load", (response) => {
            const userResponse = JSON.parse(response.target.responseText);
            resolve(userResponse);
        });
        ajaxRequest.addEventListener("error", (error) => {
            reject(error); // Rechaza la promesa con el objeto de error
        });
        ajaxRequest.open("POST", "http://localhost:3000/api/users");
        ajaxRequest.setRequestHeader("Content-Type", "application/json");
        tokenGuardado && ajaxRequest.setRequestHeader("Authorization", "Bearer " + tokenGuardado);
        ajaxRequest.send(JSON.stringify(data));
    });
}
