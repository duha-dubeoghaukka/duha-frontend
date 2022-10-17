import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Layout from "../../components/layout/Layout";
import { routingLoginPage } from "../../utils/routingLoginPage";

const ScheduleInfo = () => {
  const navigate = useNavigate();

  useEffect(() => {
    routingLoginPage(navigate);
  }, []);

  return (
    <Layout title="일정" highlight={"schedule"}>
      <Link to="/schedule" className="card">
        <div className="card-content">일정 관리</div>
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
