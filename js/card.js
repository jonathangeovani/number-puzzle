import {
  BOARD_WIDTH,
  updateCardPosition,
  getPosition,
  checkIfCanMove,
  updateBoard,
} from "./board.js";

export function createCard(id, position) {
  const card = document.createElement("div");

  card.className = "card";
  card.id = `card_${id}`;
  card.innerText = id;
  card.style.width = `calc(100% / ${BOARD_WIDTH} - 2vmin)`;
  card.style.height = `calc(100% / ${BOARD_WIDTH} - 2vmin)`;
  card.style.top = `${(position.y * 100) / BOARD_WIDTH}%`;
  card.style.left = `${(position.x * 100) / BOARD_WIDTH}%`;
  card.onclick = handleCardClick;

  return card;
}

function handleCardClick() {
  const cardNumber = parseInt(this.innerText);
  const cardPosition = getPosition(cardNumber);
  const direction = checkIfCanMove(cardPosition);

  if (direction) {
    move(this.id, cardPosition, direction);
    updateBoard();
  }
}

export function updatePosition() {
  const cardNumber = parseInt(card.innerText);
  const cardPosition = getPosition(cardNumber);

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
