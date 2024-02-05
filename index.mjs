import readline from "readline";

// function for asking the user questions
const rl = readline.createInterface(process.stdin, process.stdout);
function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

// Returns random number between inclusive min and exclusive max
// function getRandomNumber(min, max) {
//   // Converts args to integers
//   const minCeiled = Math.ceil(min);
//   const maxFloored = Math.floor(max);
//   // Returns integer between the min and max numbers
//   return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
// }

async function guessNumber() {
  const minNum = await ask("What is the lowest possible number? ");
  const maxNum = await ask("What is the highest possible number? ");
  console.log(`Think of a number between ${Math.floor(minNum)} and ${Math.floor(maxNum)} (inclusive) and I will try to guess it.`);
  // Wait 3 seconds then start game
  setTimeout(() => binarySearch(Math.floor(minNum), Math.floor(maxNum)), 3000);

  async function binarySearch(min, max) {
    let minGuess = min;
    let maxGuess = max;
    let i = 1;
    // While the value is not found
    while(minGuess <= maxGuess) {
      // Finds middle number
      let guess = Math.floor((minGuess + maxGuess) / 2);
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
        if(minGuess === maxGuess) {
          console.log("You cheat! I don't want to play with you anymore!");
          break;
        }
        const answerDir = await ask("Is your number higher (H), or lower (L)? ");
        // If computer guess is lower than player number
        if(answerDir.toLowerCase() === "h") {
          minGuess = guess + 1;
        }
        else if(answerDir.toLowerCase() === "l") {
          maxGuess = guess - 1;
        }
        i++;
      }
    }
    const playAgain = await ask("Play again? (Y/N) ");
    if(playAgain.toLowerCase() === "y")
    {
      guessNumber();
    }
    else if(playAgain.toLowerCase() === "n") {
      // Close out readline
      rl.close();
      process.emit();
    }
  }
}
guessNumber();