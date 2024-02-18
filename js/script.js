import { createBoard, shuffleCards, updateBoard } from "./board.js";

const shuffleBtn = document.getElementById("shuffle_btn");
shuffleBtn.addEventListener("click", () => {
  createBoard(game.mode);
  updateBoard();
  shuffleCards();
  game.solved = false;
});

const gameMode = document.getElementById("game_mode");
gameMode.addEventListener("change", () => {
  game.mode = gameMode.value;
  createBoard(game.mode);
  updateBoard();
  game.solved = true;
});

export const game = {
  mode: gameMode.value,
  solved: true,
};

createBoard(gameMode.value);
updateBoard();
