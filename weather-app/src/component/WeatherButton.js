import React from "react";

const WeatherButton = ({ cities, setCity, getCurrentLocation, city }) => {
  return (
    <div className="button-group">
      <button
        className={`button ${city === "" ? "active" : ""}`}
        onClick={getCurrentLocation}
      >
        현재 위치
      </button>
      {cities.map((cityName, index) => (
        <button
          key={index}
          className={`button ${city === cityName ? "active" : ""}`}
          onClick={() => setCity(cityName)}
        >
          {cityName}
        </button>
      ))}
    </div>
  );
};

export default WeatherButton;
