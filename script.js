const block = document.getElementById("block");
const hole = document.getElementById("hole");
const character = document.getElementById("character");

let isJumping = false;
let counter = 0;

hole.addEventListener("animationiteration", () => {
  const random = -(Math.random() * 300 + 150); // return random number between -150 and -450
  hole.style.top = `${random}px`;
  counter++;
});

setInterval(() => {
  const characterTop = parseInt(
    window.getComputedStyle(character).getPropertyValue("top")
  );

  if (!isJumping) {
    character.style.top = `${characterTop + 3}px`;
  }

  if (
    characterTop > 480 || // 480 as character height is 20px and game window height is 500px
    (isCollide(block, character) && !isCollide(hole, character))
  ) {
    alert("Game over. Score = " + counter);
    character.style.top = "100px";
    counter = 0;
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
      character.style.top = `${characterTop - 5}px`;
    }

    if (jumpCount > 20) {
      clearInterval(jumpInterval);
      isJumping = false;
      jumpCount = 0;
    }

    jumpCount++;
  }, 10);
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
