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
      break;
    case "drizzle":
      return <UmbrellaIcon fontSize="large" sx={{ color: "#FFF" }} />;
      break;
    case "rain":
      return <UmbrellaIcon fontSize="large" sx={{ color: "#FFF" }} />;
      break;
    case "snow":
      return <AcUnitIcon fontSize="large" sx={{ color: "#FFF" }} />;
      break;
    case "mist":
      return <AirIcon fontSize="large" sx={{ color: "#FFF" }} />;
      break;
    case "smoke":
      return <AirIcon fontSize="large" sx={{ color: "#FFF" }} />;
      break;
    case "haze":
      return <AirIcon fontSize="large" sx={{ color: "#FFF" }} />;
      break;
    case "dust":
      return <AirIcon fontSize="large" sx={{ color: "#FFF" }} />;
      break;
    case "fog":
      return <AirIcon fontSize="large" sx={{ color: "#FFF" }} />;
      break;
    case "sand":
      return <AirIcon fontSize="large" sx={{ color: "#FFF" }} />;
      break;
    case "ash":
      return <AirIcon fontSize="large" sx={{ color: "#FFF" }} />;
      break;
    case "squall":
      return <UmbrellaIcon fontSize="large" sx={{ color: "#FFF" }} />;
      break;
    case "tornado":
      return <TornadoIcon fontSize="large" sx={{ color: "#FFF" }} />;
      break;
    case "clear":
      return <WbSunnyIcon fontSize="large" sx={{ color: "#FFF" }} />;
      break;
    case "clouds":
      return <CloudIcon fontSize="large" sx={{ color: "#FFF" }} />;
      break;
    default:
      return <WbSunnyIcon fontSize="large" sx={{ color: "#FFF" }} />;
      break;
  }
};

export default ForecastItemIcon;
