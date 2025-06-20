const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = [];

function createHeart() {
  const size = Math.random() * 8 + 5;
  hearts.push({
    x: Math.random() * canvas.width,
    y: canvas.height + size,
    size,
    speed: Math.random() * 1 + 0.5,
    opacity: Math.random() * 0.5 + 0.5
  });
}

function drawHeart(x, y, size, opacity) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size / 30, size / 30);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(0, -3, -5, -15, -15, -15);
  ctx.bezierCurveTo(-35, -15, -35, 10, -35, 10);
  ctx.bezierCurveTo(-35, 25, -20, 35, 0, 45);
  ctx.bezierCurveTo(20, 35, 35, 25, 35, 10);
  ctx.bezierCurveTo(35, 10, 35, -15, 15, -15);
  ctx.bezierCurveTo(5, -15, 0, -3, 0, 0);
  ctx.closePath();
  ctx.fillStyle = `rgba(255, 105, 180, ${opacity})`;
  ctx.fill();
  ctx.restore();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  createHeart();
  for (let i = 0; i < hearts.length; i++) {
    const h = hearts[i];
    drawHeart(h.x, h.y, h.size, h.opacity);
    h.y -= h.speed;
    if (h.y + h.size < 0) hearts.splice(i, 1);
  }
  requestAnimationFrame(animate);
}

animate();