import { POSITION } from "./index.js";

window.addEventListener("mousemove", (e) => {
  POSITION.x = e.screenX;
  POSITION.y = e.screenY;
});
