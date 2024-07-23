import SearchBox from "./SearchBox";
import InfoBox from "./infoBox";
import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

export default function WeatherApp() {
  const API_KEY = "0a53f46e946e5ff22df4b471f28f8487";
  const limit = 100;
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  let [weatherInfo, setWeatherInfo] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);

        if (lat && lng) {
          try {
            let response = await axios.get(
              `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lng}&limit=${limit}&appid=${API_KEY}`
            );
            console.log(response);
            setCurrLocation(response.data[0].name);
          } catch (err) {
            console.error(err);
          }
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }, [lat, lng]);

  let getCurrWeatherInfo = async () => {
    let result = {
      city: "Ahmedabad",
      temp: 30.02,
      tempMin: 30.02,
      tempMax: 30.02,
      humidity: 32,
      feelsLike: "smoke",
      weather: "smoke",
    };
    console.log(result);
    return result;
  };

  let ShowDetails = async () => {
    let currDetails = await getCurrWeatherInfo();
    setWeatherInfo(currDetails);
  };

  let updateInfo = (newInfo) => {
    setWeatherInfo(newInfo);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Climafy:Get your Weather Updates</h2>
      <h4>Enter City:</h4>
      <SearchBox updateInfo={updateInfo} />
      <InfoBox info={weatherInfo} />
      <br></br>
      <button onClick={ShowDetails}>Get My Weather Info</button>
    </div>
  );
}
