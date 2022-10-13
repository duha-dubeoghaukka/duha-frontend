import parseWeatherCode from "../../utils/parseWeatherCode";

const Backdrop = ({ code }) => {
  const weatherCondition = parseWeatherCode(code.toString());
  switch (weatherCondition) {
    case "thunderstorm":
      return (
        <div className="h-full">
          <img src="/assets/weatherImages/Thunderstorm.jpg" alt="Thunderstorm" className="h-full w-full object-cover brightness-75" />
        </div>
      );
      break;
    case "drizzle":
      return (
        <div className="h-full">
          <img src="/assets/weatherImages/Drizzle.jpg" alt="Drizzle" className="h-full w-full object-cover brightness-75" />
        </div>
      );
      break;
    case "rain":
      return (
        <div className="h-full">
          <img src="/assets/weatherImages/Rain.jpg" alt="Rain" className="h-full w-full object-cover brightness-75" />
        </div>
      );
      break;
    case "snow":
      return (
        <div className="h-full">
          <img src="/assets/weatherImages/Snow.jpg" alt="Snow" className="h-full w-full object-cover brightness-75" />
        </div>
      );
      break;
    case "mist":
      return (
        <div className="h-full">
          <img src="/assets/weatherImages/Mist.jpg" alt="Misty Sky" className="h-full w-full object-cover brightness-75" />
        </div>
      );
      break;
    case "smoke":
      return (
        <div className="h-full">
          <img src="/assets/weatherImages/Smoke.jpg" alt="Smoky Sky" className="h-full w-full object-cover brightness-75" />
        </div>
      );
      break;
    case "haze":
      return (
        <div className="h-full">
          <img src="/assets/weatherImages/Haze.jpg" alt="Haze" className="h-full w-full object-cover brightness-75" />
        </div>
      );
      break;
    case "dust":
      return (
        <div className="h-full">
          <img src="/assets/weatherImages/Dust.jpg" alt="Dusty Sky" className="h-full w-full object-cover brightness-75" />
        </div>
      );
      break;
    case "fog":
      return (
        <div className="h-full">
          <img src="/assets/weatherImages/Fog.jpg" alt="Foggy Sky" className="h-full w-full object-cover brightness-75" />
        </div>
      );
      break;
    case "sand":
      return (
        <div className="h-full">
          <img src="/assets/weatherImages/Sand.jpg" alt="Sandstorm" className="h-full w-full object-cover brightness-75" />
        </div>
      );
      break;
    case "ash":
      return (
        <div className="h-full">
          <img src="/assets/weatherImages/Ash.jpg" alt="Ash" className="h-full w-full object-cover brightness-75" />
        </div>
      );
      break;
    case "squall":
      return (
        <div className="h-full">
          <img src="/assets/weatherImages/Squall.jpg" alt="Squall" className="h-full w-full object-cover brightness-75" />
        </div>
      );
      break;
    case "tornado":
      return (
        <div className="h-full">
          <img src="/assets/weatherImages/Tornado.jpg" alt="Tornado" className="h-full w-full object-cover brightness-75" />
        </div>
      );
      break;
    case "clear":
      return (
        <div className="h-full">
          <img src="/assets/weatherImages/Clear.jpg" alt="Clear Sky" className="h-full w-full object-cover brightness-75" />
        </div>
      );
      break;
    case "clouds":
      return (
        <div className="h-full">
          <img src="/assets/weatherImages/Clouds.jpg" alt="Cloudy Sky" className="h-full w-full object-cover brightness-75" />
        </div>
      );
      break;
    default:
      return (
        <div className="h-full">
          <img src="/assets/weatherImages/Clear.jpg" alt="Clear Sky" className="h-full w-full object-cover brightness-75" />
        </div>
      );
      break;
  }
};

export default Backdrop;
