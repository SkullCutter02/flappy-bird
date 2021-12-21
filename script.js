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

  const blockLeft = parseInt(
    window.getComputedStyle(block).getPropertyValue("left")
  );
  const holeTop = parseInt(
    window.getComputedStyle(hole).getPropertyValue("top")
  );
  const inverseCharacterTop = -(500 - characterTop);

  if (
    characterTop > 480 || // if character falls to the bottom
    (blockLeft < 20 && // if block is at the left of the screen (meaning it touches the ball)
      blockLeft > -50 &&
      (inverseCharacterTop < holeTop || // if character doesn't touch hole
        inverseCharacterTop > holeTop + 150 - 20)) // if character doesn't touch hole, 130 because though hole is 150px, character is 20px tall
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
