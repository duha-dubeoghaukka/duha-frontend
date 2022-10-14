import React from "react";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Layout from "../../components/layout/Layout";

const MypageInfo = () => {
  return (
    <Layout title="마이 페이지" highlight={"mypage"}>
      <Link to="/mypage/favorites/list" className="card">
        <div className="card-content">즐겨찾기한 목록</div>
        <NavigateNextIcon />
      </Link>
      <Link to="/mypage/user/edit" className="card">
        <div className="card-content">회원 정보 변경</div>
        <NavigateNextIcon />
      </Link>
    </Layout>
  );
};

export default MypageInfo;
