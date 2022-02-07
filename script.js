const block = document.getElementById("block");
const hole = document.getElementById("hole");
const character = document.getElementById("character");

let isJumping = false;
let counter = 0;

setTimeout(() => {
  block.style.animationPlayState = "running";
  hole.style.animationPlayState = "running";
}, 2000);

hole.addEventListener("animationiteration", () => {
  const random = -(Math.random() * 300 + 150); // return random number between -150 and -450
  hole.style.top = `${random}px`;
  counter++;
});

const game = setInterval(() => {
  const characterTop = getCharacterTop();

  if (!isJumping) {
    character.style.top = `${characterTop + 4}px`;
    character.style.transform = "rotatez(45deg)";
  }

  if (
    characterTop > 480 || // 480 as character height is 20px and game window height is 500px
    (isCollide(block, character) && !isCollide(hole, character))
  ) {
    // alert("Game over. Score = " + counter);

    setTimeout(() => {
      const fall = setInterval(() => {
        const characterTop = getCharacterTop();
        if (characterTop >= 480) clearInterval(fall);
        character.style.top = `${characterTop + 4}px`;
      }, 10);
    }, 600);

    block.style.animationPlayState = "paused";
    hole.style.animationPlayState = "paused";
    counter = 0;
    clearInterval(game);
  }
}, 10);

document.onclick = () => {
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
};

const getCharacterTop = () =>
  parseInt(window.getComputedStyle(character).getPropertyValue("top"));

const resetGame = () => {
  block.style.animation = "initial";
  hole.style.animation = "initial";
  block.style.animation = "block 1s infinite linear";
  hole.style.animation = "block 1s infinite linear";
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
