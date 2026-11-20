import { CONFIG } from "./config.js";
import { state } from "./state.js";
import { updatePlayer } from "./player.js";
import { drawWorld } from "./renderer.js";
import { updateTime } from "./time.js";
import { updateHud } from "./hud.js";

const canvas=document.getElementById("game-canvas"),ctx=canvas.getContext("2d");
let last=0,raf=0,started=false;
function resize(){const dpr=Math.min(devicePixelRatio||1,2);canvas.width=innerWidth*dpr;canvas.height=innerHeight*dpr;canvas.style.width=innerWidth+"px";canvas.style.height=innerHeight+"px";ctx.setTransform(dpr,0,0,dpr,0,0)}
addEventListener("resize",resize);resize();
export function startGame(world){
  state.activeWorld=world;
  CONFIG.groundY=Math.max(280,Math.min(560,innerHeight*.72));
  if(!started){generateObjects();started=true}
  state.player.x=160;state.player.y=CONFIG.groundY-state.player.height;
  last=performance.now();cancelAnimationFrame(raf);raf=requestAnimationFrame(loop);
}
function loop(now){
  if(state.screen!=="game-screen"){raf=requestAnimationFrame(loop);last=now;return}
  const dt=Math.min((now-last)/1000,.035);last=now;
  updatePlayer(dt);updateTime(dt);drawWorld(ctx,canvas);updateHud();
  raf=requestAnimationFrame(loop);
}
function generateObjects(){
  state.objects=[];
  for(let x=500;x<CONFIG.worldWidth*CONFIG.tileSize-300;x+=180+Math.random()*180){
    state.objects.push({type:Math.random()<.67?"tree":"rock",x,y:CONFIG.groundY-18,alive:true});
  }
}
export function getContext(){return {canvas,ctx}}
export function getNearbyObject(){
  let best=null,dist=78;
  for(const o of state.objects){if(!o.alive)continue;const d=Math.abs(o.x-(state.player.x+state.player.width/2));if(d<dist){best=o;dist=d}}
  return best;
}
window.wwGather=()=>{
  const o=getNearbyObject();
  if(!o){window.wwToast?.("Tidak ada sumber daya di dekatmu.");return}
  if(o.type==="tree"){state.inventory.kayu+=2;state.inventory.daun+=1}
  else state.inventory.batu+=2;
  o.alive=false;window.wwToast?.(o.type==="tree"?"Mendapat 2 kayu dan 1 daun.":"Mendapat 2 batu.");
  updateHud();
};
