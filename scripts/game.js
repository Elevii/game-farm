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
  influence,
  power
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
  const { startScore, stopScore, checkForHighScore, setScore } = Score({
    scoreElement,
    highScoreElement,
  });
  const { startPlayer, stopPlayer } = Player({
    playerElement,
    obstacleElement,
    flyElement,
    checkForHighScore,
    stopGame,
    influence,
    scoreElement,
    setScore,
    power
  });
  const INFLUENCE_ITEMS = ["supreme", "negative", "positive"];
  const INFLUENCE_POSITION = ["bottom", "middle", "top"];

  let changeStartEnemies;
  function startEnemies() {
    changeStartEnemies = setInterval(() => {
      startEnemy();
    }, 6000);
  }

  let beforeInfluence;
  let changeInfluence;
  function startInfluence() {
    changeInfluence = setInterval(() => {
      const index = Math.floor(Math.random() * (INFLUENCE_ITEMS.length - 1));
      const position = Math.floor(
        Math.random() * (INFLUENCE_POSITION.length - 1)
      );
      influence.classList.remove(beforeInfluence);
      influence.classList.add(`${INFLUENCE_ITEMS[index]}`);
      influence.classList.add(`${INFLUENCE_POSITION[position]}`);
      beforeInfluence = `${
        (INFLUENCE_ITEMS[index], INFLUENCE_POSITION[position])
      }`;
    }, 12000);
  }

  exit.addEventListener("click", () => saveUser());

  function stopGame() {
    stopPlayer();
    stopScore();
    restartGameElement.classList.add("show");
    gameContainerElement.classList.add("stop");
    clearInterval(changeStartEnemies);
    clearInterval(changeInfluence);
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
    startInfluence();
  }

  return {
    startGame,
    restartGame,
    stopGame,
  };
};

export default Game;
