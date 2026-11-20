import { CONFIG } from "./config.js";
import { state } from "./state.js";
export function updatePlayer(dt){
  const p=state.player, speed=CONFIG.playerSpeed*state.settings.speed;
  p.vx=(state.input.right?1:0)-(state.input.left?1:0);
  if(p.vx)p.facing=Math.sign(p.vx);
  p.x+=p.vx*speed*dt;
  p.x=Math.max(25,Math.min(CONFIG.worldWidth*CONFIG.tileSize-25,p.x));
  if(state.input.jump&&p.onGround){p.vy=-CONFIG.jumpPower;p.onGround=false}
  p.vy+=CONFIG.gravity*dt;p.y+=p.vy*dt;
  if(p.y>=CONFIG.groundY-p.height){p.y=CONFIG.groundY-p.height;p.vy=0;p.onGround=true}
}
