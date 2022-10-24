import parseWeatherCode from "../../utils/parseWeatherCode";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import UmbrellaIcon from "@mui/icons-material/Umbrella";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import AirIcon from "@mui/icons-material/Air";
import TornadoIcon from "@mui/icons-material/Tornado";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";

const ForecastItemIcon = ({ code }) => {
  const weatherCondition = parseWeatherCode(code);
  switch (weatherCondition) {
    case "thunderstorm":
      return <ThunderstormIcon fontSize="large" sx={{ color: "#FFF" }} />;
    case "drizzle":
      return <UmbrellaIcon fontSize="large" sx={{ color: "#FFF" }} />;
    case "rain":
      return <UmbrellaIcon fontSize="large" sx={{ color: "#FFF" }} />;
    case "snow":
      return <AcUnitIcon fontSize="large" sx={{ color: "#FFF" }} />;
    case "mist":
      return <AirIcon fontSize="large" sx={{ color: "#FFF" }} />;
    case "smoke":
      return <AirIcon fontSize="large" sx={{ color: "#FFF" }} />;
    case "haze":
      return <AirIcon fontSize="large" sx={{ color: "#FFF" }} />;
    case "dust":
      return <AirIcon fontSize="large" sx={{ color: "#FFF" }} />;
    case "fog":
      return <AirIcon fontSize="large" sx={{ color: "#FFF" }} />;
    case "sand":
      return <AirIcon fontSize="large" sx={{ color: "#FFF" }} />;
    case "ash":
      return <AirIcon fontSize="large" sx={{ color: "#FFF" }} />;
    case "squall":
      return <UmbrellaIcon fontSize="large" sx={{ color: "#FFF" }} />;
    case "tornado":
      return <TornadoIcon fontSize="large" sx={{ color: "#FFF" }} />;
    case "clear":
      return <WbSunnyIcon fontSize="large" sx={{ color: "#FFF" }} />;
    case "clouds":
      return <CloudIcon fontSize="large" sx={{ color: "#FFF" }} />;
    default:
      return <WbSunnyIcon fontSize="large" sx={{ color: "#FFF" }} />;
  }
};

export default ForecastItemIcon;
