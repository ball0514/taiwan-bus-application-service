let token = "";

$(function () {
  GetAuthorizationHeader();
});

function GetAuthorizationHeader() {
  const parameter = {
    grant_type: "client_credentials",
    client_id: "ball070428-909dbc5f-529f-4e9e",
    client_secret: "415c0c41-b817-4f8e-a4b2-7971dcb1d681",
  };

  let auth_url =
    "https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token";

  $.ajax({
    type: "POST",
    url: auth_url,
    crossDomain: true,
    dataType: "JSON",
    data: parameter,
    async: false,
    success: function (data) {
      // $("#accesstoken").text(JSON.stringify(data));
      token = JSON.stringify(data);
    },
    error: function (xhr, textStatus, thrownError) {},
  });
}

let city = localStorage.getItem("city");
const cityMapping = {
  台北市: "Taipei",
  新北市: "NewTaipei",
  新竹市: "Hsinchu",
  新竹縣: "HsinchuCounty",
  苗栗縣: "MiaoliCounty",
  彰化縣: "ChanghuaCounty",
  南投縣: "NantouCounty",
  雲林縣: "YunlinCounty",
  嘉義縣: "ChiayiCounty",
  嘉義市: "Chiayi",
  屏東縣: "PingtungCounty",
  宜蘭縣: "YilanCounty",
  花蓮縣: "HualienCounty",
  臺東縣: "TaitungCounty",
  // 澎湖縣: "PenghuCounty",
  // 基隆市: "Keelung",
};

let apiget = [];
function GetApiResponse() {
  //   let accesstokenStr = $("#accesstoken").text();
  //   let accesstoken = JSON.parse(accesstokenStr);
  let accesstoken = JSON.parse(token);

  if (accesstoken != undefined) {
    $.ajax({
      type: "GET",
      url: `https://tdx.transportdata.tw/api/basic/v2/Bus/Route/City/${cityMapping[city]}/${bus}?%24format=JSON`,
      headers: {
        authorization: "Bearer " + accesstoken.access_token,
      },
      async: false,
      success: function (Data) {
        // $("#apiresponse").text(JSON.stringify(Data));
        console.log("Data", Data);
        apiget = Data;
      },
      error: function (xhr, textStatus, thrownError) {
        console.log("errorStatus:", textStatus);
        console.log("Error:", thrownError);
      },
    });
  }
}

let dynamic = [];
function GetDynamic() {
  let routeName = localStorage.getItem("routeName");
  let accesstoken = JSON.parse(token);
  console.log(routeName);

  if (accesstoken != undefined) {
    $.ajax({
      type: "GET",
      url: `https://tdx.transportdata.tw/api/basic/v2/Bus/EstimatedTimeOfArrival/City/${cityMapping[city]}/${routeName}?%24format=JSON`,
      headers: {
        authorization: "Bearer " + accesstoken.access_token,
      },
      async: false,
      success: function (Data) {
        console.log("Data", Data);
        dynamic = Data;
      },
      error: function (xhr, textStatus, thrownError) {
        console.log("errorStatus:", textStatus);
        console.log("Error:", thrownError);
      },
    });
  }
}

let schedule = [];
function GetSchedule() {
  let routeName = localStorage.getItem("routeName");
  let accesstoken = JSON.parse(token);

  if (accesstoken != undefined) {
    $.ajax({
      type: "GET",
      url: `https://tdx.transportdata.tw/api/basic/v2/Bus/Schedule/City/${cityMapping[city]}/${routeName}?&%24format=JSON`,
      headers: {
        authorization: "Bearer " + accesstoken.access_token,
      },
      async: false,
      success: function (Data) {
        console.log("Data", Data);
        schedule = Data;
      },
      error: function (xhr, textStatus, thrownError) {
        console.log("errorStatus:", textStatus);
        console.log("Error:", thrownError);
      },
    });
  }
}

let routeStop = [];
function GetRouteStop() {
  let routeName = localStorage.getItem("routeName");
  let accesstoken = JSON.parse(token);

  if (accesstoken != undefined) {
    $.ajax({
      type: "GET",
      url: `https://tdx.transportdata.tw/api/basic/v2/Bus/StopOfRoute/City/${cityMapping[city]}/${routeName}?%24format=JSON`,
      headers: {
        authorization: "Bearer " + accesstoken.access_token,
      },
      async: false,
      success: function (Data) {
        console.log("Data", Data);
        routeStop = Data;
      },
      error: function (xhr, textStatus, thrownError) {
        console.log("errorStatus:", textStatus);
        console.log("Error:", thrownError);
      },
    });
  }
}

let busStop = [];
function GetBusStop() {
  let accesstoken = JSON.parse(token);

  if (accesstoken != undefined) {
    $.ajax({
      type: "GET",
      url: `https://tdx.transportdata.tw/api/basic/v2/Bus/StopOfRoute/City/${cityMapping[city]}?%24format=JSON`,
      headers: {
        authorization: "Bearer " + accesstoken.access_token,
      },
      async: false,
      success: function (Data) {
        console.log("Data", Data);
        busStop = Data;
      },
      error: function (xhr, textStatus, thrownError) {
        console.log("errorStatus:", textStatus);
        console.log("Error:", thrownError);
      },
    });
  }
}

let nearby = [];
function GetNearBy(latitude, longitude) {
  let accesstoken = JSON.parse(token);

  if (accesstoken != undefined) {
    $.ajax({
      type: "GET",
      url: `https://tdx.transportdata.tw/api/advanced/v2/Bus/Stop/NearBy?%24spatialFilter=nearby%28${latitude}%2C%20${longitude}%2C%20200%29&%24format=JSON`,
      headers: {
        authorization: "Bearer " + accesstoken.access_token,
      },
      async: false,
      success: function (Data) {
        console.log("Data", Data);
        nearby = Data;
      },
      error: function (xhr, textStatus, thrownError) {
        console.log("errorStatus:", textStatus);
        console.log("Error:", thrownError);
      },
    });
  }
}

let cityBus = [];
function GetCityBus() {
  let accesstoken = JSON.parse(token);

  if (accesstoken != undefined) {
    $.ajax({
      type: "GET",
      url: `https://tdx.transportdata.tw/api/basic/v2/Bus/Route/City/${cityMapping[city]}?%24format=JSON`,
      headers: {
        authorization: "Bearer " + accesstoken.access_token,
      },
      async: false,
      success: function (Data) {
        console.log("Data", Data);
        cityBus = Data;
      },
      error: function (xhr, textStatus, thrownError) {
        console.log("errorStatus:", textStatus);
        console.log("Error:", thrownError);
      },
    });
  }
}

let price = [];
function GetPrice() {
  let routeName = localStorage.getItem("routeName");
  let accesstoken = JSON.parse(token);

  if (accesstoken != undefined) {
    $.ajax({
      type: "GET",
      url: `https://tdx.transportdata.tw/api/basic/v2/Bus/RouteFare/City/${cityMapping[city]}/${routeName}?%24format=JSON`,
      headers: {
        authorization: "Bearer " + accesstoken.access_token,
      },
      async: false,
      success: function (Data) {
        console.log("Data", Data);
        price = Data;
      },
      error: function (xhr, textStatus, thrownError) {
        console.log("errorStatus:", textStatus);
        console.log("Error:", thrownError);
      },
    });
  }
}
