// Romantic floating hearts + animated birthday cake with candle blow & cake cutting

const canvas = document.getElementById("hearts");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];
let candles = [
  { xOffset: -28, blown: false },
  { xOffset: 28, blown: false }
];
let cakeCut = false;
let cutAnim = 0;
let sliceAnim = 0;
let sliceMoving = false;

// Heart shape with more variety and sparkle
function Heart() {
  this.x = Math.random() * canvas.width;
  this.y = canvas.height + Math.random() * 100;
  this.size = Math.random() * 18 + 12;
  this.speed = Math.random() * 0.7 + 0.5;
  this.alpha = Math.random() * 0.5 + 0.5;
  this.color = `hsl(${Math.floor(Math.random() * 30 + 330)}, 80%, 70%)`; // pink-red hues
  this.twinkle = Math.random() > 0.7;
}

Heart.prototype.draw = function () {
  ctx.save();
  ctx.globalAlpha = this.alpha;
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.moveTo(this.x, this.y);
  ctx.bezierCurveTo(
    this.x - this.size / 2,
    this.y - this.size / 2,
    this.x - this.size,
    this.y + this.size / 3,
    this.x,
    this.y + this.size
  );
  ctx.bezierCurveTo(
    this.x + this.size,
    this.y + this.size / 3,
    this.x + this.size / 2,
    this.y - this.size / 2,
    this.x,
    this.y
  );
  ctx.fill();
  // Sparkle effect
  if (this.twinkle && Math.random() > 0.7) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size / 7, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.fill();
  }
  ctx.restore();
};

Heart.prototype.update = function () {
  this.y -= this.speed;
  if (this.y < -this.size) {
    this.y = canvas.height + Math.random() * 100;
    this.x = Math.random() * canvas.width;
    this.color = `hsl(${Math.floor(Math.random() * 30 + 330)}, 80%, 70%)`;
    this.twinkle = Math.random() > 0.7;
  }
};

// Draw animated 18th birthday cake with candle blow and cutting
function drawCake(time) {
  const centerX = canvas.width / 2;
  const baseY = canvas.height * 0.7;
  const cakeWidth = 170;
  const cakeHeight = 80;
  const layerHeight = 30;

  // Cake base
  ctx.save();
  ctx.globalAlpha = 0.96;
  ctx.fillStyle = "#fff0f6";
  ctx.strokeStyle = "#e75480";
  ctx.lineWidth = 3;
  ctx.beginPath();
  roundRect(ctx, centerX - cakeWidth / 2, baseY - cakeHeight, cakeWidth, cakeHeight, 22);
  ctx.fill();
  ctx.stroke();

  // Cake layer
  ctx.fillStyle = "#ffe0ec";
  ctx.beginPath();
  roundRect(ctx, centerX - cakeWidth / 2 + 18, baseY - cakeHeight - layerHeight, cakeWidth - 36, layerHeight, 16);
  ctx.fill();
  ctx.stroke();

  // "18" number candles
  ctx.font = "bold 38px Pacifico, cursive";
  ctx.fillStyle = "#e75480";
  ctx.textAlign = "center";
  ctx.fillText("18", centerX, baseY - cakeHeight - 10);

  // Candle flames (animated, blow out on click)
  candles.forEach((candle, idx) => {
    let x = centerX + candle.xOffset;
    let y = baseY - cakeHeight - 28;
    // Candle body
    ctx.save();
    ctx.fillStyle = "#ffd6e0";
    ctx.fillRect(x - 4, y + 10, 8, 22);
    ctx.strokeStyle = "#e75480";
    ctx.lineWidth = 1.2;
    ctx.strokeRect(x - 4, y + 10, 8, 22);
    ctx.restore();

    // Flame
    if (!candle.blown) {
      let flameY = y - Math.sin(time / 400 + idx * 2) * 5;
      ctx.beginPath();
      ctx.ellipse(x, flameY, 7, 13, 0, 0, 2 * Math.PI);
      ctx.fillStyle = "rgba(255, 200, 60, 0.85)";
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(x, flameY, 3, 6, 0, 0, 2 * Math.PI);
      ctx.fillStyle = "rgba(255, 255, 180, 0.9)";
      ctx.fill();
    } else {
      // Small smoke puff
      ctx.beginPath();
      ctx.arc(x, y - 10 - Math.abs(Math.sin(time / 200 + idx)), 5, 0, 2 * Math.PI);
      ctx.fillStyle = "rgba(180,180,180,0.18)";
      ctx.fill();
    }
  });

  // Sprinkles
  for (let i = 0; i < 18; i++) {
    ctx.beginPath();
    ctx.arc(
      centerX - cakeWidth / 2 + 18 + Math.random() * (cakeWidth - 36),
      baseY - cakeHeight + 10 + Math.random() * (cakeHeight - 20),
      3,
      0,
      2 * Math.PI
    );
    ctx.fillStyle = `hsl(${Math.random() * 360},80%,70%)`;
    ctx.fill();
  }

  // Cake cutting animation
  if (cakeCut && cutAnim < cakeHeight + layerHeight + 10) {
    ctx.save();
    ctx.strokeStyle = "#d72660";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(centerX, baseY - cakeHeight - layerHeight - 10);
    ctx.lineTo(centerX, baseY - cakeHeight + cutAnim);
    ctx.stroke();
    ctx.restore();
    cutAnim += 4;
    if (cutAnim >= cakeHeight + layerHeight + 10) {
      sliceMoving = true;
    }
  }

  // Slice animation after cut
  if (sliceMoving && sliceAnim < 80) {
    // Draw moving right slice
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(centerX, baseY - cakeHeight - layerHeight - 10);
    ctx.lineTo(centerX + cakeWidth / 2, baseY - cakeHeight - layerHeight - 10);
    ctx.lineTo(centerX + cakeWidth / 2, baseY);
    ctx.lineTo(centerX, baseY);
    ctx.closePath();
    ctx.clip();

    ctx.translate(sliceAnim, 0);
    // Redraw cake part
    ctx.globalAlpha = 0.96;
    ctx.fillStyle = "#fff0f6";
    ctx.strokeStyle = "#e75480";
    ctx.lineWidth = 3;
    ctx.beginPath();
    roundRect(ctx, centerX - cakeWidth / 2, baseY - cakeHeight, cakeWidth, cakeHeight, 22);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#ffe0ec";
    ctx.beginPath();
    roundRect(ctx, centerX - cakeWidth / 2 + 18, baseY - cakeHeight - layerHeight, cakeWidth - 36, layerHeight, 16);
    ctx.fill();
    ctx.stroke();

    ctx.restore();
    sliceAnim += 3;
  }
  ctx.restore();
}

// Helper for roundRect (for older browsers)
function roundRect(ctx, x, y, w, h, r) {
  if (ctx.roundRect) {
    ctx.roundRect(x, y, w, h, r);
  } else {
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
  }
}

// Cute message with new font and color
function drawMessage() {
  // Use only for canvas message, not for HTML paragraphs
  const msg = "Happy 18th Birthday, My Cutie Pie! 🎂💖";
  ctx.save();
  ctx.font = "bold 2.2em Pacifico, cursive";
  ctx.fillStyle = "#e75480";
  ctx.textAlign = "center";
  ctx.shadowColor = "#fff0f6";
  ctx.shadowBlur = 16;
  ctx.fillText(msg, canvas.width / 2, canvas.height * 0.32);

  ctx.font = "1.15em Outfit, sans-serif";
  ctx.fillStyle = "#d72660";
  ctx.shadowBlur = 0;
  ctx.fillText(
    "You are the sweetest part of my life. May all your wishes come true!",
    canvas.width / 2,
    canvas.height * 0.38
  );
  ctx.restore();
}

function init() {
  hearts = [];
  for (let i = 0; i < 55; i++) {
    hearts.push(new Heart());
  }
}

function animate(time = 0) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw hearts
  hearts.forEach((heart) => {
    heart.update();
    heart.draw();
  });

  // Draw cake and message
  drawCake(time);
  drawMessage();

  requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

// Candle blow out on click/touch
canvas.addEventListener("click", function (e) {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = canvas.width / 2;
  const baseY = canvas.height * 0.7;
  const cakeHeight = 80;
  const layerHeight = 30;

  // Check if clicked on any candle
  candles.forEach((candle) => {
    let cx = centerX + candle.xOffset;
    let cy = baseY - cakeHeight - 28;
    if (
      !candle.blown &&
      Math.abs(x - cx) < 18 &&
      Math.abs(y - cy) < 30
    ) {
      candle.blown = true;
    }
  });

  // If both candles are blown, allow cake cutting
  if (candles.every(c => c.blown) && !cakeCut && !sliceMoving) {
    // Check if click is on cake top
    if (
      x > centerX - 85 && x < centerX + 85 &&
      y > baseY - cakeHeight - layerHeight - 10 && y < baseY
    ) {
      cakeCut = true;
      cutAnim = 0;
    }
  }
});

// Touch support for mobile
canvas.addEventListener("touchstart", function (e) {
  const rect = canvas.getBoundingClientRect();
  const touch = e.touches[0];
  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;
  const centerX = canvas.width / 2;
  const baseY = canvas.height * 0.7;
  const cakeHeight = 80;
  const layerHeight = 30;

  candles.forEach((candle) => {
    let cx = centerX + candle.xOffset;
    let cy = baseY - cakeHeight - 28;
    if (
      !candle.blown &&
      Math.abs(x - cx) < 18 &&
      Math.abs(y - cy) < 30
    ) {
      candle.blown = true;
    }
  });

  if (candles.every(c => c.blown) && !cakeCut && !sliceMoving) {
    if (
      x > centerX - 85 && x < centerX + 85 &&
      y > baseY - cakeHeight - layerHeight - 10 && y < baseY
    ) {
      cakeCut = true;
      cutAnim = 0;
    }
  }
});

init();
animate();