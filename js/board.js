import { createCard } from "./card.js";
import { game } from "./script.js";

let boardSize;
let boardWidth;
let boardEnd;
let boardCards = [];
let initialBoard = [];

const board = document.getElementById("board");

export function createBoard(size = 3) {
  const boardItems = [];
  let currentPos = 1;
  boardSize = size * size;
  boardWidth = size;
  boardEnd = size - 1;

  for (let row = 0; row < size; row++) {
    boardItems.push([]);
    for (let col = 0; col < size; col++) {
      if (currentPos != boardSize) {
        boardItems[row][col] = currentPos;
      } else {
        boardItems[row][col] = 0;
      }
      currentPos++;
    }
  }

  boardCards = boardItems;
  initialBoard = boardItems;
  board.classList.remove("win");
}

export function updateBoard() {
  board.innerHTML = "";
  insertCards();
}

function insertCards() {
  for (let row = 0; row < boardCards.length; row++) {
    for (let col = 0; col < boardCards[row].length; col++) {
      const currentCard = boardCards[row][col];
      if (currentCard != 0) {
        const currentPos = { x: col, y: row };
        const card = createCard(currentCard, currentPos);
        if (checkIfCanMove(currentPos)) {
          card.classList.add("clickable");
        } else {
          card.classList.remove("clickable");
        }

        board.appendChild(card);
      }
    }
  }
}

export function getBoardWidth() {
  return boardWidth;
}

export function getCurrentPosition(cardNumber) {
  for (let row = 0; row <= boardEnd; row++) {
    for (let col = 0; col <= boardEnd; col++) {
      if (boardCards[row][col] == cardNumber) {
        return { x: col, y: row };
      }
    }
  }
}

export function getInitialPosition(cardNumber) {
  for (let row = 0; row <= boardEnd; row++) {
    for (let col = 0; col <= boardEnd; col++) {
      if (initialBoard[row][col] == cardNumber) {
        return { x: col, y: row };
      }
    }
  }
}

export function checkIfCanMove(cardPosition) {
  const cardCol = cardPosition.x;
  const cardRow = cardPosition.y;

  if (cardRow != 0 && boardCards[cardRow - 1][cardCol] == 0) {
    return "top";
  } else if (cardCol != boardEnd && boardCards[cardRow][cardCol + 1] == 0) {
    return "right";
  } else if (cardRow != boardEnd && boardCards[cardRow + 1][cardCol] == 0) {
    return "bottom";
  } else if (cardCol != 0 && boardCards[cardRow][cardCol - 1] == 0) {
    return "left";
  }
}

export function updateCardPosition(cardId, newPos) {
  const card = document.getElementById(cardId);

  for (let row = 0; row < boardWidth; row++) {
    for (let col = 0; col < boardWidth; col++) {
      if (boardCards[row][col] == card.innerText) {
        boardCards[row][col] = 0;
        boardCards[newPos.y][newPos.x] = parseInt(card.innerText);
      }
    }
  }

  if (isFinished() && !game.solved) {
    board.classList.add("win");
    game.solved = true;
  }
}

export function shuffleCards() {
  const matrix = boardCards;
  let m = matrix.length;
  let n = matrix[0].length;

  // Flatten the matrix into a 1D array
  let flatMatrix = matrix.flat();

  // Find the index of element 9
  let spaceIndex = flatMatrix.indexOf(0);

  // Fisher-Yates shuffle algorithm while keeping element 9 at its original position
  for (let i = flatMatrix.length - 1; i > 0; i--) {
    if (i === spaceIndex) {
      continue; // Skip shuffling if it's the position of element 9
    }
    const j = Math.floor(Math.random() * (i + 1));
    if (j === spaceIndex) {
      continue; // Skip shuffling if it's the position of element 9
    }
    [flatMatrix[i], flatMatrix[j]] = [flatMatrix[j], flatMatrix[i]];
  }

  // Reshape the 1D array back into a matrix
  let shuffledMatrix = [];
  for (let i = 0; i < m; i++) {
    shuffledMatrix.push(flatMatrix.slice(i * n, (i + 1) * n));
  }

  boardCards = shuffledMatrix;

  if (isSolvable()) {
    updateBoard();
  } else {
    shuffleCards();
  }
}

function isSolvable() {
  let inversionCount = 0;
  const flattenedBoard = boardCards.flat();

  // Count inversions
  for (let i = 0; i < flattenedBoard.length; i++) {
    for (let j = i + 1; j < flattenedBoard.length; j++) {
      // Ignore the blank space represented by 0
      if (
        flattenedBoard[i] !== 0 &&
        flattenedBoard[j] !== 0 &&
        flattenedBoard[i] > flattenedBoard[j]
      ) {
        inversionCount++;
      }
    }
  }

  // For an NxN puzzle with an odd grid width, the puzzle is solvable if inversion count is even
  // For an NxN puzzle with an even grid width, the puzzle is solvable if:
  // - the blank tile is on an even row counting from the bottom (0-indexed), and the inversion count is odd
  // - OR the blank tile is on an odd row counting from the bottom (0-indexed), and the inversion count is even
  const gridSize = boardCards.length;
  const blankIndex = flattenedBoard.indexOf(0);
  const blankRowFromBottom = gridSize - Math.floor(blankIndex / gridSize);

  if (gridSize % 2 === 1) {
    return inversionCount % 2 === 0;
  } else {
    return (
      (blankRowFromBottom % 2 === 0 && inversionCount % 2 === 1) ||
      (blankRowFromBottom % 2 === 1 && inversionCount % 2 === 0)
    );
  }
}

function isFinished() {
  const numRows = boardCards.length;
  const numCols = boardCards[0].length;
  let lastElem = 0;

  // Check if each row is ordered
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      if (boardCards[i][j] > lastElem) {
        lastElem = boardCards[i][j];
      } else if (boardCards[i][j] != 0) {
        return false;
      }
    }
  }

  if (boardCards[numRows - 1][numCols - 1] != 0) {
    return false;
  }

  return true;
}
