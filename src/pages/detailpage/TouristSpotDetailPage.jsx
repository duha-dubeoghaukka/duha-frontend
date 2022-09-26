import { useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import MapIcon from "@mui/icons-material/Map";
import ReviewItem from "./ReviewItem";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { instance } from "../../api/api";
import Spinner from "../../components/Spinner/Spinner";
// import StarRoundedIcon from "@mui/icons-material/StarRounded";

const TouristSpotDetailPage = () => {
  const { isLoading, error, data } = useQuery(["touristSpotDetail"], () => {
    return instance.get("/touristspot/" + spotID);
  });
  const { spotID } = useParams();
  useEffect(() => {
    window.scrollTo({
      top: 0
    });
  }, []);
  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (data) {
    const spot = data.data.data;
    const { address, likeNum, name, phone, touristSpotReviews } = spot;
    return (
      <Layout isLoggedIn={false} title="관광지 상세" highlight="mainpage/spots">
        <div className="flex justify-between mb-[20px]">
          <div className="flex items-center">
            <h2 className="font-bold text-[26px] mr-1">{name}</h2>
            <p className="text-[20px] mr-1">({likeNum})</p>
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
              <p className="mb-[34px]">{address}</p>
              <p className="mb-[34px]">{phone}</p>
              <p>추가 예정</p>
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
              {touristSpotReviews.map(review => {
                return <ReviewItem key={review} data={review} />;
              })}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
};

export default TouristSpotDetailPage;
