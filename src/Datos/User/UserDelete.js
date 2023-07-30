export function UserDelete(id,userDelete) {
    if (id) {
        var tokenGuardado = sessionStorage.getItem("tokenSesion");
        var url = `http://localhost:3000/api/users/?id=${id}`;
        const ajaxRequest = new XMLHttpRequest();
        ajaxRequest.addEventListener("load", (response) => {
            if (response.target.status === 204) {
                userDelete();
            }
        });
        ajaxRequest.addEventListener("error", error);
        ajaxRequest.open("DELETE", url);
        ajaxRequest.setRequestHeader("Content-Type", "application/json");
        ajaxRequest.setRequestHeader("Authorization", "Bearer " + tokenGuardado);
        ajaxRequest.send();
    }

}
const error = (e) => console.log(e.target.responseText);