export function UserPatch(id,data, userEdit) {
    var tokenGuardado = sessionStorage.getItem("tokenSesion");
    var url = `http://localhost:3000/api/users/?id=${id}`;
    const ajaxRequest = new XMLHttpRequest();
    ajaxRequest.addEventListener("load", (response) => {
        if (response.target.status === 200) {
            userEdit();
        }
    });
    ajaxRequest.addEventListener("error", error);
    ajaxRequest.open("PATCH", url);
    ajaxRequest.setRequestHeader("Content-Type", "application/json");
    ajaxRequest.setRequestHeader("Authorization", "Bearer " + tokenGuardado);
    ajaxRequest.send(JSON.stringify(data));
  }
  const error = (e) => console.log(e.target.responseText);