import placeNames from "../../utils/placeNames.js";
import SpotButton from "../../components/mainpage/SpotButton";
import Item from "../../components/mainpage/Item";
import Layout from "../../components/layout/Layout";

const dummyData = [
  {
    name: "이름",
    description: "설명",
    location: "위치",
    likes: 999,
    image: "이미지",
    isFavorite: true
  },
  {
    name: "이름2",
    description: "설명",
    location: "위치",
    likes: 999,
    image: "이미지",
    isFavorite: true
  },
  {
    name: "이름3",
    description: "설명",
    location: "위치",
    likes: 999,
    image: "이미지",
    isFavorite: true
  }
];

const TouristSpots = () => {
  return (
    <Layout isLoggedIn={false} title="관광지" highlight={"mainpage/spots"}>
      <div className="mb-[48px]">
        <ul className="flex flex-row justify-around">
          <li className="font-bold text-2xl text-green1 cursor-pointer">관광</li>
          <li className="font-bold text-2xl cursor-pointer">맛집</li>
          <li className="font-bold text-2xl cursor-pointer">숙소</li>
        </ul>
      </div>
      <div className="mb-[43px]">
        <ul className="flex flex-row justify-between">
          <li className="bg-green1 cursor-pointer w-[70px] h-[43px] rounded-xl text-white1 font-bold text-[16px] shadow-md flex justify-center items-center">
            전체
          </li>
          {placeNames.map(place => {
            return <SpotButton key={place.name} {...place} />;
          })}
        </ul>
      </div>
      <div>
        {dummyData.map(data => {
          return <Item key={data.name} {...data} />;
        })}
      </div>
    </Layout>
  );
};

export default TouristSpots;
