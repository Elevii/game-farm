const Player = ({
  playerElement,
  obstacleElement,
  flyElement,
  checkForHighScore,
  stopGame,
  influence,
  scoreElement,
  setScore,
  power,
  playerSupreme,
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
    }, 2000);
  }

  /**
   * COLLISION
   */

  let count = 10;

  let collisionInterval;
  let protect = false;
  function monitorCollision() {
    collisionInterval = setInterval(() => {
      if (isCollision() && !protect) {
        checkForHighScore();
        stopGame();
      } else if (isInfluenceCollision()) {
        if (influence.classList.contains("supreme")) {
          countPower();
          influence.classList.remove("supreme");
          power.classList.add("active");
          playerElement.classList.add("supreme");
          power.innerHTML = "10s de PROTEÇÃO SUPREMA!";
          protect = true;

          desabilityProtect();
          desabilityPower();
        } else if (influence.classList.contains("positive")) {
          setScore(+scoreElement.innerText + 100);
          influence.classList.remove("positive");
          power.classList.add("active");
          power.innerHTML = "+100";

          desabilityPower();
        } else {
          setScore(+scoreElement.innerText - 100);
          influence.classList.remove("negative");
          power.classList.add("active");
          power.innerHTML = "-100";

          desabilityPower();
        }
      }
    }, 10);
  }

  function desabilityProtect() {
    setTimeout(() => {
      clearInterval(changeCount);
      protect = false;
      playerElement.classList.remove("supreme");
      count = 10;
    }, 10000);
  }

  function desabilityPower() {
    setTimeout(() => {
      power.classList.remove(`active`);
    }, 5000);
  }

  let changeCount;
  function countPower() {
    changeCount = setInterval(() => {
      count = count - 1;
      if (count === 0) return (playerSupreme.innerHTML = "");
      playerSupreme.innerHTML = `${count - 1}`;
    }, 1000);
  }

  // Left buffer for tail
  const LEFT_BUFFER = 50;
  const RIGHT_BUFFER = 30;
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
      obstacleR - LEFT_BUFFER > playerL - RIGHT_BUFFER &&
      obstacleL < playerR - RIGHT_BUFFER;
    const yCollisionObstacle =
      playerB - RIGHT_BUFFER > obstacleT && playerT - RIGHT_BUFFER < obstacleB;

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

  function isInfluenceCollision() {
    const playerClientRect = playerElement.getBoundingClientRect();
    const playerL = playerClientRect.left;
    const playerR = playerClientRect.right;
    const playerB = playerClientRect.bottom;
    const playerT = playerClientRect.top;

    const influenceClientRect = influence.getBoundingClientRect();
    const influenceB = influenceClientRect.bottom;
    const influenceL = influenceClientRect.left;
    const influenceR = influenceClientRect.right;
    const influenceT = influenceClientRect.top;
    const xCollisionInfluence =
      influenceR - LEFT_BUFFER > playerL && influenceL < playerR;
    const yCollisionInfluence = playerB > influenceT && playerT < influenceB;

    return xCollisionInfluence && yCollisionInfluence;
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
