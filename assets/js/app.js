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

async function fetchData(location) {
  const apiKey = "6dac8d169c854c309dd150312242104";
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  displayWeatherData(data);
}

async function getLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    }
  });
}

async function getCityFromCoordinates(latitude, longitude) {
  var apiUrl =
    "https://nominatim.openstreetmap.org/reverse?format=json&lat=" +
    latitude +
    "&lon=" +
    longitude;

  const response = await fetch(apiUrl);
  const data = await response.json();
  console.log(data);

  var city = data.address.state_district;
  console.log(city);
  return city;
}

const gpsLoc = document.querySelector(".gpsLoc");

gpsLoc.addEventListener("click", async function () {
  const position = await getLocation();
  const city = await getCityFromCoordinates(
    position.coords.latitude,
    position.coords.longitude
  );
  if (city) {
    fetchData(city);
  }
});
