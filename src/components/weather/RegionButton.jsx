const RegionButton = ({ regionName }) => {
  return (
    <div className="cursor-pointer hover:brightness-90">
      <p className="text-white1 font-bold text-xl">{regionName}</p>
    </div>
  );
};

export default RegionButton;
