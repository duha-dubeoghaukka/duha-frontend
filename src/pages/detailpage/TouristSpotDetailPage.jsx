import { useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import MapIcon from "@mui/icons-material/Map";
import ReviewItem from "./ReviewItem";
import { useEffect } from "react";
// import StarRoundedIcon from "@mui/icons-material/StarRounded";

const TouristSpotDetailPage = () => {
  const { spotID } = useParams();
  useEffect(() => {
    window.scrollTo({
      top: 0
    });
  }, []);
  return (
    <Layout isLoggedIn={false} title="관광지 상세" highlight="mainpage/spots">
      <div className="flex justify-between mb-[20px]">
        <div className="flex items-center">
          <h2 className="font-bold text-[26px] mr-1">관광지명</h2>
          <p className="text-[20px] mr-1">(999)</p>
          <FavoriteRoundedIcon sx={{ color: "red" }} />
        </div>
        <div className="cursor-pointer">
          <StarOutlineRoundedIcon fontSize="large" />
        </div>
      </div>
      <div className="mb-[20px]">
        <div className="flex justify-between align-top px-[25px] py-[36px] border-green1 border-[1px] rounded-lg">
          <div>
            <p className="mb-[26px] text-[20px]">주소</p>
            <p className="mb-[26px] text-[20px]">전화번호</p>
            <p className="text-[20px]">영업정보</p>
          </div>
          <div>
            <p className="mb-[34px]">제주특별자치도 00000</p>
            <p className="mb-[34px]">010-0000-0000</p>
            <p>10:00 ~ 18:00 / 휴무일: 매주 일요일</p>
          </div>
          <div>
            <MapIcon className="cursor-pointer" fontSize="large" />
          </div>
        </div>
      </div>
      <div>
        <div className="p-[32px] bg-white1 rounded-lg">
          <div className="mb-[24px]">
            <h3 className="text-[26px]">리뷰</h3>
          </div>
          <div className="grid gap-[44px]">
            <ReviewItem />
            <ReviewItem />
            <ReviewItem />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TouristSpotDetailPage;
