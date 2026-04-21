const ROWS = 6;
const COLS = 7;
let board = [];
let currentPlayer = "red";

const boardElement = document.getElementById("board");
const turnDisplay = document.getElementById("turn");

// Update the circle indicator
function updateTurnIndicator() {
  turnDisplay.style.backgroundColor = currentPlayer;

  if(currentPlayer === "red"){
    turnDisplay.style.background = "url(2738231_orig.jpg)";
    turnDisplay.style.backgroundSize = "cover"
    turnDisplay.style.border = "2px solid red"
  } else{
    turnDisplay.style.background = "url(the-great-gatsby-9.jpg)"
    turnDisplay.style.backgroundSize = "cover"
    turnDisplay.style.border = "2px solid yellow"
  }
}

// Initialize board array + UI
for (let r = 0; r < ROWS; r++) {
  board[r] = [];
  for (let c = 0; c < COLS; c++) {
    board[r][c] = null;

    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.row = r;
    cell.dataset.col = c;

    cell.addEventListener("click", () => dropPiece(c));

    boardElement.appendChild(cell);
  }
}

// Set initial turn display
updateTurnIndicator();

function dropPiece(col) {
  for (let r = ROWS - 1; r >= 0; r--) {
    if (!board[r][col]) {
      board[r][col] = currentPlayer;

      const cell = document.querySelector(
        `[data-row='${r}'][data-col='${col}']`
      );
    if (currentPlayer === "red") {
        cell.style.backgroundImage = "url(2738231_orig.jpg)";
        cell.style.border = "2px solid red"
    } else {
        cell.style.backgroundImage = "url(the-great-gatsby-9.jpg)";
        cell.style.border = "2px solid yellow"
    }

    cell.style.backgroundSize = "cover";
    cell.style.backgroundPosition = "center";

      // 🏆 CHECK WIN
      if (checkWin(r, col)) {
        setTimeout(() => {
          endGame();
        }, 50);
        return;
      }

      // Switch player
      currentPlayer = currentPlayer === "red" ? "yellow" : "red";
      
      updateTurnIndicator(); // update circle

      return;
    }
  }
}

function checkWin(row, col) {
  const player = board[row][col];

  function countDirection(rStep, cStep) {
    let count = 0;
    let r = row + rStep;
    let c = col + cStep;

    while (
      r >= 0 && r < ROWS &&
      c >= 0 && c < COLS &&
      board[r][c] === player
    ) {
      count++;
      r += rStep;
      c += cStep;
    }

    return count;
  }

  function checkDirection(rStep, cStep) {
    return (
      1 +
      countDirection(rStep, cStep) +
      countDirection(-rStep, -cStep)
    ) >= 4;
  }

  return (
    checkDirection(0, 1) ||   // horizontal
    checkDirection(1, 0) ||   // vertical
    checkDirection(1, 1) ||   // diagonal down-right
    checkDirection(1, -1)     // diagonal down-left
  );
}

function endGame() {
    let modal = document.getElementById("modal")
    let board = document.getElementById("board")
    board.innerHTML = ""
    board.textContent = ""
    board.style.visibility = "hidden"

    if(currentPlayer === "red"){
        currentPlayer = "Nick"
    }else{
        currentPlayer = "Gatsby"
    }

    modal.innerHTML = `
        <h1 id="modalTitle">${currentPlayer} Wins the Game!!</h1>
        <button id = "restart" onclick="restart()">Restart Game</button>
    `
    
    setTimeout(() => {
        modal.style.visibility = "visible"
    }, 50);

}

function restart(){
    location.reload()
}
