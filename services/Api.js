import axios from "axios";
import { retrieveAccessToken } from "../utilities/CommonUtilities";
import { auth, favorites, weather } from "./ApiUris";

const createFormData = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(key, data[key]));
  return formData;
};

const create = (baseUrl) => {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json",
  };

  const api = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
    headers: headers,
  });

  api.interceptors.request.use(
    (config) => {
      const token = retrieveAccessToken();
      if (token != "" && baseUrl != "https://api.openweathermap.org/") {
        config.headers["Authorization"] = "Bearer " + token;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  const apis = {};

  // AUTH
  apis.register = (body) => {
    return api.post(auth.REGISTER, createFormData(body));
  };
  apis.login = (body) => {
    return api.post(auth.LOGIN, createFormData(body));
  };
  apis.logout = () => {
    return api.post(auth.LOGOUT, createFormData({}));
  };
  apis.updateUser = (body) => {
    return api.post(auth.UPDATE_USER, createFormData(body));
  };
  apis.getUserWithToken = () => {
    return api.get(auth.GET_USER_WITH_TOKEN);
  };

  // Favorites
  apis.addFavorite = (body) => {
    return api.post(favorites.ADD_FAVORITE, createFormData(body));
  };
  apis.deleteFavoite = (body) => {
    return api.post(favorites.DELETE_FAVORITE, createFormData(body));
  };

  apis.getWeatherData = (params) =>
    api.get(
      `${weather.GET_DATA}&${Object.keys(params)
        .map((key) => `${key}=${params[key]}`)
        .join("&")}`
    );

  return apis;
};

// let's return back our create method as the default.
export default {
  create,
};
