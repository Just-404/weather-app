function createElement(name, selector, value) {
  const element = document.createElement(name);
  if (selector && value !== undefined && value !== null) {
    element.setAttribute(selector, value);
  }
  return element;
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
  temperatureP.textContent = hourData.temperature;

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
  locationP.textContent = dayData.address;
  const dateP = createElement("p");
  dateP.textContent = dayData.datetime;
  const feelsLikeP = createElement("p");
  feelsLikeP.textContent = `${dayData.feelsLikeMax}° ${dayData.feelsLikeMin}° Feels like ${dayData.feelsLike}°`;

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

function populateDayOverview(dayData) {
  const dayOverview = document.getElementById("day-overview");
  dayOverview.innerHTML = "";
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

export default function populateOverviews(weatherData) {
  const hourData = weatherData.days[0].hours[0];
  const dayData = weatherData.days[0];

  populateHourOverview(hourData);
  populateDayOverview(dayData);
}
