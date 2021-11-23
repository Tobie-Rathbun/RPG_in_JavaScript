// polyfill for requestAnimationFrame API
var requestAnimationFrame =
  requestAnimationFrame || window.requestAnimationFrame;

// get canvas API from HTML DOM
const canvas = document.getElementById("canvas");

// set dimensions to fill entire window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// get 2D context API from Canvas
const ctx = canvas.getContext("2d");

// create some variables for animation purposes
let FRAMECOUNT = 0;
let RADIUS = 0;
let ZIG = false;

// make this object exportable so it can be imported into the listeners.js file and get updated by mouse movement
export const POSITION = { x: 0, y: 0 };

// create skeleton texture
//const skeleton = new Image();
//skeleton.src = "../public/favicon.png";

//create berry texture
const berry = new Image();
berry.src = "../img/berry.png";
berry.style.width = "10px";
berry.style.height = "10px";

// triangle wave modulator to invert "ZIG" after every 200 frames
const triangleModulation = () => {
  if (!(FRAMECOUNT % 200)) {
    ZIG = !ZIG;
  }
};

// draw circular gradient to canvas for the fun of it
const drawGradient = () => {
  const gradient = ctx.createRadialGradient(
    75,
    0,
    200,
    90,
    ZIG ? ++RADIUS : --RADIUS,
    800
  );
  gradient.addColorStop(0, "#c772ea");
  gradient.addColorStop(0.5, "#e24fff");
  gradient.addColorStop(1, "white");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
};

// draw skeleton texture to canvas with the position being set by mouse movement
//const drawSkeleton = () => {
//  ctx.drawImage(skeleton, POSITION.x, POSITION.y);
//};

// draw berry texture to canvas with the position being set by mouse movement
const drawBerry = () => {
  ctx.drawImage(berry, POSITION.x - 64, POSITION.y - 190, 128, 128);
};

// The Animation Loop
const animate = () => {
  FRAMECOUNT += 1;
  triangleModulation();
  drawGradient();
  drawBerry();
  // this is a special Web API that attempts to recursively call the function passed to it
  // every 1/60 second
  //logs position coordinates each frame
  requestAnimationFrame(animate);
};

// kick off the animation loop
animate();
