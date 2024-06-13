import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [city, SetCity] = useState();
  const [temp, SetTemp] = useState(0);

  function success(pos) {
    setLatitude(pos.coords.latitude);
    setLongitude(pos.coords.longitude);
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  const gotWeather = async () => {
    try {
      debugger
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=8988d33759d408415270f13c41a0f52b`
      );
      SetCity(response.data.name);
      SetTemp(response.data.main.temp - 273);
    } catch (error) {
      console.log(`error!!!`);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      gotWeather();
    }
  }, [latitude,longitude]);

  return (
    <div className="App">
      <h1>
        latitude: {latitude}, longitude: {longitude}
      </h1>

      <h1>City {city}</h1>
      <h1>Temperature:{temp.toFixed(1)}</h1>
    </div>
  );
}

export default App;
