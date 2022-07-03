"use strict";
const Player = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;
  const info = () => `${name}: ${marker}`;

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

  return { writeToDom, toggleModal };
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
    if (document.querySelector("#gameboard").innerHTML === "") return;
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

  startBtn.addEventListener("click", (e) => {
    getPlayer1Name();
    getPlayer1Marker();
    getPlayer2Name();
    getPlayer2Marker();
    getPlayer1();
    getPlayer2();
    displayController.writeToDom("#player1", getPlayer1().info());
    displayController.writeToDom("#player2", getPlayer2().info());
    displayController.toggleModal();
    gameboardDisplay.render();
  });

  const getPlayer1 = () => Player(getPlayer1Name(), getPlayer1Marker());

  const getPlayer2 = () => Player(getPlayer2Name(), getPlayer2Marker());

  const getPlayer1Name = () => {
    const player1Name = document.querySelector("#player1-name").value;
    return player1Name;
  };

  const getPlayer1Marker = () => {
    const player1Marker = document.querySelector(
      "input[name='mark']:checked"
    ).value;
    return player1Marker;
  };

  const getPlayer2Name = () => {
    const player2Name = "Computer";
    return player2Name;
  };

  const getPlayer2Marker = () => {
    const player1Marker = document.querySelector(
      "input[name='mark']:checked"
    ).value;
    const player2Marker = player1Marker === "X" ? "O" : "X";
    return player2Marker;
  };

  return { getPlayer1, getPlayer2 };
})();

// const createPlayer = (() => {
//   const player1 = Player(modal.getPlayer1Name(), modal.getPlayer1Marker());
//   const player2 = Player(modal.getPlayer2Name(), modal.getPlayer2Marker());
//   displayController.writeToDom("#player1", player1.info());
//   displayController.writeToDom("#player2", player2.info());

//   return { player1, player2 };
// })();

const gameboard = (() => {})();
