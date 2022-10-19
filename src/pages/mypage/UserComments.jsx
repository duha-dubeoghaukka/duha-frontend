import Layout from "../../components/layout/Layout";
import checkIsLoggedIn from "../../utils/checkIsLoggedIn";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const UserComments = () => {
  const navigator = useNavigate();
  useEffect(() => {
    if (!checkIsLoggedIn()) {
      alert("로그인이 필요한 서비스입니다.");
      navigator("/login");
    }
  }, []);
  return (
    <Layout title="내가 작성한 댓글 목록" highlight="mypage/comments">
      wow
    </Layout>
  );
};

export default UserComments;
