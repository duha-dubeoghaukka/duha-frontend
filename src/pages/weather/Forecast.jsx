import ForecastItem from "./ForecastItem";
import { useQuery } from "react-query";
import axios from "axios";
import Spinner from "../../components/Spinner/Spinner";

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
    const minForecasts = forecasts.filter(forecast => {
      return forecast.dt_txt.includes("06:00:00");
    });
    const maxForecasts = forecasts.filter(forecast => {
      return forecast.dt_txt.includes("15:00:00");
    });
    return (
      <div className="grid grid-cols-4 gap-5 mt-5">
        {minForecasts.map((forecast, index) => {
          return (
            <ForecastItem
              key={forecast.dt}
              day={forecast.dt_txt.slice(8, 10)}
              minTemperature={forecast.main.temp}
              maxTemperature={maxForecasts[index].main.temp}
              weatherCode={maxForecasts[index].weather[0].id.toString()}
            />
          );
        })}
      </div>
    );
    // forecastData.main.humidity, temp_min, temp_max, .weather[0].id
  }
};

export default Forecast;
