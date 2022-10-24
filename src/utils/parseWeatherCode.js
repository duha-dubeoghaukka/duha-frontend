const parseWeatherCode = code => {
  const firstDigit = code.slice(0, 1);
  switch (firstDigit) {
    case "2":
      return "thunderstorm";
    case "3":
      return "drizzle";
    case "5":
      return "rain";
    case "6":
      return "snow";
    case "7":
      const secondDigit = code.slice(1, 2);
      switch (secondDigit) {
        case "0":
          return "mist";
        case "1":
          return "smoke";
        case "2":
          return "haze";
        case "3":
          return "dust";
        case "4":
          return "fog";
        case "5":
          return "sand";
        case "6":
          return "ash";
        case "7":
          return "squall";
        case "8":
          return "tornado";
        default:
          return "clear";
      }
      break;
    case "8":
      const thirdDigit = code.slice(2);
      switch (thirdDigit) {
        case "0":
          return "clear";
        default:
          return "clouds";
      }
      break;
    default:
      return "clear";
  }
};

export default parseWeatherCode;
