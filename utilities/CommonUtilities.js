export const returnUnitType = (type) => {
  return type == "F" ? "°F" : "°C";
};

export const statuses = {
  Clear: "☀️",
  Rain: "🌧️",
  Clouds: "⛅",
};

export const TransformWeatherData = (data) => {};

export const fromFaToCel = (number, type) => {
  if (type == "F") {
    return number.toFixed();
  } else {
    return (((number - 32) * 5) / 9).toFixed();
  }
};

export let access_token = "";

export const retrieveAccessToken = () => access_token;
export const setAccessToken = (token) => (access_token = token);
