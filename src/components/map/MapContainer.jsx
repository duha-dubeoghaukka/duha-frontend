import React from "react";
import { Map, MapMarker, useMap } from "react-kakao-maps-sdk";

const MapContainer = ({ dayCourse }) => {
  console.log(dayCourse);
  return (
    <Map // 지도를 표시할 Container
      center={{
        // 지도의 중심좌표
        lat: 33.450701,
        lng: 126.570667
      }}
      style={{
        width: "100%",
        height: "100%"
      }}
      level={3} // 지도의 확대 레벨
    >
      <MapMarker
        position={{
          // 마커가 표시될 위치입니다
          lat: 33.450701,
          lng: 126.570667
        }}
        image={{
          src: "https://i.ibb.co/yyxq0XX/001.png",
          size: {
            width: 64,
            height: 69
          },
          options: {
            offset: {
              x: 27,
              y: 69
            }
          }
        }}
      />
    </Map>
  );
};

export default MapContainer;
