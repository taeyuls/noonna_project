import React from "react";
import { Card } from "react-bootstrap";

const WeatherBox = ({ weather }) => {
  if (!weather || !weather.name) return null;

  const { name, main, weather: weatherInfo } = weather;
  const temperature = main?.temp;
  const weatherDescription = weatherInfo[0]?.description;

  return (
    <Card className="text-center mt-4">
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>🌡️ 온도: {temperature}℃</Card.Text>
        <Card.Text>🌤️ 상태: {weatherDescription}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default WeatherBox;
