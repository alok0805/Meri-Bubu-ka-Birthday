const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

function createHeart() {
  return {
    x: Math.random() * canvas.width,
    y: canvas.height + Math.random() * 100,
    size: Math.random() * 8 + 8,
    speed: Math.random() * 1 + 0.5,
    alpha: Math.random() * 0.5 + 0.3
  };
}

function drawHeart(heart) {
  ctx.save();
  ctx.translate(heart.x, heart.y);
  ctx.scale(heart.size / 15, heart.size / 15);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(0, -3, -5, -15, -15, -15);
  ctx.bezierCurveTo(-35, -15, -35, 15, 0, 35);
  ctx.bezierCurveTo(35, 15, 35, -15, 15, -15);
  ctx.bezierCurveTo(5, -15, 0, -3, 0, 0);
  ctx.fillStyle = `rgba(255, 105, 180, ${heart.alpha})`;
  ctx.fill();
  ctx.restore();
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach((heart, i) => {
    heart.y -= heart.speed;
    if (heart.y < -40) hearts[i] = createHeart();
    drawHeart(heart);
  });
  requestAnimationFrame(update);
}

for (let i = 0; i < 40; i++) {
  hearts.push(createHeart());
}

update();
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function updateLifeTimer() {
  // Birth: 23 June 2007, 21:54:00 (9:54 PM IST)
  const birthDate = new Date('2007-06-23T21:54:00+05:30');
  // Target: 23 June 2025, 00:00:00 (midnight IST)
  const targetDate = new Date('2025-06-23T00:00:00+05:30');

  const now = new Date();
  let end = now > targetDate ? targetDate : now;

  let diff = end - birthDate;

  let seconds = Math.floor(diff / 1000);
  let days = Math.floor(seconds / (3600 * 24));
  seconds -= days * 3600 * 24;
  let hours = Math.floor(seconds / 3600);
  seconds -= hours * 3600;
  let minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;

  let timerText = `
    <div style="background:rgba(255,255,255,0.90); border-radius:18px; box-shadow:0 2px 16px #e75480a0; padding:18px 12px; margin:18px 0 28px 0; text-align:center; border:2px dashed #e75480;">
      <span style="font-size:1.3em; color:#e75480; font-family:'Pacifico',cursive;">&#10084; My Love,</span><br>
      <span style="font-size:1.1em; color:#d72660;">
        You have been lighting up this world for<br>
        <b>${days}</b> days, <b>${hours}</b> hours, <b>${minutes}</b> minutes, <b>${seconds}</b> seconds<br>
        <span style="display:inline-block; margin-top:8px; color:#e75480;">And today, on your birthday, you have an exam too...<br>
        I know it's tough, but I am so proud of you!<br>
        Even on this special day, you are working hard for your dreams.<br>
        I promise, after this, we will celebrate your birthday with double happiness!<br>
        Always with you, in every moment. 💖</span>
      </span>
    </div>
  `;

  if (now > targetDate) {
    timerText = `
      <div style="background:rgba(255,255,255,0.95); border-radius:18px; box-shadow:0 2px 16px #e75480a0; padding:18px 12px; margin:18px 0 28px 0; text-align:center; border:2px dashed #e75480;">
        <span style="font-size:1.3em; color:#e75480; font-family:'Pacifico',cursive;">&#127874; 18 years completed, my love!</span><br>
        <span style="font-size:1.1em; color:#d72660;">
          You have decorated this world for<br>
          <b>${days}</b> days, <b>${hours}</b> hours, <b>${minutes}</b> minutes, <b>${seconds}</b> seconds<br>
          <span style="display:inline-block; margin-top:8px; color:#e75480;">You made it through your birthday and your exam!<br>
          I am so proud of you, my strong girl.<br>
          Now, every moment is yours—let's make memories together! 💞</span>
        </span>
      </div>
    `;
  }

  const timerDiv = document.getElementById('lifeTimer');
  if (timerDiv) timerDiv.innerHTML = timerText;
}

setInterval(updateLifeTimer, 1000);
updateLifeTimer();