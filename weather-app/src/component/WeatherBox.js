import React from "react";
import {
  WiCloud,
  WiDaySunny,
  WiNightAltCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";

const weatherIconMap = {
  Clear: <WiDaySunny size={100} color="#fff" />,
  Clouds: <WiCloud size={100} color="#fff" />,
  Rain: <WiRain size={100} color="#fff" />,
  Thunderstorm: <WiThunderstorm size={100} color="#fff" />,
  Snow: <WiSnow size={100} color="#fff" />,
};

const WeatherBox = ({ weather }) => {
  const temp = weather?.main?.temp;
  const city = weather?.name;
  const weatherDesc = weather?.weather[0]?.description;
  const main = weather?.weather[0]?.main;

  const iconComponent = weatherIconMap[main] || (
    <WiNightAltCloudy size={100} color="#fff" />
  );

  return (
    <div className="weather-box">
      <h2 className="city-name">{city}</h2>
      <div className="weather-icon">{iconComponent}</div>
      <div className="temperature">{Math.round(temp)}°C</div>
      <div className="description">{weatherDesc}</div>
    </div>
  );
};

export default WeatherBox;
