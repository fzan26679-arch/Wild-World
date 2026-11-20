import { state } from "./state.js";
export function updateHud(){
  const p=state.player, hp=Math.max(0,p.hp);
  document.getElementById("health-fill").style.width=(hp/p.maxHealth*100)+"%";
  document.getElementById("health-text").textContent=`${hp} / ${p.maxHealth} HP`;
  const s=state.time.seconds,h=Math.floor(s/3600)%24,m=Math.floor(s%3600/60);
  document.getElementById("clock-text").textContent=`${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`;
  document.getElementById("day-text").textContent=`Hari ${state.time.day}`;
  document.getElementById("weather-icon").textContent=h>=6&&h<18?"☀":"☾";
  const i=state.inventory;
  document.getElementById("resource-strip").innerHTML=`🪵 ${i.kayu}<span>🪨 ${i.batu}</span><span>🍃 ${i.daun}</span>`;
}
