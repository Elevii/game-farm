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

  function stopGame() {
    stopPlayer();
    stopScore();
    restartGameElement.classList.add("show");
    gameContainerElement.classList.add("stop");
    clearInterval(changeStartEnemies);
    stopEnemy();
  }

  function restartGame() {
    location.reload();
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
