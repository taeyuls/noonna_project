import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import "./App.css";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";

console.log("🔑 API KEY:", process.env.REACT_APP_WEATHER_API_KEY);
const REACT_APP_WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const cities = [
    "Seoul",
    "Jeju",
    "London",
    "New York",
    "Macton",
    "Daejeon",
    "Daegu",
    "Busan",
    "Changwon",
    "Tokyo",
  ];
  const [loading, setLoading] = useState(true);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
      setCity("");
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${REACT_APP_WEATHER_API_KEY}&units=metric`;
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("날씨 데이터를 가져오는 데 실패했습니다", error);
    }
    setTimeout(() => {
      setLoading(false);
    }, 700);
  };

  const getWeatherByCity = async () => {
    if (!city) return;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${REACT_APP_WEATHER_API_KEY}&units=metric`;
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("날씨 데이터를 가져오는 데 실패했습니다", error);
    }
    setTimeout(() => {
      setLoading(false);
    }, 700);
  };

  useEffect(() => {
    if (city === "") {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  return (
    <>
      {loading ? (
        <div className="loading">
          <MoonLoader
            color="#e0c9f7"
            loading={loading}
            size={200}
            speedMultiplier={0.7}
          />
          <h2 className="loading-text">날씨를 불러오는 중이야...</h2>
        </div>
      ) : (
        <div className="container">
          <div className="content">
            <WeatherBox weather={weather} />
            <WeatherButton
              cities={cities}
              setCity={setCity}
              getCurrentLocation={getCurrentLocation}
              city={city}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
