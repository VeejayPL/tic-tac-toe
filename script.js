const startGameBtn = document
  .querySelector("#start-btn")
  .addEventListener("click", displayModal);

function displayModal() {
  const modal = document.querySelector("#modal-container");
  modal.style.display = "block";

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
