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

const submit = document.querySelector("#submit");
const input = document.querySelector("input");
const position = document.querySelector("#position");
const list = document.querySelector(".list");
const noList = document.querySelector(".noList");
const googleMap = document.querySelector(".googleMap");

const local = new google.maps.places.Autocomplete(input);

let stopList = [];

local.addListener("place_changed", function () {
  const place = local.getPlace();

  latitude = place.geometry.location.lat();
  longitude = place.geometry.location.lng();
  GetNearBy(latitude, longitude);
  list.innerHTML = "";
  const stopName = new Set();
  if (nearby.length !== 0) {
    nearby.forEach((stop) => {
      stopName.add(stop.StopName.Zh_tw);
    });
    stopName.forEach((item) => {
      list.innerHTML += `<div class="item">
                <img src="./images/Icon/bus-stop.svg" />
                <p class="busName">${item}</p>
                <button class="like"></button>
            </div>`;
    });
  }
  list.classList.remove("hidden");
  noList.classList.add("hidden");
  googleMap.classList.remove("hidden");
  const map = new google.maps.Map(document.querySelector(".googleMap"), {
    center: { lat: latitude, lng: longitude },
    zoom: 17,
  });
  const icon = {
    url: "./images/Icon/position.svg",
  };
  nearby.forEach((stop) => {
    const marker = new google.maps.Marker({
      map: map,
      position: {
        lat: stop.StopPosition.PositionLat,
        lng: stop.StopPosition.PositionLon,
      },
      icon: icon,
    });
  });

  const like = document.querySelectorAll(".like");
  like.forEach((like) => {
    like.addEventListener("click", () => {
      let stopName = like.parentElement.childNodes[3].textContent;
      like.classList.toggle("love");
      if (!stopList.includes(stopName)) {
        stopList.push(stopName);
      } else {
        stopList = stopList.filter((item) => item !== stopName);
      }
      localStorage.setItem("stop", JSON.stringify(stopList));
    });
  });
});

submit.addEventListener("click", (e) => {
  e.preventDefault();
  GetNearBy(latitude, longitude);
  list.innerHTML = "";
  const stopName = new Set();
  if (nearby.length !== 0) {
    nearby.forEach((stop) => {
      stopName.add(stop.StopName.Zh_tw);
    });
    stopName.forEach((item) => {
      list.innerHTML += `<div class="item">
                <img src="./images/Icon/bus-stop.svg" />
                <p class="busName">${item}</p>
                <button class="like"></button>
            </div>`;
    });
  }
  list.classList.remove("hidden");
  noList.classList.add("hidden");
  googleMap.classList.remove("hidden");
  const map = new google.maps.Map(document.querySelector(".googleMap"), {
    center: { lat: latitude, lng: longitude },
    zoom: 17,
  });
  const icon = {
    url: "./images/Icon/position.svg",
  };
  nearby.forEach((stop) => {
    const marker = new google.maps.Marker({
      map: map,
      position: {
        lat: stop.StopPosition.PositionLat,
        lng: stop.StopPosition.PositionLon,
      },
      icon: icon,
    });
  });

  // let stopList = [];
  const like = document.querySelectorAll(".like");
  like.forEach((like) => {
    like.addEventListener("click", () => {
      let stopName = like.parentElement.childNodes[3].textContent;
      like.classList.toggle("love");
      if (!stopList.includes(stopName)) {
        stopList.push(stopName);
      } else {
        stopList = stopList.filter((item) => item !== stopName);
      }
      localStorage.setItem("stop", JSON.stringify(stopList));
    });
  });
});

position.addEventListener("click", () => {
  //   askForLocationPermission();
  let latitude = "";
  let longitude = "";
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      // 成功獲取位置
      function (position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        GetNearBy(latitude, longitude);
        list.innerHTML = "";
        const stopName = new Set();
        if (nearby.length !== 0) {
          nearby.forEach((stop) => {
            stopName.add(stop.StopName.Zh_tw);
          });
          stopName.forEach((item) => {
            list.innerHTML += `<div class="item">
                <img src="./images/Icon/bus-stop.svg" />
                <p class="busName">${item}</p>
                <button class="like"></button>
            </div>`;
          });
        }
        list.classList.remove("hidden");
        noList.classList.add("hidden");
        googleMap.classList.remove("hidden");
        const map = new google.maps.Map(document.querySelector(".googleMap"), {
          center: { lat: latitude, lng: longitude },
          zoom: 17,
        });
        const icon = {
          url: "./images/Icon/position.svg",
        };
        nearby.forEach((stop) => {
          const marker = new google.maps.Marker({
            map: map,
            position: {
              lat: stop.StopPosition.PositionLat,
              lng: stop.StopPosition.PositionLon,
            },
            icon: icon,
          });
        });

        // let stopList = [];
        const like = document.querySelectorAll(".like");
        like.forEach((like) => {
          like.addEventListener("click", () => {
            let stopName = like.parentElement.childNodes[3].textContent;
            like.classList.toggle("love");
            if (!stopList.includes(stopName)) {
              stopList.push(stopName);
            } else {
              stopList = stopList.filter((item) => item !== stopName);
            }
            localStorage.setItem("stop", JSON.stringify(stopList));
          });
        });
      },
      // 獲取位置失败
      function (error) {
        alert("需要先開啟定位才能使用此功能唷");
      }
    );
  } else {
    // 如果瀏覽器不支持 Geolocation API
    alert("Geolocation is not supported by your browser");
  }
});
