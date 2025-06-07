import "./styles/style.css";
import getWeather from "./utils/weatherReport";
import getCurrentLocation from "./utils/geolocation";

let weatherData = {};

const locationInput = document.getElementById("location");
const form = document.querySelector("form");
const submitBtn = document.getElementById("search-btn");

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

submitBtn.addEventListener("click", async (e) => {
  const location = locationInput.value;
  if (!location) return;
  try {
    weatherData = await getWeather(location);
    console.log(weatherData);
  } catch (error) {
    alert(error.message);
  }
});

async function initApp() {
  try {
    // To get the current location when the user enters the website
    const location = await getCurrentLocation();

    if (!weatherData) return;

    weatherData = await getWeather(location);
    console.log(weatherData);
  } catch (error) {
    console.warn(error.message);
  }
}

initApp();
