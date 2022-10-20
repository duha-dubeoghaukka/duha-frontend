import Layout from "../../components/layout/Layout";
import { useQuery } from "react-query";
import Spinner from "../../components/Spinner/Spinner";
import axios from "axios";

const SunTime = () => {
  const { isLoading, error, data } = useQuery("suntime", () => {
    return axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
      params: {
        lat: 33.27,
        lon: 126.32,
        units: "metric",
        appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY
      }
    });
  });
  if (isLoading) {
    return <Spinner title="일출/일몰 시간 보기" />;
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (data) {
    const { sunrise, sunset } = data.data.city;
    const sunriseTime = new Date(sunrise * 1000);
    const sunsetTime = new Date(sunset * 1000);
    const sunriseHour = sunriseTime.getHours();
    const sunriseMinute = sunriseTime.getMinutes();
    const sunsetHour = sunsetTime.getHours();
    const sunsetMinute = sunsetTime.getMinutes();
    return (
      <Layout title="일출/일몰 시간 보기" highlight="mainpage/suntime">
        <p>
          일출 시각: {sunriseHour}:{sunriseMinute}
        </p>
        <p>
          일몰 시각: {sunsetHour}:{sunsetMinute}
        </p>
      </Layout>
    );
  }
};

export default SunTime;
