import getWeatherReport from "../api/weatherAPI";
export default async function getWeather(location) {
  const data = await getWeatherReport(location);

  const weatherWeek = {
    alerts: data.alerts,
    address: data.resolvedAddress,
  };

  let days = [];
  for (const day of data.days.slice(0, 7)) {
    const formattedDay = {
      feelsLike: day.feelslike,
      feelsLikeMin: day.feelslikemin,
      feelsLikeMax: day.feelslikemax,
      datetime: day.datetime,
      conditions: day.conditions,
      description: day.description,
      humidity: day.humidity,
      icon: day.icon,
      precipitation: day.precip,
      precipitationProb: day.precipprob,
      precipitationType: day.preciptype,
      snow: day.snow,
      snowdepth: day.snowdepth,
      temp: day.temp,
      minTemp: day.tempmin,
      maxTemp: day.tempmax,
      windSpeed: day.windspeed,
    };

    const hoursInDay = {};

    day.hours.forEach((hour, idx) => {
      hoursInDay[idx] = {
        conditions: hour.conditions,
        datetime: hour.datetime,
        feelsLike: hour.feelslike,
        humidity: hour.humidity,
        icon: hour.icon,
        precipitation: hour.precip,
        precipitationProb: hour.precipprob,
        precipitationType: hour.preciptype,
        snow: hour.snow,
        temperature: hour.temp,
        windspeed: hour.windspeed,
      };
    });
    formattedDay.hours = hoursInDay;
    days.push(formattedDay);
  }

  weatherWeek.days = days;

  return weatherWeek;
}
