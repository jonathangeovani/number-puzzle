import {
  getBoardWidth,
  updateCardPosition,
  getCurrentPosition,
  getInitialPosition,
  checkIfCanMove,
  updateBoard,
} from "./board.js";
import { game } from "./script.js";

export function createCard(id, position) {
  const boardWidth = getBoardWidth();
  const card = document.createElement("div");

  card.className = "card";
  card.id = `card_${id}`;
  card.innerText = id;
  const initialPosition = getInitialPosition(id);

  card.style.width = `calc(100% / ${boardWidth} - 2vmin)`;
  card.style.height = `calc(100% / ${boardWidth} - 2vmin)`;
  card.style.top = `${(position.y * 100) / boardWidth}%`;
  card.style.left = `${(position.x * 100) / boardWidth}%`;

  if (game.image) {
    card.style.backgroundImage = `url(${game.image})`;
    card.style.backgroundSize = `${boardWidth * 100}% ${boardWidth * 100}%`;
    card.style.backgroundPositionX = `${
      initialPosition.x * (100 / (boardWidth - 1))
    }%`;
    card.style.backgroundPositionY = `${
      initialPosition.y * (100 / (boardWidth - 1))
    }%`;
    card.style.backgroundBlendMode = "overlay";
    card.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
    card.style.color = "white";
    card.style.textShadow = "0 0 5px black";
  }

  card.onclick = handleCardClick;

  return card;
}

function handleCardClick() {
  const cardNumber = parseInt(this.innerText);
  const cardPosition = getCurrentPosition(cardNumber);
  const direction = checkIfCanMove(cardPosition);

  if (direction) {
    move(this.id, cardPosition, direction);
    updateBoard();
  }
}

export function updatePosition() {
  const cardNumber = parseInt(card.innerText);
  const cardPosition = getCurrentPosition(cardNumber);

  return cardPosition;
}

export function move(cardId, cardPosition, direction) {
  const currentCard = document.getElementById(cardId);
  const newCardPos = cardPosition;

  if (direction == "top") {
    newCardPos.y -= 1;
    updateCardPosition(currentCard.id, newCardPos);
  } else if (direction == "right") {
    newCardPos.x += 1;
    updateCardPosition(currentCard.id, newCardPos);
  }
  if (direction == "bottom") {
    newCardPos.y += 1;
    updateCardPosition(currentCard.id, newCardPos);
  } else if (direction == "left") {
    newCardPos.x -= 1;
    updateCardPosition(currentCard.id, newCardPos);
  }
}
