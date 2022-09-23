import Layout from "../../components/layout/Layout";
import { useQuery } from "react-query";
import axios from "axios";

const endPoint = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0";
const key = "Anonymous";
const grid = {
  x: 53,
  y: 38
};

const Weather = () => {
  const { isLoading, error, data } = useQuery(["weather"], () => {
    return axios.get(endPoint, {
      params: {
        serviceKey: key,
        dataType: "JSON",
        base_date: "20210628",
        base_time: "0600",
        nx: grid.x,
        ny: grid.y
      }
    });
  });
  console.dir(data);
  return <Layout isLoggedIn={false} title="날씨" highlight={"/"}></Layout>;
};

export default Weather;
