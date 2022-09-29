import React, { useEffect, useState } from "react";
import { mypageAPIs } from "../../api/api";
import Layout from "../../components/layout/Layout";
import CategoryItem from "../../components/mypage/CategoryItem";

function FavoriteSpotsPage() {
  const [spotData, setSpotData] = useState();

  useEffect(() => {
    mypageAPIs.getFavoriteLists("touristspot").then(res => setSpotData(res.data.data));
  }, []);

  return (
    <Layout isLoggedIn={false} title="마이페이지" highlight={"mypage/favorites"}>
      <div className="grid place-items-center m-10">
        <span className="font-medium text-xl">000님이 즐겨찾기하신 관광지 목록을 확인해보세요!</span>
      </div>
      {spotData?.map(item => {
        return <CategoryItem key={item.id} item={item} category={`spots`} categoryName={`관광`} />;
      })}
    </Layout>
  );
}

export default FavoriteSpotsPage;
