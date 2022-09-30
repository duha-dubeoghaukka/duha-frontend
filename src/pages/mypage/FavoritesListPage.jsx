import React, { useEffect } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import FavoriteItemList from "../../components/mypage/FavoriteItemList";

function FavoritesListPage() {
  const token = localStorage.getItem("authorization");
  const navigate = useNavigate();

  const routingLogin = () => {
    if (!token) {
      alert("로그인이 필요한 서비스입니다!");
      navigate(`/login`);
    }
  };

  useEffect(() => {
    routingLogin();
  }, []);

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
