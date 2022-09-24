import React from "react";
import Layout from "../../components/layout/Layout";

function FavoritesListPage() {
  return (
    <Layout isLoggedIn={false} title="마이페이지" highlight={"mypage/favorites"}>
      <div className="grid place-items-center h-screen"></div>
    </Layout>
  );
}

export default FavoritesListPage;
