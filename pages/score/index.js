const scoreList = document.querySelector(".score-list");

function handlerSaves() {
  if (localStorage.getItem("save")) {
    const saves = JSON.parse(localStorage.getItem("save"));
    if (saves.length > 0) {
      const users = saves.map((save) => save);
      scoreListArray(users);
      return;
    }
    scoreListSave(saves);
    return;
  }

  const records = document.createElement("div");
  records.classList.add("no-score")
  scoreList.appendChild(records);

  records.innerHTML = `    
        <span>Nenhum record cadastrado.</span>
    `;
}

function scoreListArray(saves) {
  for (let save of saves) {
    const records = document.createElement("li");
    scoreList.appendChild(records);

    records.innerHTML = `    
        <span>${save.user}</span>
        <span>${save.score}</span>
    `;
  }
}

function scoreListSave(saves) {
  const records = document.createElement("li");
  scoreList.appendChild(records);

  records.innerHTML = `    
        <span>${saves.user}</span>
        <span>${saves.score}</span>
    `;
}

function startScoreScreen() {
  handlerSaves();
}

startScoreScreen();
