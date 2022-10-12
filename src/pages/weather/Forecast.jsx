import ForecastItem from "./ForecastItem";
import { useQuery } from "react-query";
import axios from "axios";
import Spinner from "../../components/Spinner/Spinner";
import getTomorrow from "../../utils/getTomorrow";

const Forecast = () => {
  const url = "https://api.openweathermap.org/data/2.5/forecast";
  const { error, isLoading, data } = useQuery("forecast", () => {
    return axios.get(url, {
      params: {
        appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
        lat: 33.2721,
        lon: 126.3221,
        units: "metric"
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
    const forecasts = data.data.list;
    const tomorrow = getTomorrow();
    const today = new Date().getDate();
    const dailyForecasts = [];
    for (let i = today; i < today + 5; i++) {
      const filtered = forecasts.filter(forecast => {
        return forecast.dt_txt.slice(8, 10) === i.toString().padStart(2, "0");
      });
      dailyForecasts.push(filtered);
    }
    const minMaxTemperatures = dailyForecasts.map(forecast => {
      const temperatures = forecast.map(item => {
        return item.main.temp;
      });
      const minTemperature = Math.min(...temperatures);
      const maxTemperature = Math.max(...temperatures);
      return {
        minTemperature,
        maxTemperature
      };
    });
    const weatherConditions = dailyForecasts.map(dailyForecast => {
      return dailyForecast[4].weather[0].id.toString();
    });
    return (
      <div className="grid grid-cols-5 gap-5 mt-5">
        {dailyForecasts.map((forecast, index) => {
          return (
            <ForecastItem
              key={index}
              day={today + index}
              minTemperature={Math.round(minMaxTemperatures[index].minTemperature)}
              maxTemperature={Math.round(minMaxTemperatures[index].maxTemperature)}
              weatherCode={weatherConditions[index]}
            />
          );
        })}
      </div>
    );
  }
};

export default Forecast;