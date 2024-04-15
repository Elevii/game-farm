import Game from "./scripts/game.js";
import { restart } from "./scripts/elements.js";

const { startGame, restartGame } = Game();

restart.addEventListener("click", () => {
  restartGame();
});

function main() {
  startGame();
}

main();
