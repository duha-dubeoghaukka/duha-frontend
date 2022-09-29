import React from "react";
import Layout from "../../components/layout/Layout";

function FavoriteSpotsPage() {
  return (
    <Layout isLoggedIn={false} title="마이페이지" highlight={"mypage/favorites"}>
      {}
      <div>관광 페이지</div>
    </Layout>
  );
}

export default FavoriteSpotsPage;
