const todayDate = document.querySelector("#date");

const getDate = () => {
  const gunler = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const aylar = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const bugun = new Date();
  const gun = bugun.getDate();
  const ay = aylar[bugun.getMonth()];
  const il = bugun.getFullYear();
  const gunAdi = gunler[bugun.getDay()];
  const formatolunmusTarix = `${gunAdi}, ${gun} ${ay} ${il}`;
  todayDate.textContent = formatolunmusTarix;
};

window.onload = function () {
  getDate();
  fetchData("Baku");
};

const search = document.querySelector("#search");
const searchBtn = document.querySelector("#searchBtn");

searchBtn.addEventListener("click", function () {
  const location = search.value.toLowerCase();
  fetchData(location);
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const location = search.value.toLowerCase();
    fetchData(location);
  }
});

const selsi = document.querySelector("#temp");
const loc = document.querySelector("#inputLoc");
const hum = document.querySelector("#humidity");
const windSpeed = document.querySelector("#wind");
const icon = document.querySelector("#icon");
const infos = document.querySelector("#intro");

function displayWeatherData(data) {
  selsi.textContent = Math.round(data.current.temp_c);
  loc.textContent = data.location.name;
  hum.textContent = data.current.humidity;
  windSpeed.textContent = data.current.wind_mph;
  icon.src = data.current.condition.icon;
  infos.style.display = "block";
}

function fetchData(location) {
  const apiKey = "6dac8d169c854c309dd150312242104";
  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not okey");
      }
      return response.json();
    })
    .then((data) => {
      displayWeatherData(data);
      console.log(data);
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
}
