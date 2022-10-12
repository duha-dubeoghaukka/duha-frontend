import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import FavoriteItemList from "../../components/mypage/FavoriteItemList";
import { routingLoginPage } from "../../utils/routingLoginPage";

function FavoritesListPage() {
  const navigate = useNavigate();

  useEffect(() => {
    routingLoginPage(navigate);
  }, []);

  return (
    <Layout isLoggedIn={false} title="마이페이지" highlight={"mypage/favorites"}>
      <div className="grid place-items-center h-screen">
        <img className="w-56 mt-10 mb-5" src={`${process.env.PUBLIC_URL}/assets/Logo.png`} alt={"Logo"} />
        <FavoriteItemList />
      </div>
    </Layout>
  );
}

export default FavoritesListPage;
