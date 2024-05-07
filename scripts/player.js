const Player = ({
  playerElement,
  obstacleElement,
  flyElement,
  checkForHighScore,
  stopGame,
}) => {
  function addJumpListener() {
    document.addEventListener("click", (event) => {
      jump();
    });
  }

  let jumping = false;
  function jump() {
    if (jumping) {
      return;
    }

    jumping = true;
    playerElement.classList.add("jump");
    setTimeout(() => {
      playerElement.classList.remove("jump");
      jumping = false;
    }, 1800);
  }

  /**
   * COLLISION
   */
  let collisionInterval;
  function monitorCollision() {
    collisionInterval = setInterval(() => {
      if (isCollision()) {
        checkForHighScore();
        stopGame();
      }
    }, 10);
  }

  // Left buffer for tail
  const LEFT_BUFFER = 50;
  function isCollision() {
    const playerClientRect = playerElement.getBoundingClientRect();
    const playerL = playerClientRect.left;
    const playerR = playerClientRect.right;
    const playerB = playerClientRect.bottom;
    const playerT = playerClientRect.top;

    const obstacleClientRect = obstacleElement.getBoundingClientRect();
    const obstacleB = obstacleClientRect.bottom;
    const obstacleL = obstacleClientRect.left;
    const obstacleR = obstacleClientRect.right;
    const obstacleT = obstacleClientRect.top;
    const xCollisionObstacle =
      obstacleR - LEFT_BUFFER > playerL && obstacleL < playerR;
    const yCollisionObstacle = playerB > obstacleT && playerT < obstacleB;

    const flyClientRect = flyElement.getBoundingClientRect();
    const flyB = flyClientRect.bottom;
    const flyL = flyClientRect.left;
    const flyR = flyClientRect.right;
    const flyT = flyClientRect.top;
    const xCollisionFly = flyR - LEFT_BUFFER > playerL && flyL < playerR;
    const yCollisionFly = playerB > flyT && playerT < flyB;

    return (
      (xCollisionObstacle && yCollisionObstacle) ||
      (xCollisionFly && yCollisionFly)
    );
  }

  function stopPlayer() {
    clearInterval(collisionInterval);
  }

  function startPlayer() {
    addJumpListener();
    monitorCollision();
  }

  return { startPlayer, stopPlayer };
};

export default Player;
