import { state, saveWorlds, saveSettings } from "./state.js";
import { startGame, loadWorldData } from "./world.js";
import { openInventory } from "./inventory.js";

const $ = id => document.getElementById(id);
const screens = ["main-menu","world-screen","create-screen","settings-screen","about-screen","game-screen","pause-screen","inventory-screen"];
export function showScreen(id){
  screens.forEach(s=>$(s).classList.toggle("hidden",s!==id));
  state.screen=id;
}
export function initUI(){
  $("play-button").onclick=()=>{renderWorlds();showScreen("world-screen")};
  $("continue-button").onclick=()=>{if(state.activeWorld){startGame(state.activeWorld);showScreen("game-screen")}};
  $("worlds-button").onclick=()=>{renderWorlds();showScreen("world-screen")};
  $("settings-button").onclick=()=>showScreen("settings-screen");
  $("about-button").onclick=()=>showScreen("about-screen");
  $("create-world-button").onclick=()=>showScreen("create-screen");
  $("start-world-button").onclick=()=>{
    const name=$("world-name").value.trim()||"Dunia Baru";
    const world={id:crypto.randomUUID?crypto.randomUUID():String(Date.now()),name,type:$("world-type").value,created:Date.now()};
    state.worlds.push(world);saveWorlds();state.activeWorld=world;startGame(world);showScreen("game-screen");updateContinue();
  };
  $("save-settings").onclick=()=>{
    state.settings.volume=Number($("volume-setting").value);
    state.settings.speed=Number($("speed-setting").value);
    saveSettings();showScreen("main-menu");
  };
  $("pause-button").onclick=()=>showScreen("pause-screen");
  $("resume-button").onclick=()=>showScreen("game-screen");
  $("exit-button").onclick=()=>{showScreen("main-menu");updateContinue()};
  $("inventory-button").onclick=()=>{openInventory();showScreen("inventory-screen")};
  $("pause-inventory-button").onclick=()=>{openInventory();showScreen("inventory-screen")};
  $("interact-button").onclick=()=>window.wwGather?.();
  $("closeInv")?.addEventListener("click",()=>showScreen("game-screen"));
  document.querySelectorAll("[data-back]").forEach(b=>b.addEventListener("click",()=>showScreen(b.dataset.back)));
  document.querySelectorAll(".hot-slot").forEach(b=>b.onclick=()=>{document.querySelectorAll(".hot-slot").forEach(x=>x.classList.remove("selected"));b.classList.add("selected")});
  $("volume-setting").value=state.settings.volume;
  $("speed-setting").value=String(state.settings.speed);
  renderWorlds();updateContinue();
}
function renderWorlds(){
  const list=$("world-list");list.innerHTML="";
  if(!state.worlds.length){list.innerHTML='<p class="muted">Belum ada dunia. Buat dunia pertamamu!</p>';return}
  state.worlds.forEach(w=>{
    const b=document.createElement("button");b.className="world-card";
    b.innerHTML=`<span><b>${escapeHtml(w.name)}</b><small>${w.type==="peaceful"?"Mode Damai":"Mode Normal"}</small></span><span>▶</span>`;
    b.onclick=()=>{state.activeWorld=w;startGame(w);showScreen("game-screen");updateContinue()};
    list.appendChild(b);
  });
}
function updateContinue(){$("continue-button").disabled=!state.activeWorld&&!state.worlds.length}
function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
