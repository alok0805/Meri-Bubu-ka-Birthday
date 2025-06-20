const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = [];

function Heart() {
  this.x = Math.random() * canvas.width;
  this.y = canvas.height + Math.random() * 100;
  this.size = Math.random() * 20 + 10;
  this.speed = Math.random() * 1 + 0.5;
  this.opacity = Math.random();

  this.draw = function () {
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = "pink";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.bezierCurveTo(this.x + this.size / 2, this.y - this.size,
                      this.x + this.size * 1.5, this.y + this.size / 2,
                      this.x, this.y + this.size);
    ctx.bezierCurveTo(this.x - this.size * 1.5, this.y + this.size / 2,
                      this.x - this.size / 2, this.y - this.size,
                      this.x, this.y);
    ctx.fill();
  };

  this.update = function () {
    this.y -= this.speed;
    if (this.y < -this.size) {
      this.y = canvas.height + Math.random() * 100;
      this.x = Math.random() * canvas.width;
    }
    this.draw();
  };
}

function createHearts(num) {
  for (let i = 0; i < num; i++) {
    hearts.push(new Heart());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach((heart) => heart.update());
  requestAnimationFrame(animate);
}

createHearts(60);
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});