import { data } from "autoprefixer";
import { React, useState } from "react";
import { Map, MapMarker, useMap, Polyline } from "react-kakao-maps-sdk";

const MapContainer = ({ dayCourse }) => {
  const mapData = dayCourse.map(course => {
    return {
      name: <div className="px-2 py-1 text-sm font-bold text-black1">{course.name}</div>,
      detailId: course.detailId,
      latlng: { lat: course.latitude, lng: course.longitude }
    };
  });

  const data = dayCourse.map(item => {
    return {
      lat: item.latitude,
      lng: item.longitude
    };
  });

  const EventMarkerContainer = ({ position, name }) => {
    const map = useMap();
    const [isVisible, setIsVisible] = useState(false);

    return (
      <MapMarker
        position={position} // 마커를 표시할 위치
        onClick={marker => map.panTo(marker.getPosition())}
        onMouseOver={() => setIsVisible(true)}
        onMouseOut={() => setIsVisible(false)}
        image={{
          src: "https://i.ibb.co/yyxq0XX/001.png",
          size: {
            width: 44,
            height: 49
          }
        }}
      >
        {isVisible && name}
      </MapMarker>
    );
  };

  return (
    <Map
      center={{
        // 지도의 중심좌표
        lat: mapData[0].latlng.lat,
        lng: mapData[0].latlng.lng
      }}
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "0.5rem"
      }}
      level={7} // 지도의 확대 레벨
    >
      <Polyline path={[data]} strokeWeight={5} strokeColor={"#7FB77E"} strokeOpacity={1} strokeStyle={"shortdash"} />
      {mapData.map(item => (
        <EventMarkerContainer key={item.detailId} position={item.latlng} name={item.name} />
      ))}
    </Map>
  );
};

export default MapContainer;
