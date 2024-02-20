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

const gameImage = document.getElementById("game_image");
const imgLoadedText = document.getElementById("img_loaded");
gameImage.addEventListener("change", () => {
  if (game.image) window.URL.revokeObjectURL(game.image);
  game.image = window.URL.createObjectURL(gameImage.files[0]);
  imgLoadedText.innerText = gameImage.value.replace(/.*\\/, "");
  imgLoadedText.classList.add("loaded");

  createBoard(game.mode);
  updateBoard();
  game.solved = true;
});

imgLoadedText.onclick = () => {
  game.image = null;
  imgLoadedText.innerText = "";
  imgLoadedText.classList.remove("loaded");
  createBoard(game.mode);
  updateBoard();
  game.solved = true;
};

export const game = {
  mode: gameMode.value,
  image: null,
  solved: true,
};

createBoard(gameMode.value);
updateBoard();
