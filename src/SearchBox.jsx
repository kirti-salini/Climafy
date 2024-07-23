import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./SearchBox.css";
import { useState, useEffect } from "react";

export default function SearchBox({ updateInfo }) {
  let [city, setCity] = useState("");
  let [error, setError] = useState(false);

  const API_KEY = "0a53f46e946e5ff22df4b471f28f8487";
  const API_URL = "https://api.openweathermap.org/data/2.5/weather?";

  // Fetching weather info
  let getWeatherInfo = async () => {
    try {
      let response = await fetch(
        `${API_URL}q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error("No such place exists!");
      }
      let jsonResponse = await response.json();
      let result = {
        city: city,
        temp: jsonResponse.main.temp,
        tempMin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.temp_max,
        humidity: jsonResponse.main.humidity,
        feelsLike: jsonResponse.main.feels_like,
        weather: jsonResponse.weather[0].description,
      };
      return result;
    } catch (err) {
      throw err;
    }
  };

  let handleChange = (event) => {
    setCity(event.target.value);
  };

  let handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setError(false);
      let newInfo = await getWeatherInfo();
      setCity("");
      updateInfo(newInfo);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="SearchBox">
      <form onSubmit={handleSubmit}>
        <TextField
          id="city"
          label="City"
          variant="outlined"
          required
          onChange={handleChange}
          value={city}
        />
        &nbsp;&nbsp;&nbsp;
        <br></br>
        <br></br>
        <Button variant="contained" type="submit">
          Search
        </Button>
        {error && <p style={{ color: "red" }}>No such place exists!</p>}
      </form>
    </div>
  );
}
