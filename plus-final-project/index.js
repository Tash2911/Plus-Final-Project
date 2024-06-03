function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="temperature-icon"/>`;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed} km/h`;
  timeElement.innerHTML = formatDate(date);
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;

  getForecast(response.data.city);
}

function searchCity(city) {
  let apiKey = "5804cet5d8681bbaa2c0f31803d6o3f5";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}& units=metric or imperial`;
  axios.get(apiUrl).then(displayTemperature);
}
function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}
function SubmitEvent(event) {
  event.preventDefault();
  searchInput = document.querySelector("#placeholder");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "5804cet5d8681bbaa2c0f31803d6o3f5";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<p>
      <span class="day"> 
        ${formatDay(day.time)}</span>
        <br/>
        <span><img src="${
          day.condition.icon_url
        }"class="forecast-icon"> </span> 
        <br/>
       <span class="forecast-max-temperature"> <strong>${Math.round(
         day.temperature.maximum
       )}º</strong> </span>
       <span class="forecast-min-temperature"> ${Math.round(
         day.temperature.minimum
       )}º </span>
       </p>`;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}
let searchform = document.querySelector("#search-form");
searchform.addEventListener("submit", SubmitEvent);
searchCity("Harare");
