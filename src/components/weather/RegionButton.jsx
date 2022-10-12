const RegionButton = ({ regionName, isActive, setCurrentRegion }) => {
  const regionClickHandler = () => {
    switch (regionName) {
      case "제주시":
        setCurrentRegion("jeju");
        break;
      case "성산포":
        setCurrentRegion("seongsanpo");
        break;
      case "서귀포시":
        setCurrentRegion("seogwipo");
        break;
      case "모슬포":
        setCurrentRegion("moseulpo");
        break;
      default:
        setCurrentRegion("jeju");
        break;
    }
  };
  if (isActive) {
    return (
      <div>
        <p className="text-green1 font-bold text-xl">{regionName}</p>
      </div>
    );
  } else {
    return (
      <div className="cursor-pointer hover:brightness-90" onClick={regionClickHandler}>
        <p className="text-white1 font-bold text-xl">{regionName}</p>
      </div>
    );
  }
};

export default RegionButton;
