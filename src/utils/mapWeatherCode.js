const mapWeatherCode = code => {
  const firstDigit = code.slice(0, 1);
  switch (firstDigit) {
    case "2":
      return "폭풍우";
    case "3":
      return "이슬비";
    case "5":
      return "비";
    case "6":
      return "눈";
    case "7":
      const secondDigit = code.slice(1, 2);
      switch (secondDigit) {
        case "0":
          return "옅은 안개";
        case "1":
          return "연무";
        case "2":
          return "안개";
        case "3":
          return "먼지";
        case "4":
          return "짙은 안개";
        case "5":
          return "황사";
        case "6":
          return "재";
        case "7":
          return "소나기";
        case "8":
          return "태풍";
        default:
          return "맑음";
      }
      break;
    case "8":
      const thirdDigit = code.slice(2);
      switch (thirdDigit) {
        case "0":
          return "맑음";
        default:
          return "구름";
      }
      break;
    default:
      return "맑음";
  }
};

export default mapWeatherCode;
