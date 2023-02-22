const date = new Date();

const day = String(date.getDate()).padStart(2, '0');

const dayName = new Array ("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");

const monthName = new Array ("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");

document.getElementById("day-week").innerHTML = dayName[date.getDay()];

document.getElementById("day-month-year").innerHTML = day + " " + monthName[date.getMonth()] + " " + date.getFullYear();

const icon = document.getElementById("icon");

const apiKey = "72e766e161dda52fdf42e37c24c5d334";


const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const city = "recife"


searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const city = cityInput.value;

  showData(city);

})

const getWeatherData = async(city) => {
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

  const res = await fetch(apiURL);
  const data = await res.json();

  return data;
}

const showData = async (city) => {
  const data = await getWeatherData(city);

  document.getElementById("city").innerHTML = data.name + ", " + data.sys.country;
  document.getElementById("temperature").innerHTML = parseInt(data.main.temp) + "º C";
  document.getElementById("weather").innerHTML = data.weather[0].main;
  icon.setAttribute(
    "src",
    `assets/img/${data.weather[0].icon}.svg`
  );

  document.getElementById("pressure").innerHTML = data.main.pressure + " hPa";
  document.getElementById("humidity").innerHTML = data.main.humidity + " %";
  document.getElementById("wind").innerHTML = parseInt(data.wind.speed * 3.16) + " km/h";
}

showData(city);

