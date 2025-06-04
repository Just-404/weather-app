export default async function getCurrentLocation() {
  if (!("geolocation" in navigator)) return null;

  return new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coordinates =
          position.coords.latitude + ", " + position.coords.longitude;
        res(coordinates);
      },
      (error) => {
        rej(error);
      }
    );
  });
}
