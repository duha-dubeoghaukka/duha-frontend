import React from "react";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Layout from "../../components/layout/Layout";

const Info = () => {
  return (
    <Layout title="정보" highlight={"mainpage/info"}>
      <Link to="/weather" className="card">
        <div className="card-content">날씨 더 알아보기</div>
        <NavigateNextIcon />
      </Link>
      <Link to="/tide" className="card">
        <div className="card-content">물 때 알아보기</div>
        <NavigateNextIcon />
      </Link>
      <Link to="/information" className="card">
        <div className="card-content">뚜벅이를 위한 서비스</div>
        <NavigateNextIcon />
      </Link>
    </Layout>
  );
};

export default Info;
