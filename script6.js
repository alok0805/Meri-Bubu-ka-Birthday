// Animated Floating Hearts
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function drawHeart(ctx, x, y, size, color, alpha, rotate = 0) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(x, y);
  ctx.rotate(rotate);
  ctx.beginPath();
  // Heart shape using Bezier curves
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(0, -size / 2, -size, -size / 2, -size, 0);
  ctx.bezierCurveTo(-size, size / 1.5, 0, size, 0, size * 1.5);
  ctx.bezierCurveTo(0, size, size, size / 1.5, size, 0);
  ctx.bezierCurveTo(size, -size / 2, 0, -size / 2, 0, 0);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

// Array of pretty heart colors
const heartColors = [
  "#ffb6d5", "#e75480", "#ff94cc", "#ffd6fa", "#fff0f6", "#f7cac9", "#f6e2b3", "#ff5ca2"
];

const hearts = [];
for (let i = 0; i < 40; i++) {
  hearts.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 18 + 12,
    speed: Math.random() * 0.7 + 0.3,
    alpha: Math.random() * 0.6 + 0.4,
    color: heartColors[Math.floor(Math.random() * heartColors.length)],
    rotate: Math.random() * Math.PI * 2
  });
}

function drawHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach(heart => {
    drawHeart(ctx, heart.x, heart.y, heart.size, heart.color, heart.alpha, heart.rotate);
    heart.y -= heart.speed;
    heart.rotate += 0.005;
    if (heart.y < -30) {
      heart.y = canvas.height + 30;
      heart.x = Math.random() * canvas.width;
      heart.size = Math.random() * 18 + 12;
      heart.alpha = Math.random() * 0.6 + 0.4;
      heart.color = heartColors[Math.floor(Math.random() * heartColors.length)];
      heart.rotate = Math.random() * Math.PI * 2;
    }
  });
  requestAnimationFrame(drawHearts);
}
drawHearts();

// Message Animation Sequence
const messages = [
  "I can love you for 4 days ❤",
  "Spring 🌸", "Summer ☀", "Autumn 🍂", "Winter ❄",
  "Oh no... maybe 3 days... 😧",
  "Yesterday ⏳", "Today 📅", "Tomorrow 🕰",
  "How about 2 days??? 💭",
  "Day 🌞", "Night 🌙",
  "Maybe one day is enough 🥺",
  "Everyday 💖",
  "I remember one day you asked me how much I love you 🥹",
  "My answer is...",
  "I love three things in this world 🌍",
  "The day ☀", "The night🌕", "And You ❤" ,
  "The day with you 🌞", "The night when you are in my arms🌙", "And You forever 💘" , "I Really Love💍✨ You Sooo Muchhhh Bubu💖💞🌏"
];

const container = document.getElementById('messageContainer');

let i = 0;
function showMessage() {
  if (i >= messages.length) return;
  const msg = document.createElement('div');
  msg.classList.add('message');
  msg.textContent = messages[i];
  container.appendChild(msg);
  setTimeout(() => msg.classList.add('show'), 100);
  i++;
  setTimeout(showMessage, 1800);
}

window.onload = showMessage;