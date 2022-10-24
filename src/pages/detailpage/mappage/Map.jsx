import { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import MapLoading from "./MapLoading";

const Map = ({ setIsMapModalOpen, latitude, longitude }) => {
  let validity = false;
  useEffect(() => {
    const map = new naver.maps.Map("map", {
      mapTypeId: naver.maps.MapTypeId.NORMAL
    });
    const location = new naver.maps.LatLng(latitude, longitude);
    map.setCenter(location);
    new naver.maps.Marker({
      position: location,
      map: map
    });
  }, []);
  const closeClickHandler = () => {
    setIsMapModalOpen(false);
  };
  return (
    <div className="relative">
      <div id="map" className="w-[80vw] h-[80vw] md:w-[500px] md:h-[500px] rounded-lg">
        {validity || <MapLoading />}
      </div>
      <div className="absolute top-1 right-1 cursor-pointer" onClick={closeClickHandler}>
        <CloseIcon fontSize="large" />
      </div>
    </div>
  );
};

export default Map;
