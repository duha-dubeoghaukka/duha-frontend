import { React, useState } from "react";
import { Map, MapMarker, useMap, Polyline } from "react-kakao-maps-sdk";

const MapContainer = ({ dayCourse }) => {
  console.log(dayCourse);
  const data = [
    {
      content: <div className="px-2 py-1 text-sm font-bold text-black1">천지연폭포</div>,
      latlng: { lat: 33.2447173, lng: 126.5598201 }
    },
    {
      content: <div className="px-2 py-1 text-sm font-bold text-black1">쇠소깍</div>,
      latlng: { lat: 33.2522055, lng: 126.6231188 }
    },
    {
      content: <div className="px-2 py-1 text-sm font-bold text-black1">우도(해양도립공원)</div>,
      latlng: { lat: 33.51949, lng: 126.95109 }
    },
    {
      content: <div className="px-2 py-1 text-sm font-bold text-black1">쇠소깍</div>,
      latlng: { lat: 33.2522055, lng: 126.6231188 }
    }
  ];

  const EventMarkerContainer = ({ position, content }) => {
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
        {isVisible && content}
      </MapMarker>
    );
  };

  return (
    <Map
      center={{
        // 지도의 중심좌표
        lat: data[0].latlng.lat,
        lng: data[0].latlng.lng
      }}
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "0.5rem"
      }}
      level={10} // 지도의 확대 레벨
    >
      <Polyline
        path={[
          [
            { lat: 33.2447173, lng: 126.5598201 },
            { lat: 33.2522055, lng: 126.6231188 },
            { lat: 33.51949, lng: 126.95109 },
            { lat: 33.2522055, lng: 126.6231188 }
          ]
        ]}
        strokeWeight={5}
        strokeColor={"#7FB77E"}
        strokeOpacity={1}
        strokeStyle={"shortdash"}
      />

      {data.map(value => (
        <EventMarkerContainer
          key={`EventMarkerContainer-${value.latlng.lat}-${value.latlng.lng}`}
          position={value.latlng}
          content={value.content}
          image={{
            src: "https://i.ibb.co/yyxq0XX/001.png",
            size: {
              width: 44,
              height: 49
            }
          }}
        />
      ))}
    </Map>
  );
};

export default MapContainer;
