import React, { useEffect, useState } from "react";
import { mypageAPIs } from "../../api/api";
import Spinner from "../Spinner/Spinner";
import Card from "../card/Card";

function FavoriteItemList() {
  const [favoriteScheduleNum, setFavoriteScheduleNum] = useState();
  const [favoriteSpotNum, setFavoriteSpotNum] = useState();
  const [favoriteRestaurantNum, setFavoriteRestaurantNum] = useState();
  const [favoriteAccommodateNum, setFavoriteAccommodateNum] = useState();
  const [isData, setIsData] = useState(false);

  const data = [
    {
      title: `즐겨찾기한 일정 ${favoriteScheduleNum}개`,
      route: `/mypage/favorites/course`
    },
    {
      title: `즐겨찾기한 관광 ${favoriteSpotNum}개`,
      route: `/mypage/favorites/spots`
    },
    {
      title: `즐겨찾기한 맛집 ${favoriteRestaurantNum}개`,
      route: `/mypage/favorites/restaurant`
    },
    {
      title: `즐겨찾기한 숙소 ${favoriteAccommodateNum}개`,
      route: `/mypage/favorites/accommodation`
    }
  ];

  useEffect(() => {
    mypageAPIs
      .getFavoritesNum()
      .then(res => {
        if (res.data.isSuccess) {
          setIsData(true);
          setFavoriteScheduleNum(res.data.data.tripBookmarkNum);
          setFavoriteSpotNum(res.data.data.touristSpotBookmarkNum);
          setFavoriteRestaurantNum(res.data.data.restaurantBookmarkNum);
          setFavoriteAccommodateNum(res.data.data.accommodationBookmarkNum);
        } else {
          setIsData(false);
        }
      })
      .catch(err => {
        console.log("err", err);
      });
  }, []);

  return (
    <div className="h-screen">
      {isData ? (
        data.map((item, index) => {
          return <Card key={index} title={item.title} route={item.route} />;
        })
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default FavoriteItemList;
