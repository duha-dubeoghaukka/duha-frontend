import { useEffect } from "react";

const Map = ({ address }) => {
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
        } else {
          validity = false;
        }
      }
    });
  }, [address]);
  return (
    <div>
      <div id="map" className="w-full h-[500px] rounded-lg">
        {validity || <p>지도 정보가 존재하지 않습니다.</p>}
      </div>
    </div>
  );
};

export default Map;
