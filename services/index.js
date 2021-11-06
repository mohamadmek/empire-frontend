import Api from "./Api";

export default {
  API: Api.create("http://127.0.0.1:8000/api/"),
  APIWEATHER: Api.create("https://api.openweathermap.org/"),
};
