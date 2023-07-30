
export function SessionToken(username, password) {
    //envio al api para login
    return new Promise((resolve, reject) => {
        const ajaxRequest = new XMLHttpRequest();
        ajaxRequest.addEventListener("load", (response) => {
            const taskResponse = JSON.parse(response.target.responseText);
            if (response.target.status === 201) {
                resolve(taskResponse.data);
            } else {
                alert(taskResponse.error);
            }
        });
        ajaxRequest.addEventListener("error", (error) => {
            reject(error); // Rechaza la promesa con el objeto de error
        });
        ajaxRequest.open("POST", "http://localhost:3000/api/session");
        ajaxRequest.setRequestHeader("Content-Type", "application/json");

        const data = {
            'username': username,
            'password': password
        };
        ajaxRequest.send(JSON.stringify(data));
    });
};

//const error = (e) => console.log(e.target.responseText);
