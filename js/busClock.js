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

const input = document.querySelector("input");
const btn = document.querySelector(".btn").querySelectorAll("button");
const btnSpecial = document.querySelectorAll(".special");
let btnSpecialText = [];
btnSpecial.forEach((text) => {
  btnSpecialText += text.textContent;
});

btn.forEach((btn) => {
  btn.addEventListener("click", function () {
    btnText = this.textContent;
    if (btnText === "取消") {
      input.value = "";
    } else if (btnSpecialText.includes(btnText)) {
      input.value = btnText;
    } else {
      input.value += btnText;
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const noList = document.querySelector(".noList");
  const list = document.querySelector(".list");
  const history = document.querySelector(".history");
  if (!localStorage.getItem("record")) {
    localStorage.setItem("record", "[]");
  }

  const recordList = JSON.parse(localStorage.getItem("record"));
  if (bus == null && recordList.length !== 0) {
    noList.classList.add("hidden");
    list.classList.add("hidden");
    history.classList.remove("hidden");
    recordList.forEach((data) => {
      history.innerHTML += `<button class="item">
      <div class="bus">
        <p class="busName">${data.routeName}</p>
        <p>${data.startName}-${data.endName}</p>
      </div>
      <div class="like"></div>
    </button>`;
    });
  }

  GetApiResponse();
  if (apiget.length !== 0) {
    history.classList.add("hidden");
    noList.classList.add("hidden");
    list.classList.remove("hidden");
  } else if (bus !== null) {
    noList.childNodes[3].innerText = "查無資料";
  }
  apiget.map((data) => {
    // console.log(data);
    list.innerHTML += `<button class="item">
          <div class="bus">
            <p class="busName">${data.RouteName.Zh_tw}</p>
            <p>${data.DepartureStopNameZh}-${data.DestinationStopNameZh}</p>
          </div>
          <div class="like"></div>
        </button>`;
  });

  const index = document.querySelector(".index");
  const detail = document.querySelector(".detail");
  const infoBox = document.querySelector(".infoBox");
  const mapBox = document.querySelector(".mapBox");
  const routeNumber = document.querySelector(".routeNumber");
  const startStop = document.querySelectorAll(".startStop");
  const endStop = document.querySelectorAll(".endStop");
  const line1 = document.querySelectorAll(".line1");
  const line2 = document.querySelectorAll(".line2");
  const item = document.querySelectorAll(".item");
  const forward = document.querySelector(".forward");
  const backward = document.querySelector(".backward");
  let page = "detail";

  startStop[0].addEventListener("click", () => {
    startStop[0].classList.add("visible");
    endStop[0].classList.remove("visible");
    forward.classList.remove("hidden");
    backward.classList.add("hidden");
    line1[0].classList.add("selected");
    line2[0].classList.remove("selected");
  });

  endStop[0].addEventListener("click", () => {
    startStop[0].classList.remove("visible");
    endStop[0].classList.add("visible");
    forward.classList.add("hidden");
    backward.classList.remove("hidden");
    line1[0].classList.remove("selected");
    line2[0].classList.add("selected");
  });

  let forwardlength = 0;
  let forwardStops = [];
  let backwardlength = 0;
  let backwardStops = [];
  item.forEach((bus) => {
    bus.addEventListener("click", () => {
      index.classList.add("hidden");
      detail.classList.remove("hidden");
      startStop[0].classList.add("visible");
      endStop[0].classList.remove("visible");
      forward.classList.remove("hidden");
      backward.classList.add("hidden");
      line1[0].classList.add("selected");
      line2[0].classList.remove("selected");
      const mark = bus.querySelectorAll("p")[1].textContent.indexOf("-");
      const routeName = bus.querySelectorAll("p")[0].textContent;
      const startName = bus.querySelectorAll("p")[1].textContent.slice(0, mark);
      const endName = bus.querySelectorAll("p")[1].textContent.slice(mark + 1);
      localStorage.setItem("routeName", routeName);
      let recordFilter = new Set();
      let record = JSON.parse(localStorage.getItem("record"));
      record.unshift({ routeName, startName, endName });
      const recordResult = record.filter((item) =>
        !recordFilter.has(item.routeName)
          ? recordFilter.add(item.routeName)
          : false
      );
      record = Array.from(recordResult);
      localStorage.setItem("record", JSON.stringify(record));

      GetRouteStop();
      GetDynamic();
      dynamic.forEach((data) => {
        routeStop.forEach((bus) => {
          bus.Stops.forEach((stop) => {
            if (data.StopName.Zh_tw == stop.StopName.Zh_tw) {
              stop.EstimateTime = Math.floor(data.EstimateTime / 60);
              if (!stop.EstimateTime) {
                stop.EstimateTime = "未發車";
              } else if (stop.EstimateTime < 2) {
                stop.EstimateTime = "進站中";
              } else {
                stop.EstimateTime = `${stop.EstimateTime}分`;
              }
            }
          });
        });
      });

      routeStop.forEach((stop) => {
        if (stop.Direction == 0 && stop.Stops.length > forwardlength) {
          forwardStops = stop.Stops;
        } else if (stop.Direction == 1 && stop.Stops.length > backwardlength) {
          backwardStops = stop.Stops;
        }
      });
      console.log(forwardStops);
      console.log(backwardStops);

      const end = bus.querySelectorAll("p")[1].textContent.slice(0, mark);
      const start = bus.querySelectorAll("p")[1].textContent.slice(mark + 1);
      routeNumber.innerText = routeName;
      startStop.forEach((startStop) => {
        startStop.innerText = `往 ${start}`;
      });
      endStop.forEach((endStop) => {
        endStop.innerText = `往 ${end}`;
      });

      forward.innerHTML = "";
      forwardStops.forEach((data, index) => {
        if (data.EstimateTime == undefined) {
          forward.innerHTML += `<div class="route">
          <div class="time nogo">讀取中</div>
          <div>${data.StopName.Zh_tw}</div>
          <span></span>
          <div class="straight"></div>
        </div>`;
        } else if (data.EstimateTime == "未發車") {
          forward.innerHTML += `<div class="route">
            <div class="time nogo">${data.EstimateTime}</div>
            <div>${data.StopName.Zh_tw}</div>
            <span></span>
            <div class="straight"></div>
          </div>`;
        } else if (data.EstimateTime == "進站中") {
          forward.innerHTML += `<div class="route">
            <div class="time coming">${data.EstimateTime}</div>
            <div>${data.StopName.Zh_tw}</div>
            <span></span>
            <div class="straight"></div>
          </div>`;
        } else {
          forward.innerHTML += `<div class="route">
            <div class="time">${data.EstimateTime}</div>
            <div>${data.StopName.Zh_tw}</div>
            <span></span>
            <div class="straight"></div>
          </div>`;
        }
        if (index === 0) {
          document.querySelectorAll(".straight")[index].classList.add("first");
        } else if (index === forwardStops.length - 1) {
          document.querySelectorAll(".straight")[index].classList.add("last");
        }
      });

      backward.innerHTML = "";
      backwardStops.forEach((data, index) => {
        if (data.EstimateTime == undefined) {
          backward.innerHTML += `<div class="route">
          <div class="time nogo">讀取中</div>
          <div>${data.StopName.Zh_tw}</div>
          <span></span>
          <div class="straight"></div>
        </div>`;
        } else if (data.EstimateTime == "未發車") {
          backward.innerHTML += `<div class="route">
        <div class="time nogo">${data.EstimateTime}</div>
            <div>${data.StopName.Zh_tw}</div>
            <span></span>
            <div class="straight"></div>
          </div>`;
        } else if (data.EstimateTime == "進站中") {
          backward.innerHTML += `<div class="route">
            <div class="time coming">${data.EstimateTime}</div>
            <div>${data.StopName.Zh_tw}</div>
            <span></span>
            <div class="straight"></div>
          </div>`;
        } else {
          backward.innerHTML += `<div class="route">
            <div class="time">${data.EstimateTime}</div>
            <div>${data.StopName.Zh_tw}</div>
            <span></span>
            <div class="straight"></div>
          </div>`;
        }
        if (index === 0) {
          document
            .querySelectorAll(".straight")
            [forwardStops.length].classList.add("first");
        } else if (index === backwardStops.length - 1) {
          document
            .querySelectorAll(".straight")
            [forwardStops.length + backwardStops.length - 1].classList.add(
              "last"
            );
        }
      });
    });
  });

  if (!localStorage.getItem("bus")) {
    localStorage.setItem("bus", "[]");
  }
  const like = document.querySelectorAll(".like");
  like.forEach((like) => {
    like.addEventListener("click", (e) => {
      e.stopPropagation();
      like.classList.toggle("love");
      const busName =
        like.parentElement.childNodes[1].childNodes[1].textContent;
      const route = like.parentElement.childNodes[1].childNodes[3].textContent;
      let busListFilter = new Set();
      let busList = JSON.parse(localStorage.getItem("bus"));
      busList.unshift({ busName, route });
      const busListResult = busList.filter((item) =>
        !busListFilter.has(item.busName)
          ? busListFilter.add(item.busName)
          : false
      );
      busList = Array.from(busListResult);
      // if (!busList.some((item) => item.busName === busName)) {
      //   busList.push({ busName, route });
      // } else {
      //   busList = busList.filter((item) => item.busName !== busName);
      // }
      localStorage.setItem("bus", JSON.stringify(busList));
    });
  });

  const backIndex = document.querySelector(".arrow-index");
  backIndex.addEventListener("click", () => {
    index.classList.remove("hidden");
    detail.classList.add("hidden");
    infoBox.classList.add("hidden");
    mapBox.classList.add("hidden");
  });

  const backDetail = document.querySelectorAll(".arrow-detail");
  backDetail.forEach((back) => {
    back.addEventListener("click", () => {
      index.classList.add("hidden");
      detail.classList.remove("hidden");
      infoBox.classList.add("hidden");
      mapBox.classList.add("hidden");
      page = "detail";
    });
  });

  const back = document.querySelectorAll(".arrow-back");
  back.forEach((back) => {
    back.addEventListener("click", () => {
      if (page == "detail") {
        index.classList.add("hidden");
        detail.classList.remove("hidden");
        infoBox.classList.add("hidden");
        mapBox.classList.add("hidden");
        page = "detail";
      } else if (page == "info") {
        index.classList.add("hidden");
        detail.classList.add("hidden");
        infoBox.classList.remove("hidden");
        mapBox.classList.add("hidden");
        page = "info";
      }
    });
  });

  const info = document.querySelectorAll(".info");
  info.forEach((info) => {
    info.addEventListener("click", () => {
      index.classList.add("hidden");
      detail.classList.add("hidden");
      infoBox.classList.remove("hidden");
      mapBox.classList.add("hidden");
      page = "info";
      let direction = 0;

      startStop[1].addEventListener("click", () => {
        startStop[1].classList.add("visible");
        endStop[1].classList.remove("visible");
        forward.classList.remove("hidden");
        backward.classList.add("hidden");
        line1[1].classList.add("selected");
        line2[1].classList.remove("selected");
        direction = 0;
        displaySchdule();
      });

      endStop[1].addEventListener("click", () => {
        startStop[1].classList.remove("visible");
        endStop[1].classList.add("visible");
        forward.classList.add("hidden");
        backward.classList.remove("hidden");
        line1[1].classList.remove("selected");
        line2[1].classList.add("selected");
        direction = 1;
        displaySchdule();
      });

      GetSchedule();
      const date = document.querySelector(".date");
      const am = document.querySelector(".am");
      const pm = document.querySelector(".pm");

      if (date.value != "") {
        displaySchdule();
      }

      date.addEventListener("change", () => {
        displaySchdule();
      });
      function displaySchdule() {
        am.innerHTML = '<p class="title">上午</p>';
        pm.innerHTML = '<p class="title">下午</p>';
        console.log(date.value);
        const selectedDate = new Date(date.value);
        const dayOfWeek = selectedDate.getDay();
        const daysOfWeek = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        const dayName = daysOfWeek[dayOfWeek];

        let forwardTimeList = new Set();
        let orderForwardTimeList = [];
        let backwardTimeList = new Set();
        let orderBackwardTimeList = [];
        schedule.forEach((bus) => {
          if (bus.Direction == 0) {
            bus.Timetables?.forEach((day) => {
              if (day.ServiceDay[dayName] == 0) {
                day.StopTimes.forEach((time) => {
                  // if (time.StopID == goForward.StopID) {
                  // forwardTimeList.push(time.ArrivalTime);
                  forwardTimeList.add(time.ArrivalTime);
                  // }
                });
              }
            });
          } else if (bus.Direction == 1) {
            bus.Timetables?.forEach((day) => {
              if (day.ServiceDay[dayName] == 0) {
                day.StopTimes.forEach((time) => {
                  // if (time.StopID == goBackward.StopID) {
                  // backwardTimeList.push(time.ArrivalTime);
                  backwardTimeList.add(time.ArrivalTime);
                  // }
                });
              }
            });
          }
        });
        orderForwardTimeList = Array.from(forwardTimeList).sort();
        orderBackwardTimeList = Array.from(backwardTimeList).sort();

        if (direction == 0) {
          console.log(direction);

          orderForwardTimeList.forEach((time) => {
            if (time < "12:00") {
              am.innerHTML += `<p>${time}</p>`;
            } else {
              pm.innerHTML += `<p>${time}</p>`;
            }
          });
        } else if (direction == 1) {
          console.log(direction);
          orderBackwardTimeList.forEach((time) => {
            if (time < "12:00") {
              am.innerHTML += `<p>${time}</p>`;
            } else {
              pm.innerHTML += `<p>${time}</p>`;
            }
          });
        }

        console.log(orderForwardTimeList, orderBackwardTimeList);
      }
    });
  });

  const map = document.querySelectorAll(".map");
  // const iframe = document.querySelector("iframe");
  const forwardMap = document.querySelector(".forwardMap");
  const backwardMap = document.querySelector(".backwardMap");
  map.forEach((map) => {
    map.addEventListener("click", () => {
      index.classList.add("hidden");
      detail.classList.add("hidden");
      infoBox.classList.add("hidden");
      mapBox.classList.remove("hidden");
      // GetRouteStop();
      // let forwardlength = 0;
      // let forwardStops = [];
      // let backwardlength = 0;
      // let backwardStops = [];

      startStop[2].addEventListener("click", () => {
        startStop[2].classList.add("visible");
        endStop[2].classList.remove("visible");
        forwardMap.classList.remove("hidden");
        backwardMap.classList.add("hidden");
        line1[2].classList.add("selected");
        line2[2].classList.remove("selected");
      });

      endStop[2].addEventListener("click", () => {
        startStop[2].classList.remove("visible");
        endStop[2].classList.add("visible");
        forwardMap.classList.add("hidden");
        backwardMap.classList.remove("hidden");
        line1[2].classList.remove("selected");
        line2[2].classList.add("selected");
      });

      routeStop.forEach((stop) => {
        if (stop.Direction == 0 && stop.Stops.length > forwardlength) {
          forwardStops = stop.Stops;
        } else if (stop.Direction == 1 && stop.Stops.length > backwardlength) {
          backwardStops = stop.Stops;
        }
      });
      let forwardWaypoints = [];
      forwardStops.forEach((stop, index) => {
        if (
          index > 0 &&
          ((forwardStops.length > 28 && index < 26) ||
            (forwardStops.length <= 27 && index < forwardStops.length - 1))
        ) {
          forwardWaypoints.push({
            location: {
              lat: stop.StopPosition.PositionLat,
              lng: stop.StopPosition.PositionLon,
            },
            stopover: true,
          });
        }
      });
      let backwardWaypoints = [];
      backwardStops.forEach((stop, index) => {
        if (
          index > 0 &&
          ((backwardStops.length > 28 && index < 26) ||
            (backwardStops.length <= 27 && index < backwardStops.length - 1))
        ) {
          backwardWaypoints.push({
            location: {
              lat: stop.StopPosition.PositionLat,
              lng: stop.StopPosition.PositionLon,
            },
            stopover: true,
          });
        }
      });

      // let style = "";
      // forwardStops.forEach((data) => {
      //   style += `markers=size:small|color:0x997e5f|${data}`;
      // });

      let directionsService = new google.maps.DirectionsService();
      let forwardDirectionsRenderer = new google.maps.DirectionsRenderer({
        markerOptions: {
          // icon: "./images/Icon/position.svg",
        },
        polylineOptions: {
          strokeColor: "#6F5B44",
          strokeWeight: 5,
        },
        suppressMarkers: true,
      });
      let backwardDirectionsRenderer = new google.maps.DirectionsRenderer({
        markerOptions: {
          // icon: "./images/Icon/position.svg",
        },
        polylineOptions: {
          strokeColor: "#6F5B44",
          strokeWeight: 5,
        },
        suppressMarkers: true,
      });

      let forwardRequest = {
        origin: {
          lat: forwardStops[0].StopPosition.PositionLat,
          lng: forwardStops[0].StopPosition.PositionLon,
        },
        destination: {
          lat: forwardStops[forwardStops.length - 1].StopPosition.PositionLat,
          lng: forwardStops[forwardStops.length - 1].StopPosition.PositionLon,
        },
        waypoints: forwardWaypoints,
        travelMode: "WALKING",
        // transitOptions: {
        //   modes: ["BUS"],
        // },
      };
      let backwardRequest = {
        origin: {
          lat: backwardStops[0].StopPosition.PositionLat,
          lng: backwardStops[0].StopPosition.PositionLon,
        },
        destination: {
          lat: backwardStops[forwardStops.length - 1].StopPosition.PositionLat,
          lng: backwardStops[forwardStops.length - 1].StopPosition.PositionLon,
        },
        waypoints: backwardWaypoints,
        travelMode: "WALKING",
        // transitOptions: {
        //   modes: ["BUS"],
        // },
      };

      const forMap = new google.maps.Map(forwardMap, {
        // zoom: 7,
        // center: { lat: 23.5, lng: 122.5 },
      });

      forwardDirectionsRenderer.setMap(forMap);

      directionsService.route(forwardRequest, function (response) {
        console.log(response);
        forwardDirectionsRenderer.setDirections(response);

        forwardStops.forEach((stop, index) => {
          const marker = new google.maps.Marker({
            position: {
              lat: stop.StopPosition.PositionLat,
              lng: stop.StopPosition.PositionLon,
            },
            map: forMap,
            icon: {
              url: "./images/Icon/position-list.svg",
              scaledSize: new google.maps.Size(36, 36), // 圖示的大小
            },
            label: {
              text: (index + 1).toString(), // 將標籤設為順序數字
              color: "white", // 標籤文字顏色
            },
          });
        });
      });

      const backMap = new google.maps.Map(backwardMap, {
        // zoom: 7,
        // center: { lat: 23.5, lng: 122.5 },
      });

      backwardDirectionsRenderer.setMap(backMap);

      directionsService.route(backwardRequest, function (response) {
        console.log(response);
        backwardDirectionsRenderer.setDirections(response);

        backwardStops.forEach((stop, index) => {
          const marker = new google.maps.Marker({
            position: {
              lat: stop.StopPosition.PositionLat,
              lng: stop.StopPosition.PositionLon,
            },
            map: backMap,
            icon: {
              url: "./images/Icon/position-list.svg",
              scaledSize: new google.maps.Size(36, 36), // 圖示的大小
            },
            label: {
              text: (index + 1).toString(), // 將標籤設為順序數字
              color: "white", // 標籤文字顏色
            },
          });
        });
      });

      // iframe.src = `https://www.google.com/maps/embed/v1/directions?key=AIzaSyBISS9br35us617Ebg6dcw0OMgR767FP-U&origin=${
      //   forwardStops[0].StopPosition.PositionLat
      // }+${forwardStops[0].StopPosition.PositionLon}&destination=${
      //   forwardStops[forwardStops.length - 1].StopPosition.PositionLat
      // }+${
      //   forwardStops[forwardStops.length - 1].StopPosition.PositionLon
      // }&waypoints=${forwardWaypoints}&mode=transit&avoid=tolls|highways`;
    });
  });
});
