import RegionButtonContent from "./RegionButtonContent";

const RegionButton = ({ name, currentRegion, setCurrentRegion }) => {
  const isActive = currentRegion === name;
  const regionButtonClickHandler = () => {
    setCurrentRegion(name);
  };
  if (isActive) {
    return (
      <div className="bg-green1 rounded-full text-white1">
        <RegionButtonContent name={name} />
      </div>
    );
  } else {
    return (
      <div onClick={regionButtonClickHandler}>
        <RegionButtonContent name={name} />
      </div>
    );
  }
};

export default RegionButton;
