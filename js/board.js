import { createCard } from "./card.js";

export const BOARD_SIZE = 36;
export const BOARD_WIDTH = Math.sqrt(BOARD_SIZE);
const BOARD_END = BOARD_WIDTH - 1;

const board = document.getElementById("board");
const boardCards = createBoardCards(BOARD_WIDTH);

function createBoardCards(size = 3) {
  const boardItems = [];
  let currentPos = 1;
  for (let row = 0; row < size; row++) {
    boardItems.push([]);
    for (let col = 0; col < size; col++) {
      if (currentPos != BOARD_SIZE) {
        boardItems[row][col] = currentPos;
      } else {
        boardItems[row][col] = 0;
      }
      currentPos++;
    }
  }

  return boardItems;
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

export function updateBoard() {
  board.innerHTML = "";
  insertCards();
}

export function getPosition(cardNumber) {
  for (let row = 0; row <= BOARD_END; row++) {
    for (let col = 0; col <= BOARD_END; col++) {
      if (boardCards[row][col] == cardNumber) {
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
  } else if (cardCol != BOARD_END && boardCards[cardRow][cardCol + 1] == 0) {
    return "right";
  } else if (cardRow != BOARD_END && boardCards[cardRow + 1][cardCol] == 0) {
    return "bottom";
  } else if (cardCol != 0 && boardCards[cardRow][cardCol - 1] == 0) {
    return "left";
  }
}

export function updateCardPosition(cardId, newPos) {
  const card = document.getElementById(cardId);

  for (let row = 0; row < BOARD_WIDTH; row++) {
    for (let col = 0; col < BOARD_WIDTH; col++) {
      if (boardCards[row][col] == card.innerText) {
        boardCards[row][col] = 0;
        boardCards[newPos.y][newPos.x] = card.innerText;
      }
    }
  }
}
