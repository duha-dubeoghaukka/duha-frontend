import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mypageAPIs } from "../../api/api";
import Layout from "../../components/layout/Layout";
import decodeToken from "../../utils/decodeToken";
import Spinner from "../../components/Spinner/Spinner";
import TripItem from "../../components/mypage/TripItem";

function FavoriteCoursePage() {
  const [tripData, setTripData] = useState();
  const navigate = useNavigate();
  const token = localStorage.getItem("authorization");
  const nickName = decodeToken(token);

  useEffect(() => {
    mypageAPIs
      .getFavoriteLists("trip")
      .then(res => setTripData(res.data.data))
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
          {tripData?.length ? `${nickName}님이 즐겨찾기한 일정입니다!` : `일정 즐겨찾기를 추가해보세요!`}
        </span>
        <div className="h-screen">
          {tripData ? (
            tripData?.map(item => {
              return <TripItem key={item.id} item={item} />;
            })
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </Layout>
  );
}

export default FavoriteCoursePage;
