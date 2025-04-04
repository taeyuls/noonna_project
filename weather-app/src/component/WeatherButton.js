import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";

const WeatherButton = ({ cities, setCity, getCurrentLocation }) => {
  return (
    <div className="d-flex justify-content-center flex-wrap gap-2 mt-3">
      <Button variant="secondary" onClick={getCurrentLocation}>
        현재 위치
      </Button>
      <ButtonGroup>
        {cities.map((city, index) => (
          <Button
            key={index}
            variant="outline-primary"
            onClick={() => setCity(city)}
          >
            {city}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};

export default WeatherButton;
