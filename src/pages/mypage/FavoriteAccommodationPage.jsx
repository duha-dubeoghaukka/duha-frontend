import React from "react";
import Layout from "../../components/layout/Layout";

function FavoriteAccommodationPage() {
  return (
    <Layout isLoggedIn={false} title="마이페이지" highlight={"mypage/favorites"}>
      {}
      <div>숙박 페이지</div>
    </Layout>
  );
}

export default FavoriteAccommodationPage;
