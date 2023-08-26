// 1. deposit money
// 2. Determine bet in number of line
// 3. collect bet amount
// 4. Spin the slot machine
// 5. check win or lose
// 6. give amount if won
// 7. play again or quit

// function deposit() {
//     return 1;
// }

const prompt = require("prompt-sync")(); //to take user input

const ROWS = 3; //global variables are in captial, best pratice
const COLS = 3;

const SYMBOLS_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

const SYMBOL_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

const deposit = () => {
  //same but new style
  while (true) {
    const depositAmount = prompt("Enter a deposit amount: "); //user input is taken as string
    const numberDepositAmount = parseFloat(depositAmount); //convert string to number

    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
      console.log("Invalid deposit amount, Try agian.");
    } else {
      return numberDepositAmount;
    }
  }
};

const getNumberOfLines = () => {
  while (true) {
    const lines = prompt("Enter the number of line to bet on (1-3): "); //user input is taken as string
    const numberOfLines = parseFloat(lines); //convert string to number

    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
      console.log("Invalid number of lines, Try agian.");
    } else {
      return numberOfLines;
    }
  }
};

const getBet = (balance, lines) => {
  while (true) {
    const bet = prompt("Enter the bet per line: "); //user input is taken as string
    const numberBet = parseFloat(bet); //convert string to number

    if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
      console.log("Invalid bet amount, Try agian.");
    } else {
      return numberBet;
    }
  }
};

const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    //looping object
    for (let i = 0; i < count; i++) {
      symbols.push(symbol); //add symbol in symbols array, Two 'A' will added
    }
  }

  const reels = [];
  for (let i = 0; i < COLS; i++) {
    reels.push([]); //push empty array for every col. itration
    const reelSymbols = [...symbols]; //copy symbol array to reelSymbol by ...
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbols.length); //generate random index
      const selectedSymbol = reelSymbols[randomIndex]; //select symbol by random index generated
      reels[i].push(selectedSymbol);
      reelSymbols.splice(randomIndex, 1); //1 is remove one element
    }
  }
  return reels;
};

const transpose = (reels) => {
  const rows = [];

  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
};

const printRows = (rows) => {
  for (const row of rows) {
    //going every single row in rows
    let rowString = "";
    for (const [i, symbol] of row.entries()) {
      //giving index and symbol of row
      rowString += symbol;
      if (i != row.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
};

const getWinnings = (rows, bet, lines) => {
  let winnings = 0;

  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;

    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        allSame = false;
        break;
      }
    }

    if (allSame) {
      winnings += bet * SYMBOL_VALUES[symbols[0]];
    }
  }
  return winnings;
};

const game = () => {
  let balance = deposit();

  while (true) {
    console.log("Your current balance is: $" + balance);
    const numberOfLines = getNumberOfLines();
    const bet = getBet(balance, numberOfLines);
    balance -= bet * numberOfLines;
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winnings = getWinnings(rows, bet, numberOfLines);
    balance += winnings;
    console.log("You won, $" + winnings.toString());

    if(balance <= 0) {
      console.log("You ran out of money!");
      break;
    }

    const playAgain = prompt("Do you want to play again (y/n)? ");

    if (playAgain != "y") break;
  }
};

game();
