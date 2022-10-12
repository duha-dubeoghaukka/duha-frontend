import Layout from "../../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { useEffect, useState } from "react";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import AddBookrMarkItem from "../../components/schedule/AddBookrMarkItem";
import decodeToken from "../../utils/decodeToken";

const AddBookMarkSpot = () => {
  const [myCourse, setMyCourse] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("authorization");
  const nickName = decodeToken(token);

  const fetchData = async () => {
    try {
      const {
        data: { data }
      } = await api.get(`/course/bookmark`);
      setMyCourse(data);
      console.log(data);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout title="일정 등록" highlight={"schedule/create"}>
      {myCourse.length > 0 ? (
        <div className="font-semibold text-sm text-center py-4">
          {nickName && `${nickName}뚜벅러님이 즐겨찾기한 ${myCourse.length}건이 검색되었습니다.`}
        </div>
      ) : (
        <div>
          <div className="font-semibold text-sm text-center mb-4">즐겨찾기한 목록이 없습니다.</div>
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
      {myCourse.length > 0 &&
        myCourse.map(item => {
          return <AddBookrMarkItem key={item.id} data={item} myCourse={myCourse} />;
        })}
    </Layout>
  );
};

export default AddBookMarkSpot;
