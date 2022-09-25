import React from "react";
import "./Weather.css";
// 날씨 데이터 URL을 받아오는 함수.
function getUrl(city) {
  const openweatherAPiUrl = "https://api.openweathermap.org/data/2.5/";
  const serviceKey = "923b8c4977550dd085e3796471bfd7db";

  const weatherUrl = openweatherAPiUrl + "weather";
  const payload =
    "?q=" + city + "&units=metric" + "&" + "appid=" + serviceKey + "#lang=kr"; //옵션을 추가하면 날씨설명을 한글로 받을 수 있음.
  const totalUrl = weatherUrl + payload;
  return totalUrl;
}

async function getData(totalUrl) {
  const response = await fetch(totalUrl);
  response.json().then((data) => {
    console.log(data);
    // var weatherData = data.weather[0].main;
    // var descriptionData = data.weather[0].description;
    var tempData = data["main"]["temp"].toFixed(1);
    // var mintempData = data["main"]["temp_min"].toFixed(1);
    // var maxtempData = data["main"]["temp_max"].toFixed(1);
    var iconData = data.weather[0].icon;

    // document.querySelector(".weather").innerHTML = weatherData;
    document.querySelector(".icon").src =
      " http://openweathermap.org/img/wn/" + iconData + "@2x.png";
    // document.querySelector(".description").innerHTML = descriptionData;
    document.querySelector(".temp").innerHTML =
      "현재 온도 : " + tempData + "(API 교체예정)";
    // document.querySelector(".mintemp_maxtemp").innerHTML =
    // "오늘의 관측 기온 : " + mintempData + " ~ " + maxtempData;
  });
}

export default function Weather() {
  var api = getUrl("Seongnam-si");
  getData(api);
}
