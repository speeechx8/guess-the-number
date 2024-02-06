import readline from "readline";

// function for asking the user questions
const rl = readline.createInterface(process.stdin, process.stdout);
function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

// Checks if player entered a number
function checkIfValid_Number(input) {
  const regex = /^[0-9]/;
  // If input doesn't match regex
  if(!input.match(regex)) {
    console.log("Invalid response, must input numbers. Please try again.");
    return false;
  }
  else {
    return true;
  }
}

// Checks if player entered H or L
function checkIfValid_HighLow(input) {
  const regex = /^[h,l,H,L]/;
  // If input doesn't match regex
  if(!input.match(regex)) {
    console.log("Invalid response, must input H or L. Please try again.");
    return false;
  }
  else {
    return true;
  }
}

// Checks if player entered Y or N
function checkIfValid_YesNo(input) {
  const regex = /^[n,y,N,Y]/;
  // If input doesn't match regex
  if(!input.match(regex)) {
    console.log("Invalid response, must input Y or N. Please try again.");
    return false;
  }
  else {
    return true;
  }
}

// Checks if player entered P or G
function checkIfValid_PickGuess(input) {
  const regex = /^[g,p,G,P]/;
  // If input doesn't match regex
  if(!input.match(regex)) {
    console.log("Invalid response, must input P or G. Please try again.");
    return false;
  }
  else {
    return true;
  }
}

// Returns random number between inclusive min and exclusive max
function getRandomNumber(min, max) {
  // Converts args to integers
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

async function playAgain() {
  let response;
  // Check for valid input
  while(true) {
    const input = await ask("Play again? (Y/N) ");
    // Once input is valid assign variable and break out of loop
    if(checkIfValid_YesNo(input)) {
      response = input;
      break;
    }
  }
  if(response.toLowerCase() === "y") {
    chooseGame();
  }
  else if(response.toLowerCase() === "n") {
    // Close out readline
    rl.close();
    process.emit();
  }
}

async function guessNumber() {
  console.log("The Original Number Guessing Game!\n");
  let minNum;
  let maxNum;
  // Check for valid input
  while(true) {
    const input = await ask("What is the lowest possible number? ");
    // Once input is valid assign variable and break out of loop
    if(checkIfValid_Number(input)) {
      minNum = input;
      break;
    }
  }
  // Check for valid input
  while(true) {
    const input = await ask("What is the highest possible number? ");
    // Once input is valid assign variable and break out of loop
    if(checkIfValid_Number(input)) {
      maxNum = input;
      break;
    }
  }
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
      let answerGuess;
      // Check for valid input
      while(true) {
        const input = await ask(`Is your number... ${guess}? (Y/N) `);
        // Once input is valid assign variable and break out of loop
        if(checkIfValid_YesNo(input)) {
          answerGuess = input;
          break;
        }
      }
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
        let answerDir;
        // Check for valid input
        while(true) {
          const input = await ask("Is your number higher (H), or lower (L)? ");
          // Once input is valid assign variable and break out of loop
          if(checkIfValid_HighLow(input)) {
            answerDir = input;
            break;
          }
        }
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
    // Play again?
    playAgain();
  }
}

async function reverseGuessNumber() {
  console.log("The Reversed Number Guessing Game!\n");
  let minNum;
  let maxNum;
  // Check for valid input
  while(true) {
    const input = await ask("What is the lowest possible number? ");
    // Once input is valid assign variable and break out of loop
    if(checkIfValid_Number(input)) {
      minNum = input;
      break;
    }
  }
  // Check for valid input
  while(true) {
    const input = await ask("What is the highest possible number? ");
    // Once input is valid assign variable and break out of loop
    if(checkIfValid_Number(input)) {
      maxNum = input;
      break;
    }
  }
  console.log(`I will think of a number between ${Math.floor(minNum)} and ${Math.floor(maxNum)} (inclusive) and you will try to guess it.`);
  const num = getRandomNumber(parseInt(minNum), (parseInt(maxNum)) + 1);
  console.log(num);
  // Wait 3 seconds then start game
  setTimeout(() => playerGuessing(Math.floor(minNum), Math.floor(maxNum)), 3000);

  async function playerGuessing(min, max) {
      let i = 1;
      let numFound = false;
      // While player is still guessing
      while(numFound === false) {
        let playerGuess;
        // Check for valid input
        while(true) {
          const input = await ask("Guess what number I am thinking of. ");
          // Once input is valid assign variable and break out of loop
          if(checkIfValid_Number(input)) {
            playerGuess = input;
            break;
          }
        }
        // If player is correct
        if(parseInt(playerGuess) === num) {
            // Wording if guess only took one time
            if(i === 1) {
                numFound = true;
                console.log(`Correct! The number is ${playerGuess}\nIt only took you ${i} try to guess my number!`);
            }
            // Wording if guess took more than one time
            else {
                numFound = true;
                console.log(`Correct! The number is ${playerGuess}\nIt took you ${i} tries to guess my number!`);
            }
        }
        // If player is incorrect
        else {
            // Player guess was too low
            if(playerGuess < num) {
                console.log(`${playerGuess} is too low!`);
            }
            // player guess was too high
            else if(playerGuess > num) {
                console.log(`${playerGuess} is too high!`);
            }
            i++;
        }
      }
      // Play again?
      playAgain();
  }
}

async function chooseGame() {
  let choice;
  // Check for valid input
  while(true) {
    const input = await ask("Do you want to pick a number (P) or guess a number (G)? ");
    // Once input is valid assign variable and break out of loop
    if(checkIfValid_PickGuess(input)) {
      choice = input;
      break;
    }
  }
  // Player chooses original game
  if(choice.toLowerCase() === "p") {
    guessNumber();
  }
  // Player chooses reversed game
  else if(choice.toLowerCase() === "g") {
    reverseGuessNumber();
  }
}

chooseGame();