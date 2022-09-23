import { useContext } from "react";
import GlobalState from "../../shared/GlobalState";

const SpotButton = ({ name }) => {
  const { selectedRegion } = useContext(GlobalState);
  const clickRegionHandler = () => {
    selectedRegion.setSelectedRegion(name);
  };
  if (selectedRegion.selectedRegion === name) {
    return (
      <div>
        <p className="bg-green1 cursor-pointer w-[70px] h-[43px] rounded-xl text-white1 font-bold text-[16px] shadow-md flex justify-center items-center">
          {name}
        </p>
      </div>
    );
  } else {
    return (
      <div
        onClick={clickRegionHandler}
        className="w-[70px] h-[43px] text-[16px] flex justify-center items-center bg-white1 rounded-lg font-bold shadow-md cursor-pointer"
      >
        <p className="text-black1">{name}</p>
      </div>
    );
  }
};

export default SpotButton;