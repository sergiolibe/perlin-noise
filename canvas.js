console.log("r/place");
let canvas = document.querySelector("canvas");
console.log(canvas);
let ctx = canvas.getContext("2d");

//line
let previousFrameTime = 0;
let FPS;
let x = 0;
let r = 20;
let r2 = 10;
let xo = 100;
let yo = 80;
let xf,
  yf = 0;
function animate(time) {
  FPS = Math.floor(1000 / (time - previousFrameTime));
  previousFrameTime = time;
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  ctx.fillText(FPS, 10, 10);
  ctx.beginPath();
  ctx.moveTo(xo, yo);
  //xf = xo + r * Math.cos(x);
  yf = yo + r * Math.sin(x);
  ctx.lineTo(xf, yf);
  ctx.lineTo(xf + r2 * Math.cos(-x * 2), yf + r2 * Math.sin(-x * 2));
  // ctx.fillRect(xf - 5, yf - 5, 10, 10);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(
    xf + r2 * 6 * Math.cos(-x * 2),
    yf + r2 * 6 * Math.sin(-x * 2),
    5,
    0,
    2 * Math.PI
  );
  ctx.fill();
  ctx.beginPath();
  ctx.arc(
    200 + r2 * 6 * Math.cos(-x * 0.5),
    100 + r2 * 3 * Math.sin(-x * 0.5),
    5,
    0,
    2 * Math.PI
  );
  ctx.fill();
  x += 0.05;
  requestAnimationFrame(animate);
}

animate();
