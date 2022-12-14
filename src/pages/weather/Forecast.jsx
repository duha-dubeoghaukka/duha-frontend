import ForecastItem from "./ForecastItem";
import { useQuery } from "react-query";
import axios from "axios";
import coordinates from "../../utils/coordinates";
import { useEffect } from "react";
import NonLayoutSpinner from "../../components/Spinner/NonLayoutSpinner";
import moment from "moment";

const Forecast = ({ currentRegion }) => {
  const url = "https://api.openweathermap.org/data/2.5/forecast";
  const { error, isLoading, data, refetch } = useQuery("forecast", () => {
    return axios.get(url, {
      params: {
        appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
        lat: coordinates[currentRegion].latitude,
        lon: coordinates[currentRegion].longitude,
        units: "metric"
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
    const forecasts = data.data.list;
    const today = moment();
    const later = moment().add(5, "days");
    const dailyForecasts = [];
    let i = today;
    while (i.isBefore(later, "day")) {
      const filtered = forecasts.filter(forecast => {
        return forecast.dt_txt.slice(8, 10) === i.format("DD");
      });
      dailyForecasts.push(filtered);
      i.add(1, "days");
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
      return dailyForecast[0].weather[0].id.toString();
    });
    return (
      <div className="grid grid-cols-5 gap-5 mt-5">
        {dailyForecasts.map((forecast, index) => {
          return (
            <ForecastItem
              key={index}
              day={moment().add(index, "days").format("DD")}
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
