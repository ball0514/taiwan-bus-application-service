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

document.addEventListener("DOMContentLoaded", function () {
  GetCityBus();
  const bus = document.querySelector("#bus");
  const start = document.querySelector("#start");
  const end = document.querySelector("#end");
  const warm = document.querySelector(".warm");
  cityBus.forEach((item) => {
    bus.innerHTML += `<option value="${item.RouteName.Zh_tw}">${item.RouteName.Zh_tw}</option>`;
  });
  bus.addEventListener("change", () => {
    localStorage.setItem("routeName", bus.value);
    GetRouteStop();
    const stop = new Set();
    routeStop.forEach((item) => {
      item.Stops.forEach((element) => {
        stop.add(element.StopName.Zh_tw);
      });
    });
    stop.forEach((stopName) => {
      start.innerHTML += `<option value="${stopName}">${stopName}</option>`;
      end.innerHTML += `<option value="${stopName}">${stopName}</option>`;
    });
  });
  const submit = document.querySelector("#submit");
  submit.addEventListener("click", (e) => {
    if (bus.value == "") {
      warm.classList.remove("hidden");
      const cross = document.querySelector(".cross");
      cross.addEventListener("click", () => {
        warm.classList.add("hidden");
      });
      setTimeout(() => {
        warm.classList.add("out");
        setTimeout(() => {
          warm.classList.add("hidden");
          warm.classList.remove("out");
        }, 500);
      }, 2000);
    } else if (start.value == "" || end.value == "") {
      warm.childNodes[3].innerHTML = "請先選擇路線";
      warm.classList.remove("hidden");
      const cross = document.querySelector(".cross");
      cross.addEventListener("click", () => {
        warm.classList.add("hidden");
      });
      setTimeout(() => {
        warm.classList.add("out");
        setTimeout(() => {
          warm.classList.add("hidden");
          warm.classList.remove("out");
        }, 500);
      }, 2000);
    } else {
      e.preventDefault();
      GetPrice();
      if (price.length != 0) {
        const noList = document.querySelector(".noList");
        const list = document.querySelector(".list");
        noList.classList.add("hidden");
        list.classList.remove("hidden");
        let allCash = 0;
        let halfCash = 0;
        let allCard = 0;
        let halfCard = 0;
        let studentCard = 0;
        price[0].SectionFares[0].Fares.forEach((money) => {
          if (money.TicketType == 1 && money.FareClass == 1) {
            allCash = money.Price;
          } else if (money.TicketType == 1 && money.FareClass == 3) {
            halfCash = money.Price;
          } else if (money.TicketType == 3 && money.FareClass == 1) {
            allCard = money.Price;
          } else if (money.TicketType == 3 && money.FareClass == 3) {
            halfCard = money.Price;
          } else if (money.TicketType == 3 && money.FareClass == 2) {
            studentCard = money.Price;
          }
        });
        list.innerHTML = `<div>
              <div class="price cash"><img src="./images/Icon/cash.svg" alt="">現金支付</div>
              <ul>
                  <li><span>全票</span><img src="./images/Icon/coin.svg" alt="">${allCash}</li>
                  <li><span>半票</span><img src="./images/Icon/coin.svg" alt="">${halfCash}</li>
              </ul>
          </div>
          <div>
              <div class="price card"><img src="./images/Icon/card.svg" alt="">電子票證</div>
              <ul>
                  <li><span>全票</span><img src="./images/Icon/coin.svg" alt="">${allCard}</li>
                  <li><span>半票</span><img src="./images/Icon/coin.svg" alt="">${halfCard}</li>
                  <li><span>學生票</span><img src="./images/Icon/coin.svg" alt="">${studentCard}</li>
              </ul>
          </div>`;
      }
    }
  });

  start.addEventListener("click", () => {
    if (bus.value == "") {
      warm.classList.remove("hidden");
      const cross = document.querySelector(".cross");
      cross.addEventListener("click", () => {
        warm.classList.add("hidden");
      });
      setTimeout(() => {
        warm.classList.add("out");
        setTimeout(() => {
          warm.classList.add("hidden");
          warm.classList.remove("out");
        }, 500);
      }, 2000);
    }
  });
  end.addEventListener("click", () => {
    if (bus.value == "") {
      warm.classList.remove("hidden");
      const cross = document.querySelector(".cross");
      cross.addEventListener("click", () => {
        warm.classList.add("hidden");
      });
      setTimeout(() => {
        warm.classList.add("out");
        setTimeout(() => {
          warm.classList.add("hidden");
          warm.classList.remove("out");
        }, 500);
      }, 2000);
    }
  });
});
