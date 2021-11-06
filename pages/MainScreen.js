import React, { useEffect, useState } from "react";
import {
  Search,
  ChangeUnitCircle,
  WeatherCard,
  Highlight,
  Favorite,
} from "../components";
import {
  fromFaToCel,
  returnUnitType,
  setAccessToken,
  statuses,
} from "../utilities/CommonUtilities";
import Services from "../services";
import moment from "moment";
import _ from "lodash";

const { APIWEATHER, API } = Services;

const MainScreen = ({
  favorites,
  setFavorites,
  setUserData,
  selectedUnit,
  setSelectedUnit,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [city, setCity] = useState("");
  const [cityInformations, setCityInformations] = useState({});
  const [weatherList, setWeatherList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const founded = _.find(favorites, {
    city: city.charAt(0).toUpperCase() + city.slice(1),
  });

  const onSubmitSearchClicked = (e) => {
    e.preventDefault();
    setCity(searchTerm);
  };

  const fetchWeatherData = async () => {
    if (city == "") {
      setCityInformations({});
      setWeatherList([]);
      return;
    }
    try {
      setIsLoading(true);
      const result = await APIWEATHER.getWeatherData({
        q: city,
      });
      const { data } = result;
      setCityInformations(data?.city ?? {});
      const formatedDate = data.list.map((item) => {
        return { ...item, date: moment(item.dt_txt).format("dddd") };
      });

      const unioned = _.unionBy(formatedDate, "date");
      setWeatherList(unioned);
      setErrorMessage(null);
    } catch (error) {
      setCityInformations({});
      setWeatherList([]);
      setErrorMessage("This country was not found please choose another one");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
    return () => {};
  }, [city]);

  const handleLogout = async () => {
    try {
      const response = await API.logout({});
      const { data } = response;
      if (data.success) {
        localStorage.clear();
        setUserData(null);
        setAccessToken("");
      }
    } catch (error) {
      console.error("LOGOUT ", error);
    }
  };

  const handleChangeUnit = async (unit) => {
    try {
      const response = await API.updateUser({ unit });
      setSelectedUnit(unit);
    } catch (error) {
      console.error("LOGOUT ", error);
    }
  };

  const handleDeleteFav = async (id) => {
    try {
      await API.deleteFavoite({
        id,
      });
    } catch (err) {
      console.error("ADD FAVORITE ", err);
    }
    const filteredFav = favorites.filter((fav) => fav.id != id);
    setFavorites(filteredFav);
  };

  return (
    <div className="flex h-full w-full">
      <div className="w-1/3 bg-purple1f223a h-screen sidebar p-6">
        <div className="flex justify-between align-middle">
          <Search
            onSubmitSearchClicked={onSubmitSearchClicked}
            setSearchTerm={setSearchTerm}
            searchTerm={searchTerm}
          />
          <div className="flex">
            <ChangeUnitCircle
              handleChangeUnit={handleChangeUnit}
              setSelectedUnit={setSelectedUnit}
              selectedUnit={selectedUnit}
              type="F"
            />
            <ChangeUnitCircle
              handleChangeUnit={handleChangeUnit}
              setSelectedUnit={setSelectedUnit}
              selectedUnit={selectedUnit}
              type="C"
            />
          </div>
        </div>
        {weatherList.length < 1 ? null : (
          <>
            <div className="text-center  h-100 flex flex-col items-center justify-center p-10">
              <div className="text-9xl">
                {statuses[weatherList[0].weather[0].main]}
              </div>
              <div className="flex mt-5 mb-5 items-center justify-center text-gray-200">
                <div className="text-7xl">
                  {fromFaToCel(weatherList[0].main.temp, selectedUnit)}
                </div>
                <div className="text-2xl">{returnUnitType(selectedUnit)}</div>
              </div>
              <div className="text-5xl text-gray-200">
                {weatherList[0].weather[0].description}
              </div>
              <div className="text-1xl text-gray-200 mt-10">
                Today - {moment(weatherList[0].dt_txt).format("dddd MMMM DD")}
              </div>
              <div className="text-1xl text-gray-200 mt-10 flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {cityInformations?.name ?? city ? city : ""}
              </div>
              {founded ? null : (
                <button
                  disabled={founded ? true : false}
                  onClick={async () => {
                    try {
                      const result = await API.addFavorite({
                        city: city.charAt(0).toUpperCase() + city.slice(1),
                      });
                      const { data } = result;
                      if (data.success) {
                        const tempFav = [...favorites, data.data];
                        setFavorites(tempFav);
                      }
                    } catch (err) {
                      console.error("ADD FAVORITE ", err);
                    }
                  }}
                  className="text-white bg-purple110e1d mt-5 p-2 rounded-lg cursor-pointer hover:scale-105"
                >
                  Add to favorite
                </button>
              )}
            </div>
          </>
        )}
      </div>
      <div className="w-2/3 bg-purple110e1d h-screen p-10">
        <button
          onClick={() => handleLogout()}
          className="absolute top-5 right-10 text-white bg-purple1f223a p-3 rounded-lg"
        >
          Logout
        </button>
        <div className="text-white flex mb-4 items-center">
          <div className="mr-3">Favorites:</div>
          {favorites.map((fav, index) => (
            <Favorite
              handleDeleteFav={handleDeleteFav}
              fav={fav}
              key={index}
              setSearchTerm={setSearchTerm}
              setCity={setCity}
              city={fav.city}
            />
          ))}
        </div>
        <div className="flex justify-between">
          {weatherList.map((weatherData, index) => {
            if (index > 0) {
              return (
                <WeatherCard
                  key={index}
                  weatherData={weatherData}
                  selectedUnit={selectedUnit}
                />
              );
            }
          })}
        </div>
        {isLoading ? (
          <div className="text-white text-3xl mt-4 mb-4">Loading...</div>
        ) : weatherList.length < 1 ? (
          <div className="text-white text-3xl mt-4 mb-4">
            {errorMessage && city != null && city != ""
              ? errorMessage
              : "Please choose a country"}
          </div>
        ) : (
          <>
            <div className="text-white text-3xl mt-4 mb-4">
              Today’s Hightlights
            </div>
            <div className="flex justify-between">
              <Highlight
                title="Wind status"
                number={weatherList[0].wind.speed}
                unit="km/h"
                icon={true}
                status={"WSW"}
              />
              <Highlight
                title="Humidity"
                number={weatherList[0].main.humidity}
                unit="%"
                icon={false}
                status="Normal"
              />
              <Highlight
                title="Visibility"
                number={weatherList[0]?.visibility}
                unit="km"
                icon={false}
                status="Average"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MainScreen;
