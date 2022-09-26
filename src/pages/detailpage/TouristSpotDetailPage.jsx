import { useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import MapIcon from "@mui/icons-material/Map";
// import StarRoundedIcon from "@mui/icons-material/StarRounded";

const TouristSpotDetailPage = () => {
  const { spotID } = useParams();
  return (
    <Layout isLoggedIn={false} title="관광지 상세" highlight="mainpage/spots">
      <div className="flex justify-between">
        <div className="flex items-center">
          <h2 className="font-bold text-[26px] mr-1">관광지명</h2>
          <p className="text-[20px] mr-1">(999)</p>
          <FavoriteRoundedIcon sx={{ color: "red" }} />
        </div>
        <div>
          <StarOutlineRoundedIcon fontSize="large" />
        </div>
      </div>
      <div>
        <div className="flex justify-between align-top px-[25px] py-[36px] border-green1 border-[1px] rounded-lg">
          <div>
            <p className="mb-[26px]">주소</p>
            <p className="mb-[26px]">전화번호</p>
            <p>영업정보</p>
          </div>
          <div>
            <p className="mb-[26px]">제주특별자치도 00000</p>
            <p className="mb-[26px]">010-0000-0000</p>
            <p>10:00 ~ 18:00 / 휴무일: 매주 일요일</p>
          </div>
          <div>
            <MapIcon className="cursor-pointer" fontSize="large" />
          </div>
        </div>
      </div>
      <div>
        <div>
          <h3>리뷰</h3>
        </div>
        <div className="p-[32px] bg-white1 rounded-lg">
          <div className="flex items-center mb-[28px]">
            <div className="mr-[16px]">
              <p>사진</p>
            </div>
            <div>
              <p>닉네임</p>
              <p>리뷰 등록일</p>
            </div>
          </div>
          <div>
            <p>설명란</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TouristSpotDetailPage;
