// Heart animation
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let hearts = [];

function Heart() {
  this.x = Math.random() * canvas.width;
  this.y = Math.random() * canvas.height;
  this.size = Math.random() * 4 + 2;
  this.speedY = Math.random() * 1 + 0.5;
  this.opacity = Math.random() * 0.5 + 0.3;
  this.draw = function () {
    ctx.fillStyle = `rgba(255, 105, 180, ${this.opacity})`;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.bezierCurveTo(
      this.x + this.size,
      this.y - this.size,
      this.x + this.size * 2,
      this.y + this.size,
      this.x,
      this.y + this.size * 2
    );
    ctx.bezierCurveTo(
      this.x - this.size * 2,
      this.y + this.size,
      this.x - this.size,
      this.y - this.size,
      this.x,
      this.y
    );
    ctx.fill();
  };
  this.update = function () {
    this.y -= this.speedY;
    if (this.y < -10) {
      this.y = canvas.height + 10;
    }
  };
}

function initHearts() {
  for (let i = 0; i < 100; i++) {
    hearts.push(new Heart());
  }
}
function animateHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach((heart) => {
    heart.update();
    heart.draw();
  });
  requestAnimationFrame(animateHearts);
}

initHearts();
animateHearts();

// Flip Sound
const flipSound = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_1e983399c0.mp3?filename=ui-confirmation-alert-1-25973.mp3");

// Memory emoji game logic
const emojis = ['🥰','💖','😘','😍','🌹','🎂','💍','🌟','🎁','💕','💘','👩‍❤‍👨'];
const gameBoard = document.getElementById("gameBoard");
let cardArray = emojis.concat(emojis); // 12 pairs = 24 cards
let flipped = [];
let matchedCount = 0;

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

function createBoard() {
  const shuffled = shuffle(cardArray);
  shuffled.forEach((emoji) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.textContent = "";
    card.dataset.emoji = emoji;
    card.style.transition = "transform 0.4s ease, background-color 0.3s ease";
    card.addEventListener("click", handleFlip);
    gameBoard.appendChild(card);
  });
}

function handleFlip(e) {
  const card = e.target;
  if (card.classList.contains("matched") || flipped.includes(card)) return;

  card.style.transform = "rotateY(180deg)";
  card.textContent = card.dataset.emoji;
  flipSound.currentTime = 0;
  flipSound.play();

  flipped.push(card);

  if (flipped.length === 2) {
    if (flipped[0].dataset.emoji === flipped[1].dataset.emoji) {
      flipped.forEach((c) => c.classList.add("matched"));
      matchedCount += 2;
      if (matchedCount === cardArray.length) {
        document.querySelector(".subtitle").textContent = "You matched them all, jaaneman! 💘";
      }
      flipped = [];
    } else {
      setTimeout(() => {
        flipped.forEach((c) => {
          c.textContent = "";
          c.style.transform = "rotateY(0deg)";
        });
        flipped = [];
      }, 800);
    }
  }
}

createBoard();

// Password Logic
function checkPassword() {
  const input = document.getElementById("passwordInput").value.trim().toLowerCase();
  const error = document.getElementById("errorMessage");
  const link = document.getElementById("nextPageLink");
  const subtitle = document.querySelector(".subtitle");
  // Add or select the love message element
  let loveMsg = document.getElementById("loveMsg");
  if (!loveMsg) {
    loveMsg = document.createElement("div");
    loveMsg.id = "loveMsg";
    loveMsg.style.marginTop = "18px";
    loveMsg.style.fontFamily = "'Pacifico', 'Dancing Script', cursive";
    loveMsg.style.fontSize = "1.4em";
    loveMsg.style.color = "#e75480";
    loveMsg.style.textShadow = "0 2px 12px #fff0f6";
    loveMsg.style.letterSpacing = "1px";
    document.getElementById("passwordInput").parentNode.appendChild(loveMsg);
  }

  if (input === "infinite babu") {
    error.textContent = "";
    link.style.display = "inline-block";
    if (subtitle) {
      subtitle.textContent = "I Love💍✨ You Sooo Muchhhh Bubu💖💞🌏";
    }
    loveMsg.innerHTML = "I Love💍✨ You Sooo Muchhhh Bubu💖💞🌏";
    loveMsg.style.display = "block";
  } else {
    error.textContent = "Galat jawaab sweetheart 😭 Try again 💖";
    link.style.display = "none";
    if (subtitle) {
      subtitle.textContent = "Memory Emoji Game";
    }
    if (loveMsg) loveMsg.style.display = "none";
  }
}