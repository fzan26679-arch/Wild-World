import { state } from "./state.js";
export function initControls(){
  const map={"left":"left","right":"right","jump":"jump"};
  document.querySelectorAll("[data-control]").forEach(btn=>{
    const key=map[btn.dataset.control];
    const down=e=>{e.preventDefault();state.input[key]=true;btn.setPointerCapture?.(e.pointerId)};
    const up=()=>state.input[key]=false;
    btn.addEventListener("pointerdown",down);
    ["pointerup","pointercancel","lostpointercapture"].forEach(ev=>btn.addEventListener(ev,up));
  });
  addEventListener("keydown",e=>{
    if(["ArrowLeft","a","A"].includes(e.key))state.input.left=true;
    if(["ArrowRight","d","D"].includes(e.key))state.input.right=true;
    if([" ","ArrowUp","w","W"].includes(e.key)){state.input.jump=true;e.preventDefault()}
  });
  addEventListener("keyup",e=>{
    if(["ArrowLeft","a","A"].includes(e.key))state.input.left=false;
    if(["ArrowRight","d","D"].includes(e.key))state.input.right=false;
    if([" ","ArrowUp","w","W"].includes(e.key))state.input.jump=false;
  });
}
