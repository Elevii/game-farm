const Enemy = ({ obstacleElement, flyElement, level, newLevel }) => {
  const OBSTACLE_SIZES = ["obstacle-s", "obstacle-m", "obstacle-l"];
  const FLY_POSITIONS = ["bottom", "center", "top"];

  let hasLesm = false;
  function getRandomObstacleSize() {
    if (level.classList.contains("level3") && !hasLesm) {
      OBSTACLE_SIZES.push("lesm-s", "lesm-m", "lesm-l");
      hasLesm = true;
    }
    
    const index = Math.floor(Math.random() * (OBSTACLE_SIZES.length));
    return OBSTACLE_SIZES[index];
  }

  function getRandomFlyPositions() {
    const index = Math.floor(Math.random() * (FLY_POSITIONS.length));
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
        randomiseEnemyPosition();
      }, 3000);
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
    obstacleElement.classList.add(`${enemySize}`);
    beforeObstacle = `${enemySize}`;
  }

  let beforeFly;
  let handleFlyEnemy;
  function randomiseEnemyPosition() {
    if (!flyElement.classList.contains("invisible")) {
      handleFlyEnemy = setInterval(() => {
        const flyPosition = getRandomFlyPositions();
        flyElement.classList.remove(beforeFly);
        flyElement.classList.add(`fly-${flyPosition}`);
        beforeFly = `fly-${flyPosition}`;
      }, 6000);
    }
  }

  function stopEnemy() {
    clearInterval(handleFlyEnemy);
  }

  function startEnemy() {
    randomiseEnemy();
  }

  return { startEnemy, stopEnemy };
};

export default Enemy;
