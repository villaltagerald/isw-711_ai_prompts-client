export function PromptsPatch(id, data) {
  return new Promise((resolve, reject) => {
    var tokenGuardado = sessionStorage.getItem("tokenSesion");
    var url = `http://localhost:3000/api/prompts/?id=${id}`;
    const ajaxRequest = new XMLHttpRequest();
    ajaxRequest.addEventListener("load", (response) => {
      const promptResponse = JSON.parse(response.target.responseText);
        resolve(promptResponse);
    });
    ajaxRequest.addEventListener("error", (error) => {
      reject(error); // Rechaza la promesa con el objeto de error
    });
    ajaxRequest.open("PATCH", url);
    ajaxRequest.setRequestHeader("Content-Type", "application/json");
    ajaxRequest.setRequestHeader("Authorization", "Bearer " + tokenGuardado);
    ajaxRequest.send(JSON.stringify(data));


  })
}
