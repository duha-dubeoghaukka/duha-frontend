const parseWeatherCode = code => {
  const firstDigit = code.slice(0, 1);
  switch (firstDigit) {
    case "2":
      return "thunderstorm";
      break;
    case "3":
      return "drizzle";
      break;
    case "5":
      return "rain";
      break;
    case "6":
      return "snow";
      break;
    case "7":
      const secondDigit = code.slice(1, 1);
      switch (secondDigit) {
        case "0":
          return "mist";
          break;
        case "1":
          return "smoke";
          break;
        case "2":
          return "haze";
          break;
        case "3":
          return "dust";
          break;
        case "4":
          return "fog";
          break;
        case "5":
          return "sand";
          break;
        case "6":
          return "ash";
          break;
        case "7":
          return "squall";
          break;
        case "8":
          return "tornado";
          break;
        default:
          break;
      }
      break;
    case "8":
      const thirdDigit = code.slice(2, 1);
      switch (thirdDigit) {
        case "0":
          return "clear";
          break;
        default:
          return "clouds";
          break;
      }
      break;
    default:
      break;
  }
};

export default parseWeatherCode;
