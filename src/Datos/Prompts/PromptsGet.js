
export const PromptsGet=(id)=> {
  return new Promise((resolve, reject) => {
    var url = "http://localhost:3000/api/prompts";
    if (id) {
      url = `${url}/?id=${id}`;
    }
    const ajaxRequest = new XMLHttpRequest();
    ajaxRequest.addEventListener("load", (response) => {
      const promptResponse = JSON.parse(response.target.responseText);
        resolve(promptResponse);
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