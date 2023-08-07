export const ResetMail = (data) => {
  return new Promise((resolve, reject) => {
    var url = "http://localhost:3000/api/resetmail";
    const ajaxRequest = new XMLHttpRequest();
    ajaxRequest.addEventListener("load", (response) => {
      resolve(response.target.status);
    });
    ajaxRequest.addEventListener("error", (error) => {
      reject(error); // Rechaza la promesa con el objeto de error
    });
    ajaxRequest.open("POST", url);
    ajaxRequest.setRequestHeader("Content-Type", "application/json");
    ajaxRequest.send(JSON.stringify(data));
  });
}