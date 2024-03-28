import { useState } from "react";
import "./WeatherApp.css";
import search_icon from "../Assets/search.png";
import drizzle_icon from "../Assets/drizzle.png";
import humidity_icon from "../Assets/humidity.png";
import cloudy_icon from "../Assets/partly-cloudy.png";
import rainy_icon from "../Assets/rainy.png";
import snow_icon from "../Assets/snowflake.png";
import sunny_icon from "../Assets/sunny-day.png";
import wind_icon from "../Assets/wind.png";
const WeatherApp = () => {
  let api_key = "8e3fc5eb0b70e7e23504f6be0113a199";
  const [wicon, setWicon] = useState(sunny_icon);
  const search = async () => {
    const element = document.getElementsByClassName("city-input");
    if (element[0].value === "") {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

    let response = await fetch(url);
    let data = await response.json();
    const humidity = document.getElementsByClassName("humidity-percent");
    const wind = document.getElementsByClassName("wind-rate");
    const temperature = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");
    humidity[0].innerHTML = data.main.humidity + "%";
    wind[0].innerHTML = Math.floor(data.wind.speed) + "km/h";
    temperature[0].innerHTML = Math.floor(data.main.temp) + "°c";
    location[0].innerHTML = data.name;
    let weatherIcon = data.weather[0].icon;
    if (weatherIcon === "01d" || weatherIcon === "01n") {
      setWicon(sunny_icon);
    } else if (weatherIcon === "02d" || weatherIcon === "02n") {
      setWicon(cloudy_icon);
    } else if (weatherIcon === "03d" || weatherIcon === "03n") {
      setWicon(drizzle_icon);
    } else if (weatherIcon === "04d" || weatherIcon === "04n") {
      setWicon(drizzle_icon);
    } else if (weatherIcon === "09d" || weatherIcon === "09n") {
      setWicon(rainy_icon);
    } else if (weatherIcon === "010d" || weatherIcon === "010n") {
      setWicon(rainy_icon);
    } else if (weatherIcon === "013d" || weatherIcon === "013n") {
      setWicon(snow_icon);
    } else {
      setWicon(sunny_icon);
    }
  };
  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" placeholder="Search" className="city-input" />
        <div
          className="search-icon"
          onClick={() => {
            search();
          }}
        >
          <img src={search_icon} alt="search-icon" />
        </div>
      </div>
      <div className="weather-img">
        <img src={wicon} alt="weather-img" className="w-icon" />
      </div>
      <div className="weather-temp">--</div>
      <div className="weather-location">not available</div>
      <div className="divider"></div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="icon-img" className="icon" />
          <div className="data">
            <div className="humidity-percent">--%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="icon-img" className="icon" />
          <div className="data">
            <div className="wind-rate">-- km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
