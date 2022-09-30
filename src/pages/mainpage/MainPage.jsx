import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import HomeCard from "../../components/mainpage/HomeCard";
import { weatherIcon } from "../../utils/weatherIcon";
import { weatherTemperature } from "../../utils/weatherTemperature";
import Spinner from "../../components/Spinner/Spinner";

function MainPage() {
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Jeju&appid=${apiKey}`;

  const [weather, setWeather] = useState();

  useEffect(() => {
    axios.get(apiUrl).then(res => {
      const weatherData = res.data;
      setWeather({
        id: weatherData.weather[0].id,
        temperature: weatherData.main.temp,
        temperatureMax: weatherData.main.temp_max,
        temperatureMin: weatherData.main.temp_min,
        main: weatherData.weather[0].main
      });
    });
  }, []);

  const temperature = weatherTemperature(weather?.temperatureMax, weather?.temperatureMin);
  const currentTemperature = temperature.toFixed();
  const selectIcon = weatherIcon(weather?.id);

  return (
    <Layout isLoggedIn={false} title="메인 페이지" highlight={"mainpage/home"}>
      <div className="grid place-items-center h-screen">
        <div className="flex flex-row m-3">
          <span className="font-bold m-3">현재 제주 날씨는</span>
          {temperature ? (
            <>
              <div>{selectIcon}</div>
              <span className="font-bold m-3">{currentTemperature}°C</span>
            </>
          ) : (
            <Spinner />
          )}
        </div>
        <HomeCard />
      </div>
    </Layout>
  );
}

export default MainPage;
