function createElement(name, selector, value) {
  const element = document.createElement(name);
  if (selector && value !== undefined && value !== null) {
    element.setAttribute(selector, value);
  }
  return element;
}

function getDay(dateStr) {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const days = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."];
  return days[date.getDay()];
}
function createHourOverviewHeader(hourData) {
  const overviewHeader = createElement("div", "class", "header-title");

  const conditionH2 = createElement("h2");
  conditionH2.textContent = hourData.conditions;

  const weatherIcon = createElement("img", "class", "icon");
  weatherIcon.alt = "weather icon";
  const div = createElement("div");
  const hourP = createElement("p");
  hourP.textContent = "Hour: " + hourData.datetime;

  const temperatureP = createElement("p");
  temperatureP.textContent = hourData.temperature + "°";

  div.append(hourP, temperatureP);
  overviewHeader.append(conditionH2, weatherIcon, div);
  return overviewHeader;
}

function createDayOverviewHeader(dayData) {
  const overviewHeader = createElement("div", "class", "header-title");

  const div = createElement("div");
  const tempH2 = createElement("h2");
  tempH2.textContent = dayData.temp + "°";
  const weatherDescriptionP = createElement("p");
  weatherDescriptionP.textContent = dayData.description;

  div.append(tempH2, weatherDescriptionP);

  const weatherIcon = createElement("img", "class", "icon");
  weatherIcon.alt = "weather icon";

  const div2 = createElement("div");
  const locationP = createElement("p");
  locationP.textContent = dayData.address || "Your location";
  const dateP = createElement("p");

  dateP.textContent = getDay(dayData.datetime) + " " + dayData.datetime;
  const feelsLikeP = createElement("p");
  feelsLikeP.textContent = `${dayData.feelsLikeMax}° / ${dayData.feelsLikeMin}° Feels like ${dayData.feelsLike}°`;

  div2.append(locationP, dateP, feelsLikeP);
  overviewHeader.append(div, weatherIcon, div2);
  return overviewHeader;
}

function createOverviewBody(conditions) {
  const overviewBody = createElement("div", "class", "data-body-types");
  for (const [key, value] of Object.entries(conditions)) {
    const cardCondition = createElement("div", "class", "conditions-types");
    const img = createElement("img", "class", "icon");
    img.alt = key;
    img.title = key;
    const p = createElement("p");
    p.textContent = value;

    cardCondition.append(img, p);
    overviewBody.append(cardCondition);
  }
  return overviewBody;
}

function populateHourOverview(hourData) {
  const hourOverview = document.getElementById("hour-overview");
  hourOverview.innerHTML = "";

  const overViewHeader = createHourOverviewHeader(hourData);
  const conditionsCard = {
    humidity: hourData.humidity,
    wind: hourData.windspeed,
    snow: hourData.snow,
    precipitation: `${hourData.precipitation} ${hourData.precipitationProb} ${
      hourData.precipitationType || "none"
    }`,
  };
  const overViewBody = createOverviewBody(conditionsCard);

  hourOverview.append(overViewHeader, overViewBody);
}

function populateDayOverview(dayData, location) {
  const dayOverview = document.getElementById("day-overview");
  dayOverview.innerHTML = "";
  dayData.address = location;
  const overViewHeader = createDayOverviewHeader(dayData);
  const conditionsCard = {
    temperature: ` ${dayData.maxTemp}°/${dayData.minTemp}° ${dayData.temp}°`,
    humidity: dayData.humidity,
    wind: dayData.windSpeed,
    snow: `${dayData.snow} ${dayData.snowdepth} depth`,
    precipitation: `${dayData.precipitation} ${dayData.precipitationProb} ${
      dayData.precipitationType || "none"
    }`,
  };
  const overViewBody = createOverviewBody(conditionsCard);

  dayOverview.append(overViewHeader, overViewBody);
}

function populateHoursContainer(hours) {
  const hoursContainer = document.querySelector("sidebar");
  hoursContainer.innerHTML = "";

  for (const hour of Object.values(hours)) {
    const div = createElement("div", "class", "hour-card");
    div.addEventListener("click", (e) => {
      const currentHour = hour;
      populateHourOverview(hour);
    });

    const conditionIcon = createElement("img", "class", "sidebar-icon");
    const hourP = createElement("p");
    hourP.textContent = hour.datetime.slice(0, 5);

    const tempIcon = createElement("img", "class", "sidebar-icon");
    const tempP = createElement("p");
    tempP.textContent = hour.temperature;

    const precipitationIcon = createElement("img", "class", "sidebar-icon");
    const precipitP = createElement("p");
    precipitP.textContent = hour.precipitationProb + "%";

    div.append(
      conditionIcon,
      hourP,
      tempIcon,
      tempP,
      precipitationIcon,
      precipitP
    );
    hoursContainer.appendChild(div);
  }
}

function populateDaysContainer(days, location) {
  const daysContainer = document.querySelector("#days-container");
  daysContainer.innerHTML = "";
  for (const day of days) {
    const div = createElement("div", "class", "day-card");
    div.addEventListener("click", () => {
      populateHoursContainer(day.hours);
      populateHourOverview(day.hours[0]);
      populateDayOverview(day, location);
    });
    const conditionIcon = createElement("img", "class", "icon");
    const dayP = createElement("p");
    dayP.textContent = getDay(day.datetime);

    const tempIcon = createElement("img", "class", "sidebar-icon");
    const tempP = createElement("p");
    tempP.textContent = day.temp;

    const precipitationIcon = createElement("img", "class", "sidebar-icon");
    const precipitP = createElement("p");
    precipitP.textContent = day.precipitationProb + "%";

    div.append(
      conditionIcon,
      dayP,
      tempIcon,
      tempP,
      precipitationIcon,
      precipitP
    );
    daysContainer.appendChild(div);
  }
}
export default function populateOverviews(weatherData) {
  const hourData = weatherData.days[0].hours;
  const dayData = weatherData.days;
  const currentHour = new Date().getHours();

  populateHourOverview(hourData[currentHour]);
  populateDayOverview(dayData[0], weatherData.address);
  populateHoursContainer(hourData);
  populateDaysContainer(dayData, weatherData.address);
}
