import { updateBoard, shuffleCards } from "./board.js";

const shuffleBtn = document.getElementById("shuffle_btn");
shuffleBtn.onclick = shuffleCards;

updateBoard();
