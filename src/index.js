import "./styles/style.css";
import getWeather from "./utils/weatherReport";
import getCurrentLocation from "./utils/geolocation";
import populateOverviews from "./utils/DOM";
const loadingDialog = document.getElementById("loading");

const locationInput = document.getElementById("location");
const form = document.querySelector("form");
const submitBtn = document.getElementById("search-btn");
const preventClosing = true;
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

loadingDialog.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && preventClosing) {
    e.preventDefault();
  }
});

async function generateWeatherContent(location) {
  if (!location) return;
  const timeoutId = setTimeout(() => {
    if (loadingDialog.open) {
      loadingDialog.close();
    }
  }, 10000);
  try {
    loadingDialog.showModal();
    const weatherData = await getWeather(location);
    if (!weatherData) return;

    populateOverviews(weatherData);
  } catch (error) {
    alert(error.message);
  } finally {
    clearTimeout(timeoutId);
    if (loadingDialog.open) {
      loadingDialog.close();
    }
  }
}
submitBtn.addEventListener("click", async (e) => {
  const location = locationInput.value;
  try {
    generateWeatherContent(location);
  } catch (error) {
    alert(error.message);
  }
});

async function initApp() {
  try {
    // To get the current location when the user enters the website
    const location = await getCurrentLocation();
    generateWeatherContent(location);
  } catch (error) {
    console.warn(error.message);
  }
}

initApp();
