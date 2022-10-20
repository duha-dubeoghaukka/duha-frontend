import Layout from "../../../components/layout/Layout";
import checkIsLoggedIn from "../../../utils/checkIsLoggedIn";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Categories from "./Categories";

const UserComments = () => {
  const navigator = useNavigate();
  const [currentCategory, setCurrentCategory] = useState("관광");
  useEffect(() => {
    if (!checkIsLoggedIn()) {
      alert("로그인이 필요한 서비스입니다.");
      navigator("/login");
    }
  }, []);
  return (
    <Layout title="내가 작성한 댓글 목록" highlight="mypage/comments">
      <Categories currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} />
    </Layout>
  );
};

export default UserComments;
