import { initUI } from "./ui.js";
import { initControls } from "./controls.js";
window.wwToast=(message)=>{
  let el=document.getElementById("toast-message");
  if(!el){el=document.createElement("div");el.id="toast-message";el.className="toast-message";document.body.appendChild(el)}
  el.textContent=message;el.classList.add("visible");clearTimeout(window.wwToastTimer);
  window.wwToastTimer=setTimeout(()=>el.classList.remove("visible"),1900);
};
initUI();
initControls();
