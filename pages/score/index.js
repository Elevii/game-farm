const scoreList = document.querySelector(".score-list");
const deleteAll = document.querySelector(".delete-all");

var URL_API = "https://amelios-api.andersudev.workers.dev/api/scores";

var myHeaders = new Headers();

var myInit = {
  method: "GET",
  headers: myHeaders,
};

function handlerSaves() {
  fetch(URL_API, myInit)
    .then((response) => response.json())
    .then((resp) => scoreListArray(resp.scores))
    .catch((err) => {
      const records = document.createElement("div");
      records.classList.add("no-score");
      scoreList.appendChild(records);

      records.innerHTML = `    
            <span>Nenhum record cadastrado.</span>
        `;
    });
}

function scoreListArray(saves) {
  for (let save of saves) {
    const records = document.createElement("li");
    scoreList.appendChild(records);

    records.innerHTML = `    
        <span>${save.name}</span>
        <span>${save.score}</span>
    `;
  }
}

deleteAll.addEventListener("click", () => {
  fetch(`${URL_API}/all/delete`, {
    method: "POST",
  })
    .then((response) => response.json())
    .then((resp) => alert("Deletados com sucesso!"))
    .catch((err) => {
      console.error("error: ", err);
    });
});

function startScoreScreen() {
  handlerSaves();
}

startScoreScreen();
