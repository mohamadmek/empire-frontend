import React from "react";

const ChangeUnitCircle = ({ type, selectedUnit, handleChangeUnit }) => {
  return (
    <div
      onClick={() => handleChangeUnit(type)}
      className={`cursor-pointer rounded-full flex justify-center items-center w-10 h-10 mr-2 ${
        selectedUnit == type ? "bg-white" : "bg-gray-500"
      }`}
    >
      {type == "F" ? "°F" : "°C"}
    </div>
  );
};

export default ChangeUnitCircle;
