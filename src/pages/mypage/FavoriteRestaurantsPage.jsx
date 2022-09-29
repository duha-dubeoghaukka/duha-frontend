import React from "react";
import Layout from "../../components/layout/Layout";
import CategoryItem from "../../components/mypage/CategoryItem";

function FavoriteRestaurantsPage() {
  return (
    <Layout isLoggedIn={false} title="마이페이지" highlight={"mypage/favorites"}>
      <CategoryItem />
    </Layout>
  );
}

export default FavoriteRestaurantsPage;
