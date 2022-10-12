import parseWeatherCode from "../../utils/parseWeatherCode";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import UmbrellaIcon from "@mui/icons-material/Umbrella";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import AirIcon from "@mui/icons-material/Air";
import TornadoIcon from "@mui/icons-material/Tornado";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";

const ForecastItemIcon = code => {
  const weatherCondition = parseWeatherCode(code);
  switch (weatherCondition) {
    case "thunderstorm":
      return <ThunderstormIcon />;
      break;
    case "drizzle":
      return <UmbrellaIcon />;
      break;
    case "rain":
      return <UmbrellaIcon />;
      break;
    case "snow":
      return <AcUnitIcon />;
      break;
    case "mist":
      return <AirIcon />;
      break;
    case "smoke":
      return <AirIcon />;
      break;
    case "haze":
      return <AirIcon />;
      break;
    case "dust":
      return <AirIcon />;
      break;
    case "fog":
      return <AirIcon />;
      break;
    case "sand":
      return <AirIcon />;
      break;
    case "ash":
      return <AirIcon />;
      break;
    case "squall":
      return <UmbrellaIcon />;
      break;
    case "tornado":
      return <TornadoIcon />;
      break;
    case "clear":
      return <WbSunnyIcon />;
      break;
    case "clouds":
      return <CloudIcon />;
      break;
    default:
      return <WbSunnyIcon />;
      break;
  }
};

export default ForecastItemIcon;
