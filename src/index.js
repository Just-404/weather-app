import "./styles/style.css";
import getWeather from "./utils/weatherReport";

let weatherData = {};

const locationInput = document.getElementById("location");
const form = document.querySelector("form");
const submitBtn = document.getElementById("searchBtn");

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

submitBtn.addEventListener("click", async (e) => {
  const location = locationInput.value;
  weatherData = await getWeather(location);
  console.log(weatherData);
});
