
export default function PromptsPost(prompts,createPrompt) {
  if(prompts){
    var tokenGuardado = sessionStorage.getItem("tokenSesion");
  const ajaxRequest = new XMLHttpRequest();
  ajaxRequest.addEventListener("load", (response) => {
    if (response.target.status === 201) {
      createPrompt();
    }
});
  ajaxRequest.addEventListener("error", error);
  ajaxRequest.open("POST", "http://localhost:3000/api/prompts");
  ajaxRequest.setRequestHeader("Content-Type", "application/json");
  ajaxRequest.setRequestHeader("Authorization", "Bearer " + tokenGuardado);
  ajaxRequest.send(JSON.stringify(prompts));}
}
const error = (e) => console.log(e.target.responseText);