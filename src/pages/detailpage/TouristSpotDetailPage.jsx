import { useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
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
    </Layout>
  );
};

export default TouristSpotDetailPage;
