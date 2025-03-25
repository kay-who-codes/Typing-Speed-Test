const game1Button = document.getElementById("game1");
const game2Button = document.getElementById("game2");
const container = document.querySelector(".container");

let startTime, endTime;

// Game 1: Predetermined Paragraphs
game1Button.addEventListener("click", () => {
  container.innerHTML = `
    <div class="game-container">
      <p id="paragraph">${paragraphs[Math.floor(Math.random() * paragraphs.length)]}</p>
      <textarea id="input-box" placeholder="Start typing here..."></textarea>
      <div id="results"></div>
    </div>
  `;

  const inputBox = document.getElementById("input-box");
  const paragraph = document.getElementById("paragraph").textContent;
  const results = document.getElementById("results");

  inputBox.focus();
  startTime = new Date();

  inputBox.addEventListener("input", () => {
    if (inputBox.value === paragraph) {
      endTime = new Date();
      const timeTaken = (endTime - startTime) / 1000; // in seconds
      const words = paragraph.split(" ").length;
      const wpm = Math.round((words / timeTaken) * 60);
      results.innerHTML = `You took ${timeTaken.toFixed(2)} seconds. Your typing speed is ${wpm} WPM.`;
    }
  });
});

// Game 2: Random Characters
game2Button.addEventListener("click", () => {
  container.innerHTML = `
    <div class="game-container">
      <p id="random-char"></p>
      <input type="text" id="input-box" maxlength="1">
      <div id="results"></div>
    </div>
  `;

  const randomCharElement = document.getElementById("random-char");
  const inputBox = document.getElementById("input-box");
  const results = document.getElementById("results");

  let charCount = 0;
  let totalTime = 0;

  const displayRandomChar = () => {
    if (charCount >= 30) {
      results.innerHTML = `You took ${totalTime.toFixed(2)} seconds to type 30 characters.`;
      return;
    }

    const randomChar = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    randomCharElement.textContent = randomChar;
    inputBox.value = "";
    inputBox.focus();
    startTime = new Date();
  };

  inputBox.addEventListener("input", () => {
    if (inputBox.value === randomCharElement.textContent) {
      endTime = new Date();
      totalTime += (endTime - startTime) / 1000;
      charCount++;
      displayRandomChar();
    }
  });

  displayRandomChar();
});