const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Heart {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 100;
    this.size = 10 + Math.random() * 20;
    this.speed = 1 + Math.random() * 2;
    this.alpha = 0.5 + Math.random() * 0.5;
  }

  update() {
    this.y -= this.speed;
    if (this.y < -this.size) this.reset();
  }
  playMusic() {
    if (!Heart.audio) {
      Heart.audio = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
      Heart.audio.loop = true;
      Heart.audio.volume = 0.5;
      Heart.audio.play().catch(() => {});
    }
  }
  draw() {
    ctx.beginPath();
    const x = this.x, y = this.y, s = this.size;
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x + s / 2, y - s, x + s * 2, y + s / 2, x, y + s * 1.5);
    ctx.bezierCurveTo(x - s * 2, y + s / 2, x - s / 2, y - s, x, y);
    ctx.fillStyle = `rgba(255, 105, 180, ${this.alpha})`;
    ctx.fill();
  }
}

const hearts = Array.from({ length: 40 }, () => new Heart());

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let heart of hearts) {
    heart.update();
    heart.draw();
  }
  requestAnimationFrame(animate);
}

animate();