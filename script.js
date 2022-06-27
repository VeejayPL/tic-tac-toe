const Player = (name, marker) => {
  const sayHello = () =>
    console.log(`Hello! My name is ${name} and playing under ${marker}`);
  return { name, marker, sayHello };
};

const startGameBtn = document
  .querySelector("#start-btn")
  .addEventListener("click", displayModal);
const resetButton = document
  .querySelector("#reset-btn")
  .addEventListener("click", resetBoard);

function displayModal() {
  const modal = document.querySelector("#modal-container");
  const closeBtn = document.querySelector("#modal-btn-close");
  modal.style.display = "block";
  closeBtn.addEventListener("click", () => {
    modal.setAttribute("close", "");
    window.setTimeout(() => {
      modal.style.display = "none";
      modal.removeAttribute("close");
    }, 600);
  });
  window.addEventListener("click", (e) => {
    if (e.target == modal) {
      modal.setAttribute("close", "");
      window.setTimeout(() => {
        modal.style.display = "none";
        modal.removeAttribute("close");
      }, 600);
    }
  });
}

function renderBoard() {
  for (let i = 0; i < 9; i++) {
    const gameBoard = document.querySelector("#gameboard");
    const field = document.createElement("div");
    field.classList.add("field");
    field.setAttribute("data-index", [i]);
    field.addEventListener("click", (e) => {
      e.target.innerText = "X";
    });
    gameBoard.appendChild(field);
  }
}
function resetBoard() {
  const field = document.querySelectorAll(".field");
  field.forEach((field) => (field.innerText = ""));
}
renderBoard();
