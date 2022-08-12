function formatDate(date) {
  let currentHours = date.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  let weekDay = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[weekDay];

  return `${day} ${currentHours}:${currentMinutes}`;
}
let dateHeading = document.querySelector("#date");
let currentTime = new Date();
dateHeading.innerHTML = formatDate(currentTime);

//

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