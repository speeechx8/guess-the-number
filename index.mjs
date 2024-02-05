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
  // Returns integer between the min and max numbers
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

async function guessNumber() {
  let min = 0;
  let max = 100;
  let i = 1;
  // While the value is not found
  while(min <= max) {
    // Finds middle number
    let guess = Math.floor((min + max) / 2);
    const answerGuess = await ask(`Is your number... ${guess}? (Y/N) `);
    if(answerGuess.toLowerCase() === "y") {
      // Wording if guess only took one time
      if(i === 1) {
        console.log(`Your number was ${guess}!\nIt took me only ${i} try to guess your number!`);
        break;
      }
      // Wording if guess took more than one time
      else {
        console.log(`Your number was ${guess}!\nIt took me ${i} tries to guess your number!`);
        break;
      }
    }
    else if(answerGuess.toLowerCase() === "n") {
      const answerDir = await ask("Is your number higher (H), or lower (L)? ");
      // If computer guess is lower than player number
      if(answerDir.toLowerCase() === "h") {
        min = guess + 1;
      }
      else if(answerDir.toLowerCase() === "l") {
        max = guess - 1;
      }
      i++;
    }
  }
  // Close out readline
  rl.close();
  process.emit();
}
console.log("Think of a number between 1 and 100 (inclusive) and I will try to guess it.");
// Wait 5 seconds then start game
// setTimeout(() => binarySearch(), 5000);
guessNumber();