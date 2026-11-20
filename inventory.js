import { state } from "./state.js";
const labels=[["kayu","🪵","Kayu"],["batu","🪨","Batu"],["daun","🍃","Daun"],["wol","☁","Wol"],["lapis","💎","Lapis Lazuli"],["kertas","▤","Kertas"]];
export function openInventory(){
  const grid=document.getElementById("inventory-grid");grid.innerHTML="";
  for(let n=0;n<16;n++){
    const item=labels[n];
    const cell=document.createElement("div");cell.className="inventory-cell";
    if(item){cell.innerHTML=`<span>${item[1]}</span><small>${state.inventory[item[0]]||0}</small>`;cell.title=item[2]}
    grid.appendChild(cell);
  }
}
