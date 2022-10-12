import ForecastItem from "./ForecastItem";

const Forecast = () => {
  // const url = "https://api.openweathermap.org/data/2.5/forecast";
  // const { error, isLoading, data } = useQuery("forecast", () => {
  //   return axios.get(url, {
  //     params: {
  //       appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
  //       lat: 33.2721,
  //       lon: 126.3221,
  //       units: "metric"
  //     }
  //   });
  // });
  // if (isLoading) {
  //   return <Spinner />;
  // }
  // if (error) {
  //   return <div>{error}</div>;
  // }
  // if (data) {
  //   const forecasts = data.data.list;
  //   const forecastData = forecasts.filter(forecast => {
  //     return forecast.dt_txt.includes("00:00:00");
  //   });
  // forecastData.main.humidity, temp_min, temp_max, .weather[0].id
  return (
    <div className="grid grid-cols-4 gap-5 mt-5">
      <ForecastItem day={13} minTemperature={18} maxTemperature={27} weatherCode={"800"} />
      <ForecastItem day={14} minTemperature={18} maxTemperature={27} weatherCode={"800"} />
      <ForecastItem day={15} minTemperature={18} maxTemperature={27} weatherCode={"800"} />
      <ForecastItem day={16} minTemperature={18} maxTemperature={27} weatherCode={"800"} />
    </div>
  );
  // }
};

export default Forecast;
