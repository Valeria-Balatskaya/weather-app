function formatDate(timestamp) {
  let date = new Date(timestamp);
  let currentHours = date.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];

  return `${day} ${currentHours}:${currentMinutes}`;
}
let dateHeading = document.querySelector("#date");
let currentTime = new Date();
dateHeading.innerHTML = formatDate(currentTime);

//
function formatDay(timastamp) {
  let date = new Date(timastamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response){
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  
  forecast.forEach(function(forecastDay, index) { 
    if (index < 6) { 
  forecastHTML = forecastHTML + `
        <p class="day">
        <div class="mg">
            <div class="col weekDays">
                ${formatDay(forecastDay.dt)}
        </div>
        </p>
        <div class="prediction">
            <div class="card first" style="width: 5rem; background-color:#8dc6ff">
                <div class="card-body firsts">
                    <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="60px" class="iconTwo">
                    <p class="card-text">${Math.round(forecastDay.temp.max)}°
                        <br />
                        <span class="style">${Math.round(forecastDay.temp.min)}°</span>
                    </p>
                    </div>
                </div>
            </div>
        </div>
`; }})
 forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates){
  console.log(coordinates);
  let apiKey = `06424eced0efe9ad8879d306e48fe09a`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function showTemperature(response) {
  console.log(response.data)
    document.querySelector("#city").innerHTML = response.data.name;
   document.querySelector("#main-temp-indicator").innerHTML = Math.round(response.data.main.temp);
   document.querySelector("#maximum").innerHTML = Math.round(response.data.main.temp_max);
  document.querySelector("#minimum").innerHTML = Math.round(response.data.main.temp_min);
  document.querySelector("#feels-like").innerHTML = Math.round(response.data.main.feels_like);
   let iconElement = document.querySelector("#iconWeather");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord)
}
function searchCity(city) { 
let apiKey = `06424eced0efe9ad8879d306e48fe09a`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTemperature);
}
 function search(event){
  event.preventDefault();
  let city = document.querySelector("#city-search-input").value;
  searchCity(city);
 }
let form = document.querySelector("#city-search-form");
form.addEventListener("submit", search);

//
function localWeather (position){
  let apiKey = `06424eced0efe9ad8879d306e48fe09a`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function showCurrentLocation(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(localWeather);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", showCurrentLocation);

searchCity("Kyiv");
