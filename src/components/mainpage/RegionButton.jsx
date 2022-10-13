import { useContext } from "react";
import GlobalState from "../../shared/GlobalState";

const RegionButton = ({ name }) => {
  const { regionSelection, spotPageSelection, restaurantPageSelection, accommodationPageSelection } = useContext(GlobalState);
  const { selectedRegion, setSelectedRegion } = regionSelection;
  const { setCurrentSpotPage } = spotPageSelection;
  const { setCurrentRestaurantPage } = restaurantPageSelection;
  const { setCurrentAccommodationPage } = accommodationPageSelection;
  const clickRegionHandler = () => {
    setCurrentSpotPage(1);
    setCurrentRestaurantPage(1);
    setCurrentAccommodationPage(1);
    setSelectedRegion(name);
  };
  if (selectedRegion === name) {
    return <p className="bg-green1 cursor-pointer px-4 py-2 rounded-full text-white font-semibold text-sm shadow-md">{name}</p>;
  } else {
    return (
      <p
        onClick={clickRegionHandler}
        className="border-2 border-green1 cursor-pointer px-4 py-2 rounded-full font-semibold text-sm hover:bg-green1 hover:text-white transition-all ease-in-out"
      >
        {name}
      </p>
    );
  }
};

export default RegionButton;
