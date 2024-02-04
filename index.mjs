import readline from "readline";

// function for asking the user questions
const rl = readline.createInterface(process.stdin, process.stdout);
function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

// Returns random number between inclusive min and exclusive max
function getRandomNumber(min, max) {
  // Converts args to integers
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

async function guessNumber() {
    let guess = getRandomNumber(1, 101);
    const answer = await ask(`Is your number... ${guess}? (Y/N) `);
}

guessNumber();