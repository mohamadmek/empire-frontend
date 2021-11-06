import React from "react";

const Favorite = ({ city, setCity, setSearchTerm, fav, handleDeleteFav }) => {
  return (
    <div className="flex justify-center items-center hover:scale-105 mr-2">
      <div
        onClick={() => {
          setCity(city);
          setSearchTerm(city);
        }}
        className="bg-purple1f223a p-1 rounded-tl-lg rounded-bl-lg  cursor-pointer"
      >
        <div>{city}</div>
      </div>
      <div
        onClick={() => handleDeleteFav(fav.id)}
        className="bg-purple1f223a p-1 rounded-tr-lg rounded-br-lg cursor-pointer"
      >
        x
      </div>
    </div>
  );
};

export default Favorite;
