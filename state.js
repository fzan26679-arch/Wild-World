export const state = {
  screen: "main-menu",
  activeWorld: null,
  worlds: JSON.parse(localStorage.getItem("ww-worlds") || "[]"),
  settings: JSON.parse(localStorage.getItem("ww-settings") || '{"volume":65,"speed":1}'),
  inventory: { kayu: 0, batu: 0, daun: 0, wol: 0, lapis: 0, kertas: 0 },
  player: { x: 160, y: 0, vx: 0, vy: 0, width: 34, height: 58, hp: 100, onGround: false, facing: 1 },
  time: { seconds: 8 * 3600, day: 1 },
  camera: { x: 0 },
  input: { left: false, right: false, jump: false },
  objects: []
};
export function saveWorlds(){localStorage.setItem("ww-worlds",JSON.stringify(state.worlds))}
export function saveSettings(){localStorage.setItem("ww-settings",JSON.stringify(state.settings))}
