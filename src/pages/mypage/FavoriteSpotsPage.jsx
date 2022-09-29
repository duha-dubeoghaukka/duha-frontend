import React, { useEffect, useState } from "react";
import { mypageAPIs } from "../../api/api";
import Layout from "../../components/layout/Layout";
import CategoryItem from "../../components/mypage/CategoryItem";

function FavoriteSpotsPage() {
  const [spotData, setSpotData] = useState();

  useEffect(() => {
    mypageAPIs.getFavoritesSpot().then(res => setSpotData(res.data.data));
  }, []);

  return (
    <Layout isLoggedIn={false} title="마이페이지" highlight={"mypage/favorites"}>
      {spotData?.map(item => {
        return <CategoryItem key={item.id} item={item} />;
      })}
    </Layout>
  );
}

export default FavoriteSpotsPage;
