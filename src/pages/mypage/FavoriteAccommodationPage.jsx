import React, { useEffect, useState } from "react";
import { mypageAPIs } from "../../api/api";
import Layout from "../../components/layout/Layout";
import CategoryItem from "../../components/mypage/CategoryItem";
import Spinner from "../../components/Spinner/Spinner";

function FavoriteAccommodationPage() {
  const [accommodationData, setAccommodationData] = useState();

  useEffect(() => {
    mypageAPIs.getFavoriteLists("accommodation").then(res => setAccommodationData(res.data.data));
  }, []);

  return (
    <Layout isLoggedIn={false} title="마이페이지" highlight={"mypage/favorites"}>
      <div className="grid place-items-center m-10">
        <span className="font-medium text-xl">
          {accommodationData?.length ? "000님이 즐겨찾기하신 숙소 목록을 확인해보세요!" : "숙소 즐겨찾기를 추가해보세요! "}
        </span>
      </div>
      {accommodationData ? (
        accommodationData?.map(item => {
          return <CategoryItem key={item.id} item={item} category={`accommodations`} />;
        })
      ) : (
        <Spinner />
      )}
    </Layout>
  );
}

export default FavoriteAccommodationPage;
