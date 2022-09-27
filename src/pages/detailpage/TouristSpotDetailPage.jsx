import { Link, useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import MapIcon from "@mui/icons-material/Map";
import ReviewItem from "./ReviewItem";
import { useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { instance } from "../../api/api";
import Spinner from "../../components/Spinner/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper";
import WestIcon from "@mui/icons-material/West";
import GlobalState from "../../shared/GlobalState";
import Map from "./mappage/Map";
// import StarRoundedIcon from "@mui/icons-material/StarRounded";

const TouristSpotDetailPage = () => {
  const { mapModal } = useContext(GlobalState);
  const { isMapModalOpen, setIsMapModalOpen } = mapModal;
  const { isLoading, error, data } = useQuery(["touristSpotDetail"], () => {
    return instance.get("/touristspot/" + spotID);
  });
  const { spotID } = useParams();
  useEffect(() => {
    window.scrollTo({
      top: 0
    });
  }, []);
  const mapClickHandler = () => {
    setIsMapModalOpen(true);
  };
  const backdropClickHandler = () => {
    setIsMapModalOpen(false);
  };
  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (data) {
    const spot = data.data.data;
    const { address, likeNum, name, phone, touristSpotReviews, imgUrl } = spot;
    return (
      <Layout isLoggedIn={false} title="관광지 상세" highlight="mainpage/spots">
        <Link to="/spots" className="flex items-center mb-3">
          <WestIcon className="mr-3" />
          <p className="text-[16px] text-black1">뒤로 가기</p>
        </Link>
        <div className="flex justify-between mb-[20px]">
          <div className="flex items-center">
            <h2 className="font-bold text-[26px] mr-3">{name}</h2>
            <FavoriteRoundedIcon sx={{ color: "red" }} />
            <p className="text-[16px] ml-1">{likeNum}</p>
          </div>
          <div className="cursor-pointer">
            <StarOutlineRoundedIcon fontSize="large" />
          </div>
        </div>
        <div>
          <Swiper
            className="h-[335px] mb-[20px] flex justify-center items-center rounded-lg"
            modules={[Pagination, Autoplay]}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false
            }}
            pagination={{
              dynamicBullets: true,
              clickable: true
            }}
            loop={true}
            speed={300}
          >
            {imgUrl.map(image => {
              return (
                <SwiperSlide key={image}>
                  <img src={image} alt={name} className="w-full h-full object-cover object-center" />
                </SwiperSlide>
              );
            })}
          </Swiper>
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
            <div onClick={mapClickHandler}>
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
                return <ReviewItem key={review.id} data={review} />;
              })}
            </div>
          </div>
        </div>
        {isMapModalOpen && (
          <div>
            <div className="fixed top-0 left-0 z-10 w-[100vw] h-[100vh] bg-black1 opacity-50" onClick={backdropClickHandler}></div>
            <div className="fixed z-10 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] shadow-lg">
              <Map address={address} />
            </div>
          </div>
        )}
      </Layout>
    );
  }
};

export default TouristSpotDetailPage;
