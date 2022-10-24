import { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";

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
        {validity || (
          <div className="w-full h-full bg-white1 rounded-lg p-5">
            <p className="text-black1 font-bold text-[26px] text-center">지도 정보를 불러오는 중입니다.</p>
          </div>
        )}
      </div>
      <div className="absolute top-1 right-1 cursor-pointer" onClick={closeClickHandler}>
        <CloseIcon fontSize="large" />
      </div>
    </div>
  );
};

export default Map;
