import Layout from "../../components/layout/Layout";
import Forecast from "./Forecast";
import axios from "axios";
import { useQuery } from "react-query";
import mapWeatherCode from "../../utils/mapWeatherCode";
import Backdrop from "./Backdrop";
import { useEffect, useState } from "react";
import WeatherRegionButton from "../../components/weather/WeatherRegionButton";
import coordinates from "../../utils/coordinates";
import mapRegions from "../../utils/mapRegions";
import NonLayoutSpinner from "../../components/Spinner/NonLayoutSpinner";

const Weather = () => {
  const url = "https://api.openweathermap.org/data/2.5/weather";
  const [currentRegion, setCurrentRegion] = useState("jeju");
  const { error, isLoading, data, refetch } = useQuery("ultraShortTermWeather", () => {
    return axios.get(url, {
      params: {
        appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
        units: "metric",
        lat: coordinates[currentRegion].latitude,
        lon: coordinates[currentRegion].longitude
      }
    });
  });
  useEffect(() => {
    refetch();
  }, [currentRegion]);
  if (isLoading) {
    return <NonLayoutSpinner />;
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (data) {
    const weatherData = data.data;
    const feelsLikeTemperature = weatherData.main.feels_like;
    const humidity = weatherData.main.humidity;
    const temperature = weatherData.main.temp;
    const weatherCode = weatherData.weather[0].id;
    const windSpeed = weatherData.wind.speed;
    return (
      <Layout isLoggedIn={false} title={"날씨"} highlight={"mainpage/weather"} isFullWidth={true}>
        <div className="relative h-[100vh]">
          <Backdrop code={weatherCode} />
          <div className="absolute top-12 w-full flex justify-around z-[5]">
            <WeatherRegionButton regionName="제주시" isActive={currentRegion === "jeju"} setCurrentRegion={setCurrentRegion} />
            <WeatherRegionButton regionName="성산포" isActive={currentRegion === "seongsanpo"} setCurrentRegion={setCurrentRegion} />
            <WeatherRegionButton regionName="서귀포시" isActive={currentRegion === "seogwipo"} setCurrentRegion={setCurrentRegion} />
            <WeatherRegionButton regionName="모슬포" isActive={currentRegion === "moseulpo"} setCurrentRegion={setCurrentRegion} />
          </div>
          <div className="absolute w-full h-full top-0 left-0 flex flex-col items-center justify-center">
            <div>
              <p className="font-bold text-white1 text-[32px]">{mapRegions[currentRegion]}</p>
            </div>
            <div>
              <p className="font-bold text-white1 text-[72px]">{Math.round(temperature)}ºC</p>
            </div>
            <div>
              <p className="font-bold text-white1 text-[24px]">체감 {Math.round(feelsLikeTemperature)}ºC</p>
            </div>
            <div>
              <p className="font-bold text-white1 text-[24px]">{mapWeatherCode(weatherCode.toString())}</p>
            </div>
            <div>
              <p className="font-bold text-white1 text-[18px]">습도 {humidity}%</p>
            </div>
            <div>
              <p className="font-bold text-white1 text-[18px]">풍속 {Math.round(windSpeed)}m/s</p>
            </div>
            <Forecast currentRegion={currentRegion} />
          </div>
        </div>
      </Layout>
    );
  }
};

export default Weather;
