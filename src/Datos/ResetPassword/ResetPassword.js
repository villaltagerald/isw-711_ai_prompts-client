export const ResetPassword=(data,token)=> {
    return new Promise((resolve, reject) => {
      var url = `http://localhost:3000/api/resetpasswaord/?token=${token}`;
      const ajaxRequest = new XMLHttpRequest();
      ajaxRequest.addEventListener("load", (response) => {
        const promptResponse = JSON.parse(response.target.responseText);
          resolve(promptResponse);
      });
      ajaxRequest.addEventListener("error", (error) => {
        reject(error); // Rechaza la promesa con el objeto de error
      });
      ajaxRequest.open("POST", url);
      ajaxRequest.setRequestHeader("Content-Type", "application/json");
      ajaxRequest.send(JSON.stringify(data));
    });
  }