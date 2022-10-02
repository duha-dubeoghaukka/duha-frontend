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
    <Map // 지도를 표시할 Container
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
        strokeWeight={5} // 선의 두께 입니다
        strokeColor={"#7FB77E"} // 선의 색깔입니다
        strokeOpacity={1} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle={"shortdash"} // 선의 스타일입니다
      />

      {/* {positions.map((position, index) => (
        <MapMarker
          key={`${position.title}-${position.latlng}`}
          position={position.latlng} // 마커를 표시할 위치
          image={{
            src: "https://i.ibb.co/yyxq0XX/001.png",
            size: {
              width: 44,
              height: 49
            }
          }}
          title={position.title} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        />
      ))} */}

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
