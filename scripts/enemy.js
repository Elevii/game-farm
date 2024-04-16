const Enemy = ({ obstacleElement, flyElement, level, newLevel }) => {
  const OBSTACLE_SIZES = ["xs", "s", "m", "l"];
  const FLY_POSITIONS = ["bottom", "center", "top"];

  function getRandomObstacleSize() {
    const index = Math.floor(Math.random() * (OBSTACLE_SIZES.length - 1));
    return OBSTACLE_SIZES[index];
  }

  function getRandomFlyPositions() {
    const index = Math.floor(Math.random() * (FLY_POSITIONS.length - 1));
    return FLY_POSITIONS[index];
  }

  function activeFly() {
    if (level.classList.contains("level1")) {
      return;
    } else if (
      level.classList.contains("level2") &&
      flyElement.classList.contains("invisible")
    ) {
      setTimeout(() => {
        flyElement.classList.remove("invisible");
      }, 2000);
      return;
    }
  }

  let newLvl = "level1";
  function randomiseEnemy() {
    activeFly();
    newLevel();
    setEnemy();
  }

  function setEnemy() {
    const enemySize = getRandomObstacleSize();
    randomiseEnemySize(enemySize);
  }

  function setLvl(lvl) {
    newLvl = lvl;
  }

  let beforeObstacle;
  function randomiseEnemySize(enemySize) {
    obstacleElement.classList.remove(beforeObstacle);
    obstacleElement.classList.add(`obstacle-${enemySize}`);
    beforeObstacle = `obstacle-${enemySize}`;
  }

  let beforeFly;
  let handleFlyEnemy
  function randomiseEnemyPosition() {
    if (!flyElement.classList.contains("invisible")) {
      const flyPosition = getRandomFlyPositions();
      handleFlyEnemy = setInterval(() => {
        flyElement.classList.remove(beforeFly);
        flyElement.classList.add(`fly-${flyPosition}`);
        beforeFly = `fly-${flyPosition}`;
      }, 4000);
    }
  }

  function stopEnemy() {
    clearInterval(handleFlyEnemy);
  }

  function startEnemy() {
    randomiseEnemy();
    randomiseEnemyPosition();
  }

  return { startEnemy, stopEnemy };
};

export default Enemy;
