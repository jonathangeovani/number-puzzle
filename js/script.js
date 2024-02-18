import { createBoard, shuffleCards, updateBoard } from "./board.js";

const shuffleBtn = document.getElementById("shuffle_btn");
shuffleBtn.onclick = shuffleCards;

const gameMode = document.getElementById("game_mode");
gameMode.addEventListener("change", () => {
  createBoard(gameMode.value);
  updateBoard();
});

createBoard(gameMode.value);
updateBoard();
