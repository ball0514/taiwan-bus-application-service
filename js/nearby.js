const submit = document.querySelector("#submit");
const input = document.querySelector("input");
const position = document.querySelector("#position");
const list = document.querySelector(".list");
const noList = document.querySelector(".noList");
const googleMap = document.querySelector(".googleMap");

const local = new google.maps.places.Autocomplete(input);

localStorage.removeItem("stop");
if (!localStorage.getItem(`${cityMapping[city]} stop`)) {
  localStorage.setItem(`${cityMapping[city]} stop`, "[]");
}
let stopList = JSON.parse(localStorage.getItem(`${cityMapping[city]} stop`));

local.addListener("place_changed", function () {
  const place = local.getPlace();

  latitude = place.geometry.location.lat();
  longitude = place.geometry.location.lng();
  search(latitude, longitude);
});

submit.addEventListener("click", (e) => {
  e.preventDefault();
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
        search(latitude, longitude);
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

function search(latitude, longitude) {
  GetNearBy(latitude, longitude);
  list.innerHTML = "";
  const stopName = new Set();
  if (nearby.length !== 0) {
    nearby.forEach((stop) => {
      stopName.add(stop.StopName.Zh_tw);
    });
    stopName.forEach((item) => {
      if (stopList.some((obj) => obj === item)) {
        list.innerHTML += `<div class="item">
                <img src="./images/Icon/bus-stop.svg" />
                <p class="busName">${item}</p>
                <button class="like love"></button>
            </div>`;
      } else {
        list.innerHTML += `<div class="item">
        <img src="./images/Icon/bus-stop.svg" />
        <p class="busName">${item}</p>
        <button class="like"></button>
    </div>`;
      }
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
        stopList.unshift(stopName);
      } else {
        stopList = stopList.filter((item) => item !== stopName);
      }
      localStorage.setItem(
        `${cityMapping[city]} stop`,
        JSON.stringify(stopList)
      );
    });
  });
}
