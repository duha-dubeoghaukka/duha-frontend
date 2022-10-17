const CallTaxiRegionButton = ({ regionName, isActive, setCurrentRegion }) => {
  const regionClickHandler = () => {
    setCurrentRegion(regionName);
  };
  return (
    <div onClick={regionClickHandler}>
      {isActive ? (
        <p className="text-green1 font-bold">{regionName}</p>
      ) : (
        <p className="text-black1 font-bold cursor-pointer hover:brightness-[3]">{regionName}</p>
      )}
    </div>
  );
};

export default CallTaxiRegionButton;
