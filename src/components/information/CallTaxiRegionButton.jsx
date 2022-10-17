const CallTaxiRegionButton = ({ regionName, isActive, setCurrentRegion }) => {
  const regionClickHandler = () => {
    setCurrentRegion(regionName);
  };
  return (
    <div className="cursor-pointer hover:brightness-90" onClick={regionClickHandler}>
      {isActive ? <p className="text-green1 font-bold">{regionName}</p> : <p className="text-black1 font-bold">{regionName}</p>}
    </div>
  );
};

export default CallTaxiRegionButton;
