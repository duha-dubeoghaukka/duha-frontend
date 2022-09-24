import React from "react";
import Layout from "../../components/layout/Layout";
import FavoriteItemList from "../../components/mypage/FavoriteItemList";

function FavoritesListPage() {
  return (
    <Layout isLoggedIn={false} title="마이페이지" highlight={"mypage/favorites"}>
      <div className="grid place-items-center h-screen">
        <img className="w-56 m-6" src={`${process.env.PUBLIC_URL}/assets/Logo.png`} />
        <FavoriteItemList />
      </div>
    </Layout>
  );
}

export default FavoritesListPage;
