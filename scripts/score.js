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

  let highscore = localStorage.getItem("highscore") || 0;
  function setHighScore(newScore) {
    highScoreElement.innerText = highscore = newScore;
    localStorage.setItem("highscore", newScore);
  }

  function checkForHighScore() {
    if (score > highscore) {
      setHighScore(score);
    }
  }

  function startScore() {
    countScore();
    setHighScore(highscore);
  }

  function stopScore() {
    clearInterval(scoreInterval);
  }

  return {
    startScore,
    stopScore,
    checkForHighScore,
    score
  };
};

export default Score;
