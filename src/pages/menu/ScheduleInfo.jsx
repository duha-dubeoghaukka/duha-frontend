import React from "react";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Layout from "../../components/layout/Layout";

const ScheduleInfo = () => {
  return (
    <Layout title="일정" highlight={"schedule"}>
      <Link to="/schedule" className="card">
        <div className="card-content">일정 등록</div>
        <NavigateNextIcon />
      </Link>
      <Link to="/schedule/share" className="card">
        <div className="card-content">일정 공유</div>
        <NavigateNextIcon />
      </Link>
    </Layout>
  );
};

export default ScheduleInfo;
