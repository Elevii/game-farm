const start = document.querySelector("#start");
const score = document.querySelector("#score");
const home = document.querySelector(".home");
const modal = document.querySelector(".modal");

// Animated Icon Hover Options

function startIconAdd() {
  if (start.classList.contains("icon")) return;

  start.classList.add("icon");
}

function startIconRmv() {
  if (start.classList.contains("icon")) {
    start.classList.remove("icon");
  }
}

function scoreIconAdd() {
  if (score.classList.contains("icon")) return;

  start.classList.remove("icon");
  score.classList.add("icon");
}

function scoreIconRmv() {
  if (score.classList.contains("icon")) {
    score.classList.remove("icon");
    startIconAdd();
  }
}

start.addEventListener("mouseenter", (ev) => {
  ev.preventDefault();
  startIconAdd();
});

score.addEventListener("mouseenter", (ev) => {
  ev.preventDefault();
  scoreIconAdd();
});

score.addEventListener("mouseleave", (ev) => {
  ev.preventDefault();
  scoreIconRmv();
});

// Modal User Name

function saveUser() {
  const value = document.querySelector(".modal-input");
  const user = { user: value.value, score: 0 };

  if (!validateInput(value)) return;

  handlerUsers(user);
  location.replace(`/pages/game/index.html`);
}

function validateInput(value) {
  const notFound = document.querySelector("span.not-found");
  const error = document.querySelector("span.error");

  if (value.value.length === 0) {
    value.classList.add("error");
    notFound.classList.remove("desactive");
    return false;
  } else if (value.value.length < 3) {
    value.classList.add("error");
    error.classList.remove("desactive");
    return false;
  }

  value.classList.remove("error");
  notFound.classList.add("desactive");
  error.classList.add("desactive");
  return true;
}

function handlerUsers(user) {
  if (localStorage.getItem("save")) {
    const saves = JSON.parse(localStorage.getItem("save"));
    let newSave = [];
    if (saves.length > 0) {
      const users = saves.map((save) => save);
      users.push(user);
      return localStorage.setItem("save", JSON.stringify(users));
    }
    newSave.push(saves);
    newSave.push(user);
    localStorage.setItem("save", JSON.stringify(newSave));
    return;
  }

  localStorage.setItem("save", JSON.stringify(user));
}

function closeModal() {
  modal.classList.add("desactive");
}

function onModalUserName() {
  modal.classList.remove("desactive");
}

function redirectScoreScreen() {
  location.replace(`/pages/score/index.html`);
}
