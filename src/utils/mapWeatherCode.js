const mapWeatherCode = code => {
  const firstDigit = code.slice(0, 1);
  switch (firstDigit) {
    case "2":
      return "폭풍우";
      break;
    case "3":
      return "이슬비";
      break;
    case "5":
      return "비";
      break;
    case "6":
      return "눈";
      break;
    case "7":
      const secondDigit = code.slice(1, 2);
      switch (secondDigit) {
        case "0":
          return "옅은 안개";
          break;
        case "1":
          return "연무";
          break;
        case "2":
          return "안개";
          break;
        case "3":
          return "먼지";
          break;
        case "4":
          return "짙은 안개";
          break;
        case "5":
          return "황사";
          break;
        case "6":
          return "재";
          break;
        case "7":
          return "소나기";
          break;
        case "8":
          return "태풍";
          break;
        default:
          return "맑음";
          break;
      }
      break;
    case "8":
      const thirdDigit = code.slice(2);
      switch (thirdDigit) {
        case "0":
          return "맑음";
          break;
        default:
          return "구름";
          break;
      }
      break;
    default:
      return "맑음";
      break;
  }
};

export default mapWeatherCode;
