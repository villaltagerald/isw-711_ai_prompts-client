export default function ValidateToken() {
    return new Promise((resolve, reject) => {
      const url = "http://localhost:3000/api/validate_token";
      const ajaxRequest = new XMLHttpRequest();
      ajaxRequest.addEventListener("load", (response) => {
        const validateResponse = JSON.parse(response.target.responseText);
        resolve(validateResponse); // Resuelve la promesa con el valor Response
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
  
  //const error = (e) => console.log(e.target.responseText);