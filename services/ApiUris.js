const appid = "ece5cd5d89fcac6afc7fd62b1b8500f8";

export const auth = {
  LOGIN: "auth/login",
  REGISTER: "auth/register",
  LOGOUT: "auth/logout",
  UPDATE_USER: "auth/updateUser",
  GET_USER_WITH_TOKEN: "auth/getUserWithToken",
};

export const favorites = {
  ADD_FAVORITE: "/addFavorite",
  DELETE_FAVORITE: "/deleteFavorite",
};

export const weather = {
  GET_DATA: `data/2.5/forecast?appid=${appid}`,
};
