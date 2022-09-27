import { useContext, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import GlobalState from "../../../shared/GlobalState";

const Map = ({ address }) => {
  const { mapModal } = useContext(GlobalState);
  const { setIsMapModalOpen } = mapModal;
  let validity = false;
  useEffect(() => {
    naver.maps.Service.geocode({ query: address }, (status, response) => {
      if (status === naver.maps.Service.Status.ERROR) {
        validity = false;
      } else {
        const targetAddresses = response.v2.addresses;
        if (targetAddresses.length > 0) {
          validity = true;
          const { x, y } = response.v2.addresses[0];
          const map = new naver.maps.Map("map", {
            mapTypeId: naver.maps.MapTypeId.NORMAL
          });
          const location = new naver.maps.LatLng(y, x);
          map.setCenter(location);
          const marker = new naver.maps.Marker({
            position: location,
            map: map
          });
        } else {
          validity = false;
        }
      }
    });
  }, [address]);
  const closeClickHandler = () => {
    setIsMapModalOpen(false);
  };
  return (
    <div className="relative">
      <div id="map" className="w-[500px] h-[500px] rounded-lg">
        {validity || (
          <div className="w-full h-full bg-white1 rounded-lg p-5">
            <p className="text-black1 font-bold text-[26px] text-center">지도 정보가 존재하지 않습니다.</p>
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
