const ROWS = 6;
const COLS = 7;
let board = [];
let currentPlayer = "red";

const funFacts = [
  "F. Scott Fitzgerald wrote the novel in 1924, during the Jazz Age.",
  "The character Jay Gatsby was inspired by Fitzgerald's own experiences and acquaintances.",
  "The green light at the end of Daisy's dock symbolizes Gatsby's unattainable dreams.",
  "The novel critiques the American Dream and the moral decay of society in the 1920s.",
  "'The Great Gatsby' was adapted into several films, with the most famous being the 2013 version starring Leonardo DiCaprio.",
  "Fitzgerald's original title was 'Trimalchio in West Egg' referencing a character from Roman literature.",
  "The book gained immense popularity after Fitzgerald's death, becoming a classic of American literature.",
  "The Valley of Ashes represents the moral and social decay resulting from the uninhibited pursuit of wealth.",
  "The novel is often studied for its rich symbolism and themes of love, wealth, and disillusionment.",
  "The Eyes of Dr. T.J. Eckleburg, depicted on a billboard, represent the eyes of God watching over the moral decay of society.",
  "Fitzgerald uses flashbacks to provide background information on Gatsby's past and his relationship with Daisy.",
  "Colors play a significant role in the novel, with green symbolizing hope, white representing purity, and yellow indicating corruption.",
  "The iconic cover art, featuring disembodied eyes and lips, was designed by artist Francis Cugat.",
  "Fitzgerald's handwritten notes and revisions for the novel are preserved at Princeton University.",
  "The novel has influenced fashion, with the 1920s flapper style making a comeback in various forms."
]

const funFactText = document.getElementById("funFactText");

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
showRandomFact();

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
      showRandomFact();

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

function showRandomFact() {
  const randomIndex = Math.floor(Math.random() * funFacts.length);
  funFactText.textContent = funFacts[randomIndex];
  console.log(randomIndex)
}

function endGame() {
    let modal = document.getElementById("modal")
    document.getElementById("board").innerHTML = ""

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
