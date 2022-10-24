const porterMapper = title => {
  switch (title) {
    case "가방은여행중":
      return "/assets/informationImages/TravelingBag.png";
    case "가방을 부탁해":
      return "/assets/informationImages/GabangPlease.png";
    case "제주짐돌이":
      return "/assets/informationImages/JimCarry.jpg";
    case "가방줍쇼":
      return "/assets/informationImages/GiveMeBag.png";
    case "노코가":
      return "/assets/informationImages/Nokoga.png";
    case "트립백":
      return "/assets/informationImages/TripBag.png";
    default:
      return "/assets/Logo.png";
  }
};

export default porterMapper;
