const Player = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;
  const info = () => console.log(`${name}: ${marker}`);
  return { getName, getMarker, info };
};

const displayController = (() => {
  const newGameBtn = document.querySelector("#start-btn");
  const resetButton = document.querySelector("#reset-btn");
  const modal = document.querySelector("#modal-container");
  const closeBtn = document.querySelector("#modal-btn-close");

  newGameBtn.addEventListener("click", (e) => {
    gameboardDisplay.clear();
    toggleModal();
  });

  closeBtn.addEventListener("click", (e) => toggleModal());
  resetButton.addEventListener("click", (e) => gameboardDisplay.reset());

  window.addEventListener("click", (e) => {
    if (e.target == modal) {
      modal.setAttribute("close", "");
      window.setTimeout(() => {
        modal.style.display = "none";
        modal.removeAttribute("close");
      }, 600);
    }
  });

  const toggleModal = () => {
    if (modal.style.display === "block") {
      modal.setAttribute("close", "");
      window.setTimeout(() => {
        modal.style.display = "none";
        modal.removeAttribute("close");
      }, 600);
    } else {
      modal.style.display = "block";
    }
  };

  const writeToDom = (selector, message) => {
    document.querySelector(selector).innerText = message;
  };

  return { writeToDom };
})();

const gameboardDisplay = (() => {
  const render = () => {
    if (document.querySelector("#gameboard").innerHTML !== "") return;
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
  };
  const clear = () => {
    for (let i = 0; i < 9; i++) {
      const gameBoard = document.querySelector("#gameboard");
      const field = document.querySelector(".field");
      gameBoard.removeChild(field);
    }
  };
  const reset = () => {
    const field = document.querySelectorAll(".field");
    field.forEach((field) => (field.innerText = ""));
  };

  return { render, reset, clear };
})();

const modal = (() => {
  const startBtn = document.querySelector("#modal-btn");
})();

const playerCreator = (() => {})();

const gameboard = (() => {})();
