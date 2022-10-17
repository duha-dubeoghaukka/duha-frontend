const porterMapper = title => {
  switch (title) {
    case "가방은여행중":
      return "/assets/informationImages/TravelingBag.png";
      break;
    case "가방을 부탁해":
      return "/assets/informationImages/GabangPlease.png";
      break;
    case "제주짐돌이":
      return "/assets/informationImages/JimCarry.jpg";
      break;
    case "가방줍쇼":
      return "/assets/informationImages/GiveMeBag.png";
      break;
    case "노코가":
      return "/assets/informationImages/Nokoga.png";
      break;
    case "트립백":
      return "/assets/informationImages/TripBag.png";
      break;
    default:
      return "/assets/Logo.png";
      break;
  }
};

export default porterMapper;
