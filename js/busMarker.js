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

const swap = document.querySelector("#swap");
const start = document.querySelector("#start");
const end = document.querySelector("#end");
swap.addEventListener("click", (e) => {
  e.preventDefault();
  let temp = start.value;
  start.value = end.value;
  end.value = temp;
  // start.value = start.value ^ end.value;
  // end.value = start.value ^ end.value;
  // start.value = start.value ^ end.value;
});

const submit = document.querySelector("#submit");
const startName = document.querySelector("#start");
const endName = document.querySelector("#end");
const noList = document.querySelector(".noList");
const list = document.querySelector(".list");
submit.addEventListener("click", (e) => {
  e.preventDefault();
  list.innerHTML = "";
  GetBusStop();
  const set = new Set();
  busStop.forEach((bus) => {
    let startStop = false;
    let endStop = false;
    bus.Stops.forEach((stop) => {
      // console.log(stop.StopName.Zh_tw);
      if (stop.StopName.Zh_tw == startName.value) {
        startStop = true;
      }
      if (stop.StopName.Zh_tw == endName.value && startStop == true) {
        endStop = true;
      }
    });
    if (startStop == true && endStop == true) {
      set.add(bus.RouteName.Zh_tw);
    }
  });

  console.log(set);
  set.forEach((item) => {
    list.innerHTML += `<div class="item">
                <div class="busName">
                    <img src="./images/Icon/bus-number.svg" />
                    <p class="busName">${item}</p>
                </div>
                <p>${startName.value} - ${endName.value}</p>
              </div>`;
  });
  if (set.size != 0) {
    noList.classList.add("hidden");
    list.classList.remove("hidden");
  } else {
    noList.childNodes[3].innerText = "查無資料";
  }
});
