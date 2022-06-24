const startGameBtn = document
  .querySelector("#start-btn")
  .addEventListener("click", displayModal);

function displayModal() {
  const modal = document.querySelector("#modal-container");
  modal.style.display = "block";
}
