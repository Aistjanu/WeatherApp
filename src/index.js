// //// displaying the current time and date///
let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let currentDay = document.querySelector("#currentDay");
currentDay.innerHTML = `${day}`;

let hours = now.getHours();
let minutes = now.getMinutes();

let fullTime = `${hours}:${minutes}`;

let currentTime = document.querySelector("#currentTime");
currentTime.innerHTML = `${fullTime}`;

// ////displaying the city name and temperature from search bar////
function showWeather(response) {
  document.querySelector("#currentCity").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function search(city) {
  let apiKey = "eec1120b82841e2f3a361f919a4fcd2f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#searchBarInput").value;
  search(city);
}

let form = document.querySelector("#searchForm");
form.addEventListener("submit", handleSubmit);

search("Toronto");

// ///current location button///

function showPosition(position) {
  let apiKey = "eec1120b82841e2f3a361f919a4fcd2f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function showLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector("#locationButton");
locationButton.addEventListener("click", showLocation);
