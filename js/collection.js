const dot = document.querySelectorAll(".dot");
function loading() {
  dot.forEach((dot, index) => {
    switch (index) {
      case 0:
        setTimeout(() => {
          dot.classList.remove("hidden");
        }, 500);
        break;
      case 1:
        setTimeout(() => {
          dot.classList.remove("hidden");
        }, 1000);
        break;
      case 2:
        setTimeout(() => {
          dot.classList.remove("hidden");
        }, 1500);
        break;
    }
  });
  dot.forEach((dot) => {
    dot.classList.add("hidden");
  });
}
loading();
const repeat = setInterval(loading, 2000);

const stopName = document.querySelector("#stop");
const busName = document.querySelector("#bus");
const noList = document.querySelector(".noList");
const list = document.querySelector(".list");
let page = "stop";

stopName.addEventListener("click", () => {
  stopName.classList.add("hidden");
  busName.classList.remove("hidden");
  stopName.classList.remove("left");
  busName.classList.remove("left");
  stopName.classList.add("right");
  busName.classList.add("right");
  page = "bus";
  mode();
});

busName.addEventListener("click", () => {
  stopName.classList.remove("hidden");
  busName.classList.add("hidden");
  stopName.classList.remove("right");
  busName.classList.remove("right");
  stopName.classList.add("left");
  busName.classList.add("left");
  page = "stop";
  mode();
});

let stopList = JSON.parse(localStorage.getItem("stop"));
let busList = JSON.parse(localStorage.getItem("bus"));

function mode() {
  if (page == "stop") {
    if (stopList == null || stopList.length == 0) {
      noList.classList.remove("hidden");
      list.classList.add("hidden");
      noList.innerHTML =
        '<img src="./images/Icon/favorite.svg" alt="" /><p>目前還沒有收藏任何站牌唷</p>';
    } else {
      list.innerHTML = "";
      stopList.forEach((item) => {
        noList.classList.add("hidden");
        list.classList.remove("hidden");
        list.innerHTML += `<div class="stopItem"><img src="./images/Icon/bus-stop.svg" alt="" /><p>${item}</p><button class="likeStop"></button></div>`;
      });
      const likeStop = document.querySelectorAll(".likeStop");
      likeStop.forEach((like) => {
        like.addEventListener("click", () => {
          let stopName = like.parentElement.childNodes[1].textContent;
          stopList = stopList.filter((item) => item !== stopName);
          localStorage.setItem("stop", JSON.stringify(stopList));
          like.parentElement.classList.add("hidden");
          if (stopList.length == 0) {
            noList.classList.remove("hidden");
            list.classList.add("hidden");
            noList.innerHTML =
              '<img src="./images/Icon/favorite.svg" alt="" /><p>目前還沒有收藏任何站牌唷</p>';
          }
        });
      });
    }
  } else if (page == "bus") {
    if (busList == null || busList.length == 0) {
      noList.classList.remove("hidden");
      list.classList.add("hidden");
      noList.innerHTML =
        '<img src="./images/Icon/favorite.svg" alt="" /><p>目前還沒有收藏任何班次唷</p>';
    } else {
      list.innerHTML = "";
      busList.forEach((item) => {
        noList.classList.add("hidden");
        list.classList.remove("hidden");
        list.innerHTML += `<div class="busItem"><div class="busBox"><p class="busName">${item.busName}</p><p class="route">${item.route}</p></div><button class="likeBus"></button></div>`;
      });
      const likeBus = document.querySelectorAll(".likeBus");
      likeBus.forEach((like) => {
        like.addEventListener("click", () => {
          let busName =
            like.parentElement.childNodes[0].childNodes[0].textContent;
          let route =
            like.parentElement.childNodes[0].childNodes[1].textContent;
          busList = busList.filter((item) => item.busName !== busName);
          localStorage.setItem("bus", JSON.stringify(busList));
          like.parentElement.classList.add("hidden");
          if (busList.length == 0) {
            noList.classList.remove("hidden");
            list.classList.add("hidden");
            noList.innerHTML =
              '<img src="./images/Icon/favorite.svg" alt="" /><p>目前還沒有收藏任何班次唷</p>';
          }
        });
      });
    }
  }
}

mode();
