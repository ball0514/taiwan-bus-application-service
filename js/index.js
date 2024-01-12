const follow = document.querySelector("#follow");
const choose = document.querySelector("#choose");
const bus = document.querySelector("#bus");
const list = document.querySelector(".list");

follow.addEventListener("click", () => {
  follow.classList.add("hidden");
  bus.classList.add("move");
  setTimeout(() => {
    choose.classList.remove("hidden");
  }, 500);
});

choose.addEventListener("click", () => {
  list.classList.remove("hidden");
});

const button = document.querySelectorAll(".city");
button.forEach((button) => {
  button.addEventListener("click", function () {
    let city = this.getAttribute("value");
    this.href = "menu.html?city=" + encodeURIComponent(city);
  });
});
