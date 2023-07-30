export function CompletitionPost(prompts) {
    return new Promise((resolve, reject) => {
        if (prompts) {
            var tokenGuardado = sessionStorage.getItem("tokenSesion");
            const ajaxRequest = new XMLHttpRequest();
            ajaxRequest.addEventListener("load", (response) => {
                const promptResponse = JSON.parse(response.target.response);
                resolve(promptResponse);
            });
            ajaxRequest.addEventListener("error", (error) => {
                reject(error); // Rechaza la promesa con el objeto de error
            });
            ajaxRequest.open("POST", "http://localhost:3000/api/openAiCompletition");
            ajaxRequest.setRequestHeader("Content-Type", "application/json");
            ajaxRequest.setRequestHeader("Authorization", "Bearer " + tokenGuardado);
            ajaxRequest.send(JSON.stringify(prompts));
        }
    })
}