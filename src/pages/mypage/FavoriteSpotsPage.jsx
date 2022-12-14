import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { mypageAPIs } from "../../api/api";
import Layout from "../../components/layout/Layout";
import NonLayoutSpinner from "../../components/Spinner/NonLayoutSpinner";
import decodeToken from "../../utils/decodeToken";
import Item from "../../components/mainpage/Item";
import { getCookie } from "../../shared/Cookie";

function FavoriteSpotsPage() {
  const [spotData, setSpotData] = useState();
  const navigate = useNavigate();
  const token = getCookie("authorization");
  const nickName = decodeToken(token);
  const [counter, setCounter] = useState(0);

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
    <Layout isLoggedIn={false} title="즐겨찾기 목록" highlight={"mypage/favorites"} isFooterFixed={true}>
      <div className="grid place-items-center m-5 md:m-10">
        <span className="font-semibold md:text-lg text-black2">
          {spotData?.length ? (
            `${nickName}님이 즐겨찾기한 관광지`
          ) : (
            <div className="flex flex-col items-center">
              <div className="mb-6">즐겨찾기를 추가해보세요!</div>
              <Link to="/spots" className="animate-bounce bg-green1 text-white px-3 py-1 rounded-md text-base shadow-md">
                관광지 보러가기
              </Link>
            </div>
          )}
        </span>
      </div>
      {spotData ? (
        spotData?.map(item => {
          return <Item key={item.id} data={item} counter={counter} setCounter={setCounter} category={`touristspot`} />;
        })
      ) : (
        <NonLayoutSpinner />
      )}
    </Layout>
  );
}

export default FavoriteSpotsPage;
