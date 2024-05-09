const Score = ({ scoreElement, highScoreElement }) => {
  let score = 0;

  function setScore(newScore) {
    scoreElement.innerHTML = score = newScore;
  }

  let scoreInterval;
  function countScore() {
    scoreInterval = setInterval(() => {
      setScore(score + 1);
    }, 100);
  }

  var URL_API = "https://amelios-api.andersudev.workers.dev/api/scores";

  var myHeaders = new Headers();

  var myInit = {
    method: "GET",
    headers: myHeaders,
  };

  let highscore = localStorage.getItem("highscore") || 0;
  function setHighScore() {
    fetch(URL_API, myInit)
      .then((response) => response.json())
      .then((resp) => {
        localStorage.setItem("highscore", resp.scores[0].score);
        highScoreElement.innerText = highscore = resp.scores[0].score;
      })
      .catch((err) => {
        localStorage.setItem("highscore", "0000");
      });
  }

  function startScore() {
    countScore();
    setHighScore();
  }

  function stopScore() {
    clearInterval(scoreInterval);
  }

  return {
    startScore,
    stopScore,
    score,
    setScore,
  };
};

export default Score;
