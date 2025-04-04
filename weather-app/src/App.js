import "bootstrap/dist/css/bootstrap.min.css";
import { CSSProperties, useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "./App.css";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const cities = [
    "London",
    "New York",
    "Macton",
    "Seoul",
    "Daejeon",
    "daegu",
    "busan",
    "changwon",
    "tokyo",
    "jeju",
  ];
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9471cf5a6cb6a54a518cfadbf6d76020&units=metric`;
    setLoading(true);
    try {
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("날씨 데이터를 가져오는 데 실패했습니다", error);
    }
    setLoading(false);
  };

  const getWeatherByCity = async () => {
    if (!city) return; // 도시가 비어 있을 때는 fetch를 방지
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9471cf5a6cb6a54a518cfadbf6d76020&units=metric`;
    setLoading(true);
    try {
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("날씨 데이터를 가져오는 데 실패했습니다", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (city == "") {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  return (
    <div className="container">
      {loading ? (
        <ClipLoader
          color="purple"
          loading={loading}
          css={override}
          size={150}
        />
      ) : (
        <div className="container">
          <WeatherBox weather={weather} />
          <WeatherButton
            cities={cities}
            setCity={setCity}
            getCurrentLocation={getCurrentLocation}
          />
        </div>
      )}
    </div>
  );
}

export default App;
