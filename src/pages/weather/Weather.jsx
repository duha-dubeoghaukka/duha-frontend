import Layout from "../../components/layout/Layout";
import Forecast from "./Forecast";
import axios from "axios";
import { useQuery } from "react-query";
import Spinner from "../../components/Spinner/Spinner";
import parseWeatherCode from "../../utils/parseWeatherCode";

const Weather = () => {
  const url = "https://api.openweathermap.org/data/2.5/weather";
  const { error, isLoading, data } = useQuery("ultraShortTermWeather", () => {
    return axios.get(url, {
      params: {
        appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
        units: "metric",
        lat: 33.2721,
        lon: 126.3221
      }
    });
  });
  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (data) {
    const weatherData = data.data;
    const feelsLikeTemperature = weatherData.main.feels_like;
    const humidity = weatherData.main.humidity;
    const temperature = weatherData.main.temp;
    const minTemperature = weatherData.main.temp_min;
    const maxTemperature = weatherData.main.temp_max;
    const weatherCode = weatherData.weather[0].id;
    const windSpeed = weatherData.wind.speed;
    return (
      <Layout isLoggedIn={false} title={"날씨"} highlight={"mainpage/weather"}>
        <div className="relative h-[100vh]">
          <div className="h-full">
            <img src="/assets/weatherImages/Clear.jpg" alt="Clear Sky" className="h-full object-cover" />
          </div>
          <div className="absolute w-full h-full top-0 left-0 flex flex-col items-center justify-center">
            <div>
              <p className="font-bold text-white1 text-[32px]">제주시</p>
            </div>
            <div>
              <p className="font-bold text-white1 text-[72px]">{Math.round(temperature)}ºC</p>
            </div>
            <div>
              <p className="font-bold text-white1 text-[24px]">체감 {Math.round(feelsLikeTemperature)}ºC</p>
            </div>
            <div>
              <p className="font-bold text-white1 text-[24px]">{parseWeatherCode(weatherCode.toString())}</p>
            </div>
            <div>
              <p className="font-bold text-white1 text-[18px]">습도 {humidity}%</p>
            </div>
            <div>
              <p className="font-bold text-white1 text-[18px]">풍속 {Math.round(windSpeed)}m/s</p>
            </div>
            <Forecast />
          </div>
        </div>
      </Layout>
    );
  }
};

export default Weather;
