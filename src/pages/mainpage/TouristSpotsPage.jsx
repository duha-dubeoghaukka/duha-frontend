import regionNames from "../../utils/regionNames.js";
import SpotButton from "../../components/mainpage/SpotButton";
import Item from "../../components/mainpage/Item";
import Layout from "../../components/layout/Layout";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import GlobalState from "../../shared/GlobalState";

const dummyData = [
  {
    name: "이름",
    description: "설명",
    location: "위치",
    likes: 5,
    image: "이미지",
    isFavorite: true
  },
  {
    name: "이름2",
    description: "설명",
    location: "위치",
    likes: 10,
    image: "이미지",
    isFavorite: true
  },
  {
    name: "이름3",
    description: "설명",
    location: "위치",
    likes: 2,
    image: "이미지",
    isFavorite: true
  }
];

const TouristSpotsPage = () => {
  const { selectedRegion } = useContext(GlobalState);
  useEffect(() => {
    selectedRegion.setSelectedRegion("전체");
  }, []);
  return (
    <Layout isLoggedIn={false} title="관광지" highlight={"mainpage/spots"}>
      <div className="mb-[48px]">
        <ul className="flex flex-row justify-around">
          <Link to="/spots" className="font-bold text-2xl text-green1 cursor-pointer">
            관광
          </Link>
          <Link to="/restaurants" className="font-bold text-2xl cursor-pointer">
            맛집
          </Link>
          <Link to="/accommodations" className="font-bold text-2xl cursor-pointer">
            숙소
          </Link>
        </ul>
      </div>
      <div className="mb-[43px]">
        <ul className="flex flex-row justify-between">
          {regionNames.map(place => {
            return <SpotButton key={place.name} {...place} />;
          })}
        </ul>
      </div>
      <div>
        {dummyData
          .sort((a, b) => b.likes - a.likes)
          .map(data => {
            return <Item key={data.name} {...data} />;
          })}
      </div>
    </Layout>
  );
};

export default TouristSpotsPage;
