import "./styles/style.css";
import getWeather from "./utils/weatherReport";
import getCurrentLocation from "./utils/geolocation";
import populateOverviews from "./utils/DOM";
let weatherData = {};
const loadingDialog = document.getElementById("loading");

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
    loadingDialog.showModal();
    weatherData = await getWeather(location);
  } catch (error) {
    alert(error.message);
  } finally {
    loadingDialog.close();
  }
});

async function initApp() {
  try {
    loadingDialog.showModal();
    // To get the current location when the user enters the website
    const location = await getCurrentLocation();

    if (!weatherData) return;

    weatherData = await getWeather(location);
    populateOverviews(weatherData);
  } catch (error) {
    console.warn(error.message);
  } finally {
    loadingDialog.close();
  }
}

initApp();
