import React from "react";
import {
  statuses,
  returnUnitType,
  fromFaToCel,
} from "../utilities/CommonUtilities";

const WeatherCard = ({ selectedUnit, weatherData }) => {
  const { date, weather, main } = weatherData;
  return (
    <div className="bg-purple1f223a h-56 w-3/12 mr-4 shadow-lg cursor-pointer text-white flex flex-col items-center py-7 justify-center rounded-lg">
      <div>{date}</div>
      <div className="py-6 text-5xl">{statuses[weather[0].main]}</div>
      <div>
        {fromFaToCel(main.temp, selectedUnit)} {returnUnitType(selectedUnit)}
      </div>
    </div>
  );
};

export default WeatherCard;
