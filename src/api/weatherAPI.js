const API_KEY = "HLPMP733HWRXRDCRBBQ98AWAA";

export default async function getWeatherReport(location) {
  try {
    const params = new URLSearchParams();
    params.append("key", API_KEY);
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?${params}`
    );

    if (!response.ok) {
      switch (response.status) {
        case 400:
          throw new Error("Invalid address, try again with a valid one!");
        case 401:
          throw new Error("UNAUTHORIZED ACCESS");
        case 404:
          throw new Error("Resource not found");
        case 429:
          throw new Error(
            "You have exceed the requests limit for this tier subscription"
          );
        case 500:
          throw new Error("INTERNAL SERVER ERROR");
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
