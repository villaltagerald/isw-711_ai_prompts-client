export const AutentifyFA=(data)=> {
    return new Promise((resolve, reject) => {
      const ajaxRequest = new XMLHttpRequest();
      ajaxRequest.addEventListener("load", (response) => {
        const promptResponse = JSON.parse(response.target.responseText);
          resolve(promptResponse);
      });
      ajaxRequest.addEventListener("error", (error) => {
        reject(error); // Rechaza la promesa con el objeto de error
      });
      ajaxRequest.open("POST", "http://localhost:3000/api/verifycode");
      ajaxRequest.setRequestHeader("Content-Type", "application/json");
      ajaxRequest.send(JSON.stringify(data));
    });
  }