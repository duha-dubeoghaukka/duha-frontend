import React, { useEffect, useState } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate } from "react-router-dom";
import { mypageAPIs } from "../../api/api";

function FavoriteItemList() {
  const [favoriteScheduleNum, setFavoriteScheduleNum] = useState();
  const [favoriteSpotNum, setFavoriteSpotNum] = useState();
  const [favoriteRestaurantNum, setFavoriteRestaurantNum] = useState();
  const [favoriteAccommodateNum, setFavoriteAccommodateNum] = useState();

  const data = [
    {
      title: `즐겨찾기한 일정 ${favoriteScheduleNum}개`,
      route: ``
    },
    {
      title: `즐겨찾기한 관광 ${favoriteSpotNum}개`,
      route: ``
    },
    {
      title: `즐겨찾기한 맛집 ${favoriteRestaurantNum}개`,
      route: ``
    },
    {
      title: `즐겨찾기한 숙소 ${favoriteAccommodateNum}개`,
      route: ""
    }
  ];

  useEffect(() => {
    mypageAPIs
      .getFavoritesNum()
      .then(res => {
        setFavoriteScheduleNum(res.data.data.tripBookmarkNum);
        setFavoriteSpotNum(res.data.data.touristSpotBookmarkNum);
        setFavoriteRestaurantNum(res.data.data.restaurantBookmarkNum);
        setFavoriteAccommodateNum(res.data.data.accommodationBookmarkNum);
      })
      .catch(err => {
        console.log("err", err);
      });
  }, []);

  return (
    <div className="h-screen">
      {data.map((item, index) => {
        return <FavoriteItemListComponent key={index} title={item.title} route={item.route} />;
      })}
    </div>
  );
}

function FavoriteItemListComponent({ title, route }) {
  const navigate = useNavigate();

  return (
    <div className="group w-96 h-28 bg-white1 rounded-md shadow-lg mt-5 flex flex-row hover:bg-green1">
      <div className="flex space-x-20">
        <div className="flex flex-col m-6 p-3 w-48">
          <span className="mt-2	font-bold group-hover:text-white1">{title}</span>
        </div>
        <div className="flex flex-row m-5 ">
          <NavigateNextIcon className="mt-5 cursor-pointer group-hover:fill-white1" onClick={() => navigate(`${route}`)} />
        </div>
      </div>
    </div>
  );
}

export default FavoriteItemList;
