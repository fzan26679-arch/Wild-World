import { CONFIG } from "./config.js";
import { state } from "./state.js";
export function updateTime(dt){
  state.time.seconds+=dt*86400/CONFIG.dayLengthSeconds;
  if(state.time.seconds>=86400){state.time.seconds-=86400;state.time.day++}
}
