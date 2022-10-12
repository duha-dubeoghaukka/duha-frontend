import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mypageAPIs } from "../../api/api";
import Layout from "../../components/layout/Layout";
import CategoryItem from "../../components/mypage/CategoryItem";
import Spinner from "../../components/Spinner/Spinner";
import decodeToken from "../../utils/decodeToken";

function FavoriteSpotsPage() {
  const [spotData, setSpotData] = useState();
  const navigate = useNavigate();
  const token = localStorage.getItem("authorization");
  const nickName = decodeToken(token);

  useEffect(() => {
    mypageAPIs
      .getFavoriteLists("touristspot")
      .then(res => setSpotData(res.data.data))
      .catch(err => {
        if (err.response.data.code === "NEED_LOGIN") {
          alert("로그인이 필요한 서비스입니다.");
          navigate(`/login`);
        }
      });
  }, []);

  return (
    <Layout isLoggedIn={false} title="마이페이지" highlight={"mypage/favorites"}>
      <div className="grid place-items-center mt-10 mb-10">
        <span className="font-medium text-lg text-black2">
          {spotData?.length ? `${nickName}님이 즐겨찾기한 관광지입니다!` : `관광지 즐겨찾기를 추가해보세요!`}
        </span>
      </div>
      {spotData ? (
        spotData?.map(item => {
          return <CategoryItem key={item.id} item={item} category={`spots`} />;
        })
      ) : (
        <Spinner />
      )}
    </Layout>
  );
}

export default FavoriteSpotsPage;
