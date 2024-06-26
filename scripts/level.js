const Level = ({ obstacleElement, scoreElement, level }) => {
  let oldLevel;

  function newLevel() {
    let score = +scoreElement.innerText;
    if (score >= 300 && score <= 600 && oldLevel != "level2") {
      handleLevel("level1", "level2");
      level.innerText = "Nível 2";
      return;
    } else if (score > 600 && score <= 900 && oldLevel != "level3") {
      handleLevel("level2", "level3");
      level.innerText = "Nível 3";
      return;
    }

    return;
  }

  function handleLevel(oldLvl, lvl) {
    resetClassLevel(oldLvl);
    level.classList.toggle(lvl);
    obstacleElement.classList.toggle(lvl);
    oldLevel = lvl;
  }

  function resetClassLevel(lvl) {
    obstacleElement.classList.remove(lvl);
    level.classList.toggle(lvl);
  }

  function startLevel() {
    newLevel();
  }

  return {
    startLevel,
    newLevel,
  };
};

export default Level;
