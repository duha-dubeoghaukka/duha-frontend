import Layout from "../../components/layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { useEffect, useState } from "react";
import AddBookrMarkItem from "../../components/schedule/AddBookrMarkItem";
import decodeToken from "../../utils/decodeToken";
import { getCookie } from "../../shared/Cookie";

const AddBookMarkSpot = () => {
  const [myCourse, setMyCourse] = useState([]);

  const token = getCookie("authorization");
  const nickName = decodeToken(token);

  const fetchData = async () => {
    try {
      const {
        data: { data }
      } = await api.get(`/course/bookmark`);
      setMyCourse(data);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout title="일정 관리" highlight={"schedule/create"} isFooterFixed={true}>
      {myCourse.length > 0 ? (
        <div className="font-semibold text-sm text-center py-4">
          {nickName && `${nickName}뚜벅러님이 즐겨찾기한 ${myCourse.length}건이 검색되었습니다`}
        </div>
      ) : (
        <div className="my-4">
          <div className="flex flex-col items-center font-semibold">
            <div className="text-center mb-6">즐겨찾기한 목록이 없습니다</div>
            <Link to="/spots" className="animate-bounce bg-green1 text-white px-3 py-1 rounded-md text-sm shadow-md">
              관광지 보러가기
            </Link>
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
