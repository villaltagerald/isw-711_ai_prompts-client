
export const UserGetProfile=(id)=> {
  return new Promise((resolve, reject) => {
    var url = "http://localhost:3000/api/usersprofile";
    const ajaxRequest = new XMLHttpRequest();
    ajaxRequest.addEventListener("load", (response) => {
      const userResponse = JSON.parse(response.target.responseText);
        resolve(userResponse);
    });
    ajaxRequest.addEventListener("error", (error) => {
      reject(error); // Rechaza la promesa con el objeto de error
    });
    ajaxRequest.open("GET", url);
    ajaxRequest.setRequestHeader("Content-Type", "application/json");
    ajaxRequest.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem("tokenSesion"));
    ajaxRequest.send();
  });
}
