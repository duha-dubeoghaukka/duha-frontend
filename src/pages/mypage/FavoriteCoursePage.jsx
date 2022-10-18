import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { mypageAPIs } from "../../api/api";
import Layout from "../../components/layout/Layout";
import decodeToken from "../../utils/decodeToken";
import Spinner from "../../components/Spinner/Spinner";
import TripItem from "../../components/mypage/TripItem";

function FavoriteCoursePage() {
  const [tripData, setTripData] = useState();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("authorization");
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
    <Layout isLoggedIn={false} title="즐겨찾기 목록" highlight={"mypage/favorites"} isFooterFixed={true}>
      <div className="grid place-items-center mt-10 mb-10">
        <span className="font-semibold md:text-lg text-black2">
          {tripData?.length ? (
            `${nickName}님이 즐겨찾기한 일정`
          ) : (
            <div className="flex flex-col items-center">
              <div className="mb-6">즐겨찾기를 추가해보세요!</div>
              <Link to="/schedule/share" className="animate-bounce bg-green1 text-white px-3 py-1 rounded-md text-base shadow-md">
                일정 보러가기
              </Link>
            </div>
          )}
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
