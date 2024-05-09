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
  power,
  playerSupreme,
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
  const { startScore, stopScore, setScore } = Score({
    scoreElement,
    highScoreElement,
  });
  const { startPlayer, stopPlayer } = Player({
    playerElement,
    obstacleElement,
    flyElement,
    stopGame,
    influence,
    scoreElement,
    setScore,
    power,
    playerSupreme,
  });
  const INFLUENCE_ITEMS = ["supreme", "negative", "positive"];
  const INFLUENCE_POSITION = ["bottom", "middle", "top"];

  var URL_API = "https://amelios-api.andersudev.workers.dev/api/scores";
  var myHeaders = new Headers();

  let changeStartEnemies;
  function startEnemies() {
    changeStartEnemies = setInterval(() => {
      startEnemy();
    }, 4000);
  }

  let beforeInfluence;
  let changeInfluence;
  function startInfluence() {
    changeInfluence = setInterval(() => {
      const index = Math.floor(Math.random() * INFLUENCE_ITEMS.length);
      const position = Math.floor(Math.random() * INFLUENCE_POSITION.length);
      influence.classList.remove(beforeInfluence);
      influence.classList.add(`${INFLUENCE_ITEMS[index]}`);
      influence.classList.add(`${INFLUENCE_POSITION[position]}`);
      beforeInfluence = `${
        (INFLUENCE_ITEMS[index], INFLUENCE_POSITION[position])
      }`;
    }, 24000);
  }

  exit.addEventListener("click", () => saveUser("EXIT"));

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
    saveUser("RESTART");
  }

  function saveUser(button) {
    const value = localStorage.getItem("user");
    const user = {
      name: JSON.parse(value),
      score: +scoreElement.innerText,
    };

    var myInit = {
      method: "GET",
      headers: myHeaders,
    };

    fetch(URL_API, myInit)
      .then((response) => response.json())
      .then((resp) => {
        const usr = resp.scores.find((el) => el.name === user.name);
        if (!usr) return handlerUsers(user, button);

        if (usr.score > user.score) {
          if (button === "EXIT") return location.replace("../../index.html");

          return location.reload();
        }
        console.log("teste");
        handlerUser(usr, button);
      })
      .catch((err) => console.error("error: ", err));
  }

  function handlerUser(user, option) {
    var usr = {
      name: user.name,
      score: +scoreElement.innerText,
    };
    
    var myInit = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(usr),
    };

    fetch(`${URL_API}/${user.id}`, myInit)
      .then((response) => {
        if (response.ok) {
          if (option === "EXIT") return location.replace("../../index.html");

          location.reload();
        }
      })
      .catch((err) => console.error("error: ", err));
  }

  function handlerUsers(user, option) {
    var myInit = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(user),
    };

    fetch(URL_API, myInit)
      .then((response) => {
        if (response.ok) {
          if (option === "EXIT") return location.replace("../../index.html");

          location.reload();
        }
      })
      .catch((err) => console.error("error: ", err));
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
