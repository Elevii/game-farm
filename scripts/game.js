import Enemy from "./enemy.js";
import Level from "./level.js";
import Player from "./player.js";
import Score from "./score.js";
import {
  restartGameElement,
  gameContainerElement,
  scoreElement,
  highScoreElement,
  playerElement,
  obstacleElement,
  flyElement,
  level,
  exit,
} from "./elements.js";

const Game = () => {
  const { startLevel, newLevel } = Level({
    obstacleElement,
    scoreElement,
    level,
  });
  const { startEnemy, stopEnemy } = Enemy({
    obstacleElement,
    flyElement,
    level,
    newLevel,
  });
  const { startScore, stopScore, checkForHighScore } = Score({
    scoreElement,
    highScoreElement,
  });
  const { startPlayer, stopPlayer } = Player({
    playerElement,
    obstacleElement,
    flyElement,
    checkForHighScore,
    stopGame,
  });

  let changeStartEnemies;
  function startEnemies() {
    changeStartEnemies = setInterval(() => {
      startEnemy();
    }, 4000);
  }

  exit.addEventListener("click", () => saveUser());

  function stopGame() {
    stopPlayer();
    stopScore();
    restartGameElement.classList.add("show");
    gameContainerElement.classList.add("stop");
    clearInterval(changeStartEnemies);
    stopEnemy();
  }

  function restartGame() {
    saveUser();
    location.reload();
  }

  function saveUser() {
    const value = localStorage.getItem("user");
    const user = {
      user: JSON.parse(value),
      score: +scoreElement.innerText,
    };
    handlerUsers(user);
    location.replace("../../index.html");
  }

  function handlerUsers(user) {
    if (localStorage.getItem("save")) {
      const saves = JSON.parse(localStorage.getItem("save"));
      let newSave = [];
      if (saves.length > 0) {
        const users = saves.map((save) => save);
        users.push(user);
        return localStorage.setItem("save", JSON.stringify(users));
      }
      newSave.push(saves);
      newSave.push(user);
      localStorage.setItem("save", JSON.stringify(newSave));
      return;
    }

    localStorage.setItem("save", JSON.stringify(user));
  }

  function startGame() {
    startPlayer();
    startScore();
    startLevel();
    startEnemies();
    startEnemy();
  }

  return {
    startGame,
    restartGame,
    stopGame,
  };
};

export default Game;
