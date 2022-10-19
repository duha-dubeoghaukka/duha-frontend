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

const RegionButtonContent = ({ name }) => {
  return (
    <p className="border-2 border-green1 cursor-pointer px-3 py-2 rounded-full font-semibold text-sm hover:bg-green1 hover:text-white transition-all ease-in-out">
      {name}
    </p>
  );
};

export default RegionButton;
