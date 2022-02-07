const game = document.getElementById("game");
const block = document.getElementById("block");
const hole = document.getElementById("hole");
const character = document.getElementById("character");
const resetBtn = document.getElementById("reset-btn");
const score = document.getElementById("score");

let isJumping = false;
let isDead = false;
let counter = 0;

resetBtn.addEventListener("click", () => {
  resetGame();
});

const rerunPipes = () => {
  setTimeout(() => {
    block.style.animation = null;
    hole.style.animation = null;
    block.style.animationPlayState = "running";
    hole.style.animationPlayState = "running";
  }, 2000);
};

const updateScore = () => {
  score.innerText = counter;
};

rerunPipes();

hole.addEventListener("animationiteration", () => {
  const random = -(Math.random() * 300 + 150); // return random number between -150 and -450
  hole.style.top = `${random}px`;
  counter++;
  updateScore();
});

setInterval(() => {
  if (isDead) return;

  const characterTop = getCharacterTop();

  if (!isJumping) {
    character.style.top = `${characterTop + 4}px`;
    character.style.transform = "rotatez(45deg)";
  }

  if (
    characterTop > 480 || // 480 as character height is 20px and game window height is 500px
    (isCollide(block, character) && !isCollide(hole, character))
  ) {
    isDead = true;

    setTimeout(() => {
      const fall = setInterval(() => {
        const characterTop = getCharacterTop();

        // if reset button is pressed, isDead is set to false, and we don't want this to trigger when the game is reset
        if (characterTop >= 480 || !isDead) clearInterval(fall);

        character.style.top = `${characterTop + 4}px`;
      }, 10);
    }, 600);

    block.style.animationPlayState = "paused";
    hole.style.animationPlayState = "paused";
  }
}, 10);

game.addEventListener("click", () => {
  if (isDead) return;

  isJumping = true;

  let jumpCount = 0;

  const jumpInterval = setInterval(() => {
    const characterTop = parseInt(
      window.getComputedStyle(character).getPropertyValue("top")
    );

    if (characterTop > 6 && jumpCount < 15) {
      character.style.top = `${characterTop - 6}px`;
      character.style.transform = "rotatez(-45deg)";
    }

    if (jumpCount > 20) {
      clearInterval(jumpInterval);
      isJumping = false;
      jumpCount = 0;
    }

    jumpCount++;
  }, 10);
});

const getCharacterTop = () =>
  parseInt(window.getComputedStyle(character).getPropertyValue("top"));

const resetGame = () => {
  counter = 0;
  updateScore();
  isDead = false;
  block.style.animation = "none";
  hole.style.animation = "none";
  character.style.top = "100px";
  rerunPipes();
};

function isCollide(a, b) {
  const aRect = a.getBoundingClientRect();
  const bRect = b.getBoundingClientRect();

  return !(
    aRect.top + aRect.height < bRect.top ||
    aRect.top > bRect.top + bRect.height ||
    aRect.left + aRect.width < bRect.left ||
    aRect.left > bRect.left + bRect.width
  );
}
