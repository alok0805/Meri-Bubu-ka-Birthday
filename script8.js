const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particles = [];

function HeartSparkle(type) {
  this.x = Math.random() * canvas.width;
  this.y = Math.random() * canvas.height;
  this.size = Math.random() * 3 + 1;
  this.opacity = Math.random();
  this.speedY = Math.random() * 0.5 + 0.2;
  this.type = type; // 'sparkle' or 'heart'
  this.draw = function () {
    if (this.type === 'sparkle') {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 192, 203, ${this.opacity})`;
      ctx.fill();
    } else if (this.type === 'heart') {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.scale(this.size / 3, this.size / 3);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(0, -3, -5, -3, -5, 0);
      ctx.bezierCurveTo(-5, 3, 0, 5, 0, 7);
      ctx.bezierCurveTo(0, 5, 5, 3, 5, 0);
      ctx.bezierCurveTo(5, -3, 0, -3, 0, 0);
      ctx.closePath();
      ctx.fillStyle = `rgba(255, 105, 180, ${this.opacity})`;
      ctx.fill();
      ctx.restore();
    }
  };
  this.update = function () {
    this.y -= this.speedY;
    if (this.y < -10) {
      this.y = canvas.height + Math.random() * 20;
      this.x = Math.random() * canvas.width;
    }
  };
}

function initParticles() {
  for (let i = 0; i < 70; i++) {
    particles.push(new HeartSparkle('sparkle'));
  }
  for (let j = 0; j < 30; j++) {
    particles.push(new HeartSparkle('heart'));
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// Fireworks & Sparkles Animation on "I Love You too" Button
document.getElementById('loveYouBtn').onclick = function () {
  showFireworksAndSparkles();
};

function showFireworksAndSparkles() {
  // --- Confetti/Sparkles ---
  let confettiCanvas = document.createElement('canvas');
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
  confettiCanvas.style.position = 'fixed';
  confettiCanvas.style.top = 0;
  confettiCanvas.style.left = 0;
  confettiCanvas.style.width = '100vw';
  confettiCanvas.style.height = '100vh';
  confettiCanvas.style.pointerEvents = 'none';
  confettiCanvas.style.zIndex = 3000;
  confettiCanvas.className = "sparkle-canvas";
  document.body.appendChild(confettiCanvas);
  const ctx = confettiCanvas.getContext('2d');
  const confettiColors = [
    '#ffb6d5', '#ffe066', '#b5ead7', '#ff94cc', '#e75480',
    '#fff0f6', '#f7cac9', '#f6e2b3', '#fff700', '#ff5ca2'
  ];
  const sparkles = [];
  function Sparkle() {
    this.x = Math.random() * confettiCanvas.width;
    this.y = Math.random() * confettiCanvas.height * 0.7;
    this.radius = 2 + Math.random() * 3;
    this.color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    this.alpha = 1;
    this.life = 40 + Math.random() * 20;
    this.dx = (Math.random() - 0.5) * 6;
    this.dy = (Math.random() - 0.5) * 6;
  }
  Sparkle.prototype.update = function () {
    this.x += this.dx;
    this.y += this.dy;
    this.alpha -= 0.02;
    this.life--;
  };
  Sparkle.prototype.draw = function (ctx) {
    ctx.save();
    ctx.globalAlpha = Math.max(this.alpha, 0);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 12;
    ctx.fill();
    ctx.restore();
  };
  for (let i = 0; i < 80; i++) sparkles.push(new Sparkle());
  let sparkleFrame = 0;
  function animateSparkles() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    sparkles.forEach(s => {
      s.update();
      s.draw(ctx);
    });
    sparkleFrame++;
    if (sparkleFrame < 60) {
      requestAnimationFrame(animateSparkles);
    } else {
      confettiCanvas.remove();
    }
  }
  animateSparkles();

  // --- Fireworks ---
  let fireCanvas = document.createElement('canvas');
  fireCanvas.width = window.innerWidth;
  fireCanvas.height = window.innerHeight;
  fireCanvas.style.position = 'fixed';
  fireCanvas.style.top = 0;
  fireCanvas.style.left = 0;
  fireCanvas.style.width = '100vw';
  fireCanvas.style.height = '100vh';
  fireCanvas.style.pointerEvents = 'none';
  fireCanvas.style.zIndex = 3001;
  fireCanvas.className = "fireworks-canvas";
  document.body.appendChild(fireCanvas);
  const fctx = fireCanvas.getContext('2d');
  let particles = [];
  function Firework(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = 2 + Math.random() * 2;
    this.angle = Math.random() * 2 * Math.PI;
    this.speed = 3 + Math.random() * 3;
    this.alpha = 1;
    this.life = 60 + Math.random() * 20;
    this.dx = Math.cos(this.angle) * this.speed;
    this.dy = Math.sin(this.angle) * this.speed;
  }
  Firework.prototype.update = function () {
    this.x += this.dx;
    this.y += this.dy;
    this.dy += 0.04; // gravity
    this.alpha -= 0.015;
    this.life--;
  };
  Firework.prototype.draw = function (ctx) {
    ctx.save();
    ctx.globalAlpha = Math.max(this.alpha, 0);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 12;
    ctx.fill();
    ctx.restore();
  };
  // Launch several fireworks at random positions
  for (let i = 0; i < 6; i++) {
    let fx = Math.random() * fireCanvas.width * 0.8 + fireCanvas.width * 0.1;
    let fy = Math.random() * fireCanvas.height * 0.4 + fireCanvas.height * 0.1;
    let color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    for (let j = 0; j < 36; j++) {
      particles.push(new Firework(fx, fy, color));
    }
  }
  let fireFrame = 0;
  function animateFireworks() {
    fctx.clearRect(0, 0, fireCanvas.width, fireCanvas.height);
    particles.forEach(p => {
      p.update();
      p.draw(fctx);
    });
    particles = particles.filter(p => p.life > 0 && p.alpha > 0);
    fireFrame++;
    if (fireFrame < 80) {
      requestAnimationFrame(animateFireworks);
    } else {
      fireCanvas.remove();
    }
  }
  animateFireworks();
}

function enableMusicOnFirstInteraction() {
  const overlay = document.createElement('div');
  // ...overlay styling...
  document.body.appendChild(overlay);

  function startMusic() {
    music.play();
    overlay.remove();
    window.scrollTo({ top: 0, behavior: "smooth" }); // This line ensures page starts from top
    document.removeEventListener('click', startMusic);
    document.removeEventListener('touchstart', startMusic);
  }

  document.addEventListener('click', startMusic);
  document.addEventListener('touchstart', startMusic);
}