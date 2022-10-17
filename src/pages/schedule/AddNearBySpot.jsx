import Layout from "../../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import AddNearByItem from "../../components/schedule/AddNearByItem";
import { api } from "../../api/api";
import { useEffect, useState } from "react";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

const AddNearBySpot = () => {
  const [nearByCourse, setNearByCourse] = useState([]);
  const latitude = sessionStorage.getItem("latitude");
  const longitude = sessionStorage.getItem("longitude");
  const lastCourseName = sessionStorage.getItem("name");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const {
        data: { data }
      } = await api.get(`/course/nearby?latitude=${latitude}&longitude=${longitude}`);
      setNearByCourse(data);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout title="일정 관리" highlight={"schedule/create"}>
      {nearByCourse.length > 0 ? (
        <div className="font-semibold text-sm text-center py-4">
          {lastCourseName}부터 가까운 여행지 {nearByCourse.length}건이 검색되었습니다.
        </div>
      ) : (
        <div>
          <div className="font-semibold text-sm text-center mb-4">{lastCourseName}부터 가까운 여행지가 없습니다.</div>
          <div className="flex justify-center items-center">
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="font-semibold text-sm text-center px-4 py-2 rounded-lg mx-2"
            >
              <ArrowBackOutlinedIcon />
              돌아가기
            </button>
          </div>
        </div>
      )}
      {nearByCourse.length > 0 &&
        nearByCourse.map(item => {
          return <AddNearByItem key={item.id} data={item} lastCourseName={lastCourseName} />;
        })}
    </Layout>
  );
};

export default AddNearBySpot;
