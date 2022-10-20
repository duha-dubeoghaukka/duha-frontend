import Layout from "../../../components/layout/Layout";
import checkIsLoggedIn from "../../../utils/checkIsLoggedIn";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Categories from "./Categories";
import { useQuery } from "react-query";
import { api } from "../../../api/api";
import Spinner from "../../../components/Spinner/Spinner";
import CommentList from "./CommentList";

const UserComments = () => {
  const { isLoading, error, data, refetch } = useQuery("userComments", () => {
    switch (currentCategory) {
      case "관광":
        return api.get(`/auth/mypage/touristspotreview`);
        break;
      case "맛집":
        return api.get(`/auth/mypage/restaurantreview`);
        break;
      case "숙소":
        return api.get(`/auth/mypage/accommodationreview`);
        break;
      default:
        break;
    }
  });
  const navigator = useNavigate();
  const [currentCategory, setCurrentCategory] = useState("관광");
  useEffect(() => {
    if (!checkIsLoggedIn()) {
      alert("로그인이 필요한 서비스입니다.");
      navigator("/login");
    }
  }, []);
  useEffect(() => {
    refetch();
  }, [currentCategory]);
  if (isLoading) {
    return <Spinner title={"내가 작성한 댓글 목록"} />;
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (data) {
    const comments = data.data.data;
    return (
      <Layout title="내가 작성한 댓글 목록" highlight="mypage/comments">
        <Categories currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} />
        <CommentList comments={comments} currentCategory={currentCategory} />
      </Layout>
    );
  }
};

export default UserComments;
