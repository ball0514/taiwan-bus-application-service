const button = document.querySelector("button");
const tip = document.querySelector(".tip");

button.addEventListener("click", () => {
  tip.classList.toggle("hidden");
});
