import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mypageAPIs } from "../../api/api";
import Layout from "../../components/layout/Layout";
import CategoryItem from "../../components/mypage/CategoryItem";
import Spinner from "../../components/Spinner/Spinner";
import decodeToken from "../../utils/decodeToken";

function FavoriteRestaurantsPage() {
  const [restaurantData, setRestaurantData] = useState();
  const navigate = useNavigate();
  const token = localStorage.getItem("authorization");
  const nickName = decodeToken(token);

  useEffect(() => {
    mypageAPIs
      .getFavoriteLists("restaurant")
      .then(res => setRestaurantData(res.data.data))
      .catch(err => {
        if (err.response.data.code === "NEED_LOGIN") {
          alert("로그인이 필요한 서비스입니다.");
          navigate(`/login`);
        }
      });
  }, []);

  return (
    <Layout isLoggedIn={false} title="마이페이지" highlight={"mypage/favorites"}>
      <div className="grid place-items-center m-10">
        <span className="font-medium text-xl">
          {restaurantData?.length ? `${nickName}님이 즐겨찾기하신 맛집 목록을 확인해보세요!` : `맛집 즐겨찾기를 추가해보세요!`}
        </span>
      </div>
      {restaurantData ? (
        restaurantData?.map(item => {
          return <CategoryItem key={item.id} item={item} category={`restaurants`} />;
        })
      ) : (
        <Spinner />
      )}
    </Layout>
  );
}

export default FavoriteRestaurantsPage;
