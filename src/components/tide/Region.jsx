import React from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { api } from "../../api/api";

const Region = ({ setTide }) => {
  const data = [
    {
      title: "제주",
      latlng: { lat: 33.5275, lng: 126.543056 }
    },
    {
      title: "서귀포",
      latlng: { lat: 33.24, lng: 126.561667 }
    },
    {
      title: "성산포",
      latlng: { lat: 33.474722, lng: 126.927778 }
    },
    {
      title: "모슬포",
      latlng: { lat: 33.214444, lng: 126.251111 }
    }
  ];

  const getTide = async title => {
    try {
      const {
        data: { data }
      } = await api.get(`/tide?obs=${title}`);
      setTide(data);
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div>
      <p className="font-bold text-sm text-center py-2 md:py-4 my-2 md:my-4 border-2 border-green1 rounded-md shadow-md">
        가고싶은 바다와 가까운 하르방을 선택해주세요!
      </p>
      <Map // 지도를 표시할 Container
        center={{
          // 지도의 중심좌표
          lat: 33.404793,
          lng: 126.5434967
        }}
        style={{
          width: "100%",
          height: "30vh",
          borderRadius: "0.5rem"
        }}
        level={11}
        className="shadow-md"
      >
        {data.map(position => (
          <MapMarker
            key={`${position.title}-${position.latlng}`}
            position={position.latlng}
            image={{
              src: "https://i.ibb.co/yyxq0XX/001.png",
              size: {
                width: 44,
                height: 49
              }
            }}
            title={position.title}
            onClick={() => {
              getTide(position.title);
            }}
          />
        ))}
      </Map>
    </div>
  );
};

export default Region;
