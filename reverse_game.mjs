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

async function reverseGuessNumber() {
    const minNum = await ask("What is the lowest possible number? ");
    const maxNum = await ask("What is the highest possible number? ");
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
            const playerGuess = await ask("Guess what number I am thinking of. ");
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
        const playAgain = await ask("Play again? (Y/N) ");
        if(playAgain.toLowerCase() === "y") {
            reverseGuessNumber();
        }
        else if(playAgain.toLowerCase() === "n") {
            // Close out readline
            rl.close();
            process.emit();
        }
    }
}
reverseGuessNumber();