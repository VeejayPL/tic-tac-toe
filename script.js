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
    toggleModal();
  });

  closeBtn.addEventListener("click", (e) => toggleModal());

  resetButton.addEventListener("click", (e) => {
    gameboard.reset();
    gameController.reset();
    gameboardDisplay.update();
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
  const board = document.querySelector("#gameboard");

  const render = () => {
    if (board.innerHTML !== "") return;
    for (let i = 0; i < 9; i++) {
      const field = document.createElement("div");
      field.classList.add("field");
      field.setAttribute("data-index", [i]);
      field.addEventListener("click", (e) => {
        if (gameController.getIsOver() || e.target.textContent !== "") return;
        gameController.playRound(parseInt(e.target.dataset.index));
        update();
      });
      board.appendChild(field);
    }
  };
  const clear = () => {
    if (board.innerHTML === "") return;
    for (let i = 0; i < 9; i++) {
      const field = document.querySelector(".field");
      board.removeChild(field);
    }
  };
  const update = () => {
    if (board.innerHTML === "") return;
    for (let i = 0; i < 9; i++) {
      const fields = document.querySelectorAll(".field");
      fields[i].textContent = gameboard.getField(i);
    }
  };

  return { render, clear, update };
})();

const modal = (() => {
  const startBtn = document.querySelector("#modal-btn");

  startBtn.addEventListener("click", (e) => {
    gameboardDisplay.clear();
    gameboard.reset();
    gameController.reset();
    getPlayer1Name();
    getPlayer1Marker();
    getPlayer2Name();
    getPlayer2Marker();
    getPlayer1();
    getPlayer2();
    displayController.writeToDom("#player1", getPlayer1().info());
    displayController.writeToDom("#player2", getPlayer2().info());
    displayController.writeToDom("#info", `${getPlayer1().getName()}'s turn`);
    displayController.toggleModal();
    gameboardDisplay.render();
  });

  const getPlayer1 = () =>
    Player(getPlayer1Name() || "Player", getPlayer1Marker());

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

const gameboard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const setField = (index, marker) => {
    if (index > board.length) return;
    board[index] = marker;
  };
  const getField = (index) => {
    if (index > board.length) return;
    return board[index];
  };
  const reset = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
    displayController.writeToDom(
      "#info",
      `${modal.getPlayer1().getName()}'s turn`
    );
  };

  return { setField, getField, reset };
})();

const gameController = (() => {
  let round = 1;
  let isOver = false;
  const playRound = (index) => {
    gameboard.setField(index, getCurrentPlayerMarker());
    if (checkWinner(index)) {
      displayController.writeToDom(
        "#info",
        `${getCurrentPlayerName()} has won`
      );
      isOver = true;
      return;
    }
    if (round === 9) {
      displayController.writeToDom("#info", "It's a draw");
      isOver = true;
      return;
    }
    round++;
    displayController.writeToDom("#info", `${getCurrentPlayerName()}'s turn`);
  };

  const getCurrentPlayerName = () =>
    round % 2 === 1
      ? modal.getPlayer1().getName()
      : modal.getPlayer2().getName();

  const getCurrentPlayerMarker = () =>
    round % 2 === 1
      ? modal.getPlayer1().getMarker()
      : modal.getPlayer2().getMarker();

  const checkWinner = (index) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winConditions
      .filter((combination) => combination.includes(index))
      .some((possibleCombination) =>
        possibleCombination.every(
          (index) => gameboard.getField(index) === getCurrentPlayerMarker()
        )
      );
  };

  const getIsOver = () => {
    return isOver;
  };

  const reset = () => {
    round = 1;
    isOver = false;
  };

  return { playRound, getIsOver, reset };
})();
