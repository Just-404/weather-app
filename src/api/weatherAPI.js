const API_KEY = "HLPMP733HWRXRDCRBBQ98AWAA";

export default async function getWeatherReport(location) {
  try {
    const params = new URLSearchParams();
    params.append("key", API_KEY);
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?${params}`
    );

    if (!response.ok) {
      throw new Error("Error fetching data..." + response.status);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}
