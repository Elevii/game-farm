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
  
  if (!validateInput(value)) return;

  localStorage.setItem("user", JSON.stringify(value.value));
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

function closeModal() {
  modal.classList.add("desactive");
}

function onModalUserName() {
  modal.classList.remove("desactive");
}

function redirectScoreScreen() {
  location.replace(`/pages/score/index.html`);
}
