import { CONFIG } from "./config.js";
import { state } from "./state.js";
export function drawWorld(ctx,canvas){
  const w=innerWidth,h=innerHeight,p=state.player;
  const cam=Math.max(0,Math.min(CONFIG.worldWidth*CONFIG.tileSize-w,p.x-w*.42));state.camera.x=cam;
  const hour=(state.time.seconds/3600)%24;
  const sky=hour>=6&&hour<18?"#8bd0d5":"#182b4b";
  const grad=ctx.createLinearGradient(0,0,0,h);grad.addColorStop(0,sky);grad.addColorStop(1,hour>=6&&hour<18?"#d5e9c3":"#40516a");
  ctx.fillStyle=grad;ctx.fillRect(0,0,w,h);
  // Matahari/bulan dan awan bergerak
  ctx.fillStyle=hour>=6&&hour<18?"#fff0a6":"#e6e8ff";
  ctx.beginPath();ctx.arc(w*.78,95,32,0,Math.PI*2);ctx.fill();
  for(let i=0;i<7;i++){const x=((i*260-cam*.22)%(w+260)+w+260)%(w+260)-100;drawCloud(ctx,x,90+(i%3)*45)}
  // bukit latar
  ctx.fillStyle="#76b78b";ctx.beginPath();ctx.moveTo(0,CONFIG.groundY-40);
  for(let x=0;x<=w+30;x+=30)ctx.lineTo(x,CONFIG.groundY-80-Math.sin((x+cam*.15)/145)*38);
  ctx.lineTo(w,CONFIG.groundY+80);ctx.lineTo(0,CONFIG.groundY+80);ctx.fill();
  // tanah berlapis
  ctx.fillStyle="#936743";ctx.fillRect(0,CONFIG.groundY,w,h-CONFIG.groundY);
  ctx.fillStyle="#65a94f";ctx.fillRect(0,CONFIG.groundY,w,17);
  ctx.fillStyle="#83c75e";ctx.fillRect(0,CONFIG.groundY,w,5);
  for(let x=-(cam%48);x<w;x+=48){ctx.fillStyle="#7c5638";ctx.fillRect(x,CONFIG.groundY+17,46,34);ctx.strokeStyle="#69482f";ctx.strokeRect(x,CONFIG.groundY+17,46,34)}
  for(const o of state.objects){if(!o.alive)continue;const x=o.x-cam;if(x<-100||x>w+100)continue;o.type==="tree"?drawTree(ctx,x,o.y):drawRock(ctx,x,o.y)}
  drawPlayer(ctx,p.x-cam,p.y,p.width,p.height,p.facing);
  if(hour>=19||hour<5){ctx.fillStyle="rgba(10,19,43,.48)";ctx.fillRect(0,0,w,h)}
  else if(hour<7){ctx.fillStyle=`rgba(20,35,55,${(7-hour)*.11})`;ctx.fillRect(0,0,w,h)}
}
function drawCloud(c,x,y){c.fillStyle="#ffffffa8";c.beginPath();c.arc(x,y,17,0,7);c.arc(x+20,y-9,23,0,7);c.arc(x+45,y,17,0,7);c.fill()}
function drawTree(c,x,y){c.fillStyle="#684a35";round(c,x-10,y-74,20,76,5);c.fillStyle="#286d45";c.beginPath();c.arc(x,y-93,39,0,7);c.arc(x-24,y-75,27,0,7);c.arc(x+25,y-73,27,0,7);c.fill();c.fillStyle="#398c50";c.beginPath();c.arc(x-8,y-106,23,0,7);c.fill();c.fillStyle="#69b95c";c.beginPath();c.arc(x-14,y-112,9,0,7);c.fill()}
function drawRock(c,x,y){c.fillStyle="#697a7b";c.beginPath();c.moveTo(x-30,y);c.lineTo(x-22,y-24);c.lineTo(x-5,y-38);c.lineTo(x+22,y-29);c.lineTo(x+31,y);c.closePath();c.fill();c.fillStyle="#9eafaa";c.beginPath();c.moveTo(x-16,y-23);c.lineTo(x-5,y-35);c.lineTo(x+7,y-29);c.lineTo(x-3,y-20);c.fill()}
function drawPlayer(c,x,y,w,h,dir){c.save();c.translate(x+w/2,y);if(dir<0)c.scale(-1,1);c.fillStyle="#0003";c.beginPath();c.ellipse(0,h+3,20,6,0,0,7);c.fill();c.fillStyle="#d99c72";round(c,-12,5,24,23,8);c.fillStyle="#e6b18a";round(c,-13,-15,26,26,9);c.fillStyle="#523b2e";round(c,-14,-20,28,12,7);c.fillStyle="#263f38";c.fillRect(-10,26,9,23);c.fillRect(2,26,9,23);c.fillStyle="#d7e5ce";c.fillRect(-12,46,13,7);c.fillRect(2,46,13,7);c.fillStyle="#382a27";c.fillRect(5,-5,3,3);c.restore()}
function round(c,x,y,w,h,r){c.beginPath();c.roundRect(x,y,w,h,r);c.fill()}
