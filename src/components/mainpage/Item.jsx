import DirectionsBusFilledOutlinedIcon from "@mui/icons-material/DirectionsBusFilledOutlined";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Bookmark from "./Bookmark";
import MapModal from "./map/MapModal";

const Item = ({ data, category, refetchList }) => {
  const navigator = useNavigate();
  const { id, name, description, region, thumbnailUrl, bookmarked, hasNearStation, latitude, longitude, bookmarkNum } = data;
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const itemClickHandler = () => {
    switch (category) {
      case "touristspot":
        return navigator("/spots/" + id);
      case "restaurant":
        return navigator("/restaurants/" + id);
      case "accommodation":
        return navigator("/accommodations/" + id);
    }
  };
  const mapClickHandler = event => {
    event.stopPropagation();
    setIsMapModalOpen(true);
  };

  const backdropClickHandler = () => {
    setIsMapModalOpen(false);
  };
  return (
    <div className="relative">
      <div
        onClick={itemClickHandler}
        className="p-2 md:p-4 group bg-white1 rounded-md mb-4 shadow-md cursor-pointer flex hover:brightness-95 transition-all"
      >
        <div className="w-[150px] h-[120px] md:w-[220px] md:h-[150px] flex-shrink-0 relative mr-2">
          <img loading="lazy" className="w-full h-full object-cover object-center rounded-md" src={thumbnailUrl} alt={name} />
        </div>
        <div>
          <div className="mb-1 flex items-center justify-start">
            <p className="font-bold text-sm md:text-lg">{name}</p>
            {hasNearStation && (
              <DirectionsBusFilledOutlinedIcon
                fontSize="medium"
                sx={{
                  color: "#ECB390"
                }}
              />
            )}
          </div>
          <div className="hidden md:block">
            <p className="text-xs">{region}</p>
          </div>
          <div className="mb-2">
            <p className="text-xs">{description}</p>
          </div>
          <div className="flex items-center">
            <Bookmark bookmarked={bookmarked} numberOfBookmarks={bookmarkNum} category={category} id={id} refetchList={refetchList} />
          </div>
          <div onClick={mapClickHandler} className="absolute right-2 bottom-2">
            <LocationOnOutlinedIcon className="cursor-pointer" fontSize="medium" />
          </div>
        </div>
      </div>
      {isMapModalOpen && (
        <MapModal
          setIsMapModalOpen={setIsMapModalOpen}
          name={name}
          longitude={longitude}
          latitude={latitude}
          backdropClickHandler={backdropClickHandler}
        />
      )}
    </div>
  );
};

export default Item;
