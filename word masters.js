const boxes = document.querySelectorAll(".box");
const Rounds = 6;
const ANSWER_LENGTH = 5;

async function start() {
  let currentGuess = "";
  let row = 0;

  const res = await fetch("https://words.dev-apis.com/word-of-the-day");

  const { word: wordRes } = await res.json();
  const word = wordRes.toUpperCase();
  const wordParts = word.split("");

  function addLetter(letter) {
    if (currentGuess.length < ANSWER_LENGTH) {
      currentGuess += letter;
    } else {
      currentGuess =
        currentGuess.substring(0, currentGuess.length - 1) + letter;
    }

    boxes[row * ANSWER_LENGTH + currentGuess.length - 1].innerText = letter;
  }

  function backspace() {
    currentGuess = currentGuess.substring(0, currentGuess.length - 1);
    boxes[row * ANSWER_LENGTH + currentGuess.length].innerText = "";
  }

  async function commit() {
    if (currentGuess.length !== ANSWER_LENGTH) {
      return;
    }

    const res = await fetch("https://words.dev-apis.com/validate-word", {
      method: "POST",
      body: JSON.stringify({ word: currentGuess }),
    });
    const { validWord } = await res.json();
    if (!validWord) {
      markInvalidWord();
      return;
    }

    let guessParts = currentGuess.split("");
    let map = makeMap(wordParts);
    let allRight = true;

    for (let i = 0; i < ANSWER_LENGTH; i++) {
      if (guessParts[i] === wordParts[i]) {
        boxes[row * ANSWER_LENGTH + i].classList.add("correct");
        map[guessParts[i]]--;
      }
    }

    for (let i = 0; i < ANSWER_LENGTH; i++) {
      if (guessParts[i] === wordParts[i]) {
      } else if (map[guessParts[i]] > 0) {
        boxes[row * ANSWER_LENGTH + i].classList.add("close");

        map[guessParts[i]]--;
        allRight = false;
      } else {
        allRight = false;
        boxes[row * ANSWER_LENGTH + i].classList.add("incorrect");
      }
    }
    row++;
    currentGuess = "";
    if (allRight) alert("you win");
    else if (row === Rounds) {
      alert("you lose");
    }

    function markInvalidWord() {
      for (let i = 0; i < ANSWER_LENGTH; i++) {
        boxes[row * ANSWER_LENGTH + i].classList.remove("invalid");

        setTimeout(
          () => boxes[row * ANSWER_LENGTH + i].classList.add("invalid"),
          10
        );
      }
    }

    function makeMap(array) {
      let map = {};
      for (let i = 0; i < array.length; i++) {
        if (map[array[i]]) map[array[i]]++;
        else map[array[i]] = 1;
      }
      return map;
    }
  }
  document.addEventListener("keydown", (event) => {
    let action = event.key;

    if (action === "Enter") {
      commit();
    } else if (isLetter(action)) {
      addLetter(action.toUpperCase());
    } else if (action === "Backspace") {
      backspace();
    }
  });
  function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
  }
}

start();
