import regionNames from "../../utils/regionNames.js";
import RegionButton from "../../components/mainpage/RegionButton";
import Item from "../../components/mainpage/Item";
import Layout from "../../components/layout/Layout";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import GlobalState from "../../shared/GlobalState";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurants } from "../../redux/modules/getDataSlice";

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

const RestaurantsPage = () => {
  const response = useSelector(state => state.getDataReducer);
  const dispatcher = useDispatch();
  const { selectedRegion } = useContext(GlobalState);
  useEffect(() => {
    selectedRegion.setSelectedRegion("전체");
    dispatcher(getRestaurants());
  }, [dispatcher]);
  if (response.isLoading) {
    return <div>Loading...</div>;
  }
  if (response.error) {
    return <div>{response.error}</div>;
  }
  if (response.data) {
    const restaurants = [...response.data];
    const filteredRestaurants = restaurants.filter(restaurant => {
      switch (selectedRegion.selectedRegion) {
        case "제주 시내":
          return restaurant.region === "제주시내";
          break;
        case "애월":
          return restaurant.region === "애월";
          break;
        case "중문":
          return restaurant.region === "중문";
          break;
        case "서귀포":
          return restaurant.region === "서귀포시내";
          break;
        case "우도&성산":
          return restaurant.region === "우도" || restaurant.region === "성산";
          break;
        case "구좌&조천":
          return restaurant.region === "구좌" || restaurant.region === "조천";
          break;
        case "전체":
          return ["제주시내", "애월", "중문", "서귀포시내", "우도", "성산", "구좌", "조천"].includes(restaurant.region);
          break;
        default:
          return false;
          break;
      }
    });
    const processedRestaurants = filteredRestaurants.sort((a, b) => b.likeNum - a.likeNum);
    const numberOfProcessedRestaurants = processedRestaurants.length;
    return (
      <Layout isLoggedIn={false} title="맛집" highlight={"mainpage/restaurants"}>
        <div className="mb-[48px]">
          <ul className="flex flex-row justify-around">
            <Link to="/spots" className="font-bold text-2xl cursor-pointer">
              관광
            </Link>
            <Link to="/restaurants" className="font-bold text-2xl text-green1 cursor-pointer">
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
              return <RegionButton key={place.name} {...place} />;
            })}
          </ul>
        </div>
        <div className="mb-3">
          <p className="font-bold">총 {numberOfProcessedRestaurants}건이 검색되었습니다.</p>
        </div>
        <div>
          {processedRestaurants.map(restaurant => {
            return <Item key={restaurant.id} data={restaurant} />;
          })}
        </div>
      </Layout>
    );
  }
};

export default RestaurantsPage;
