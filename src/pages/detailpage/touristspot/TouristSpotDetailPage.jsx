import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../../components/layout/Layout";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import MapIcon from "@mui/icons-material/Map";
import ReviewItem from "../ReviewItem";
import { useContext, useEffect } from "react";
import { useQuery } from "react-query";
import Spinner from "../../../components/Spinner/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper";
import WestIcon from "@mui/icons-material/West";
import GlobalState from "../../../shared/GlobalState";
import Map from "../mappage/Map";
import { api } from "../../../api/api";
import TouristSpotDetailBookmark from "./TouristSpotDetailBookmark";
import checkIsLoggedIn from "../../../utils/checkIsLoggedIn";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import processInfo from "../../../utils/processInfo";
import Comments from "../../../components/mainpage/Comments";

const TouristSpotDetailPage = () => {
  const navigate = useNavigate();
  const { mapModal } = useContext(GlobalState);
  const { isMapModalOpen, setIsMapModalOpen } = mapModal;
  const { isLoading, error, data, refetch } = useQuery(["touristSpotDetail"], () => {
    return api.get("/touristspot/" + spotID);
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
  const refetchComments = () => {
    refetch();
  };
  const bookmarkHandler = () => {
    const isLoggedIn = checkIsLoggedIn();
    if (isLoggedIn) {
      api
        .get("/auth/touristspot/bookmark/" + spotID)
        .then(response => {
          if (response.data.isSuccess) {
            refetch();
          } else {
            alert(response.data.message);
          }
        })
        .catch(error => {
          alert(error);
        });
    } else {
      alert("로그인을 먼저 해주세요");
    }
  };
  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (data) {
    const spot = data.data.data;
    const { address, likeNum, name, phone, reviews, imgUrl, bookmarked, description, stations, info } = spot;
    const processedInfo = processInfo(info);
    return (
      <Layout isLoggedIn={false} title="관광지 상세" highlight="mainpage/spots">
        <div className="md:hidden flex justify-between items-center">
          <div className="flex items-center">
            <WestIcon onClick={() => navigate(-1)} className="mr-1" />
            <p className="font-bold text-sm md:text-xl">{name}</p>
          </div>
          <div className="flex items-center">
            <FavoriteRoundedIcon sx={{ color: "red" }} />
            <p className="ml-0.5 text-sm">{likeNum}</p>
            <TouristSpotDetailBookmark bookmarked={bookmarked} bookmarkHandler={bookmarkHandler} />
          </div>
        </div>
        <div className="justify-between items-center mb-2 md:my-4 hidden md:flex">
          <p className="font-bold text-base md:text-xl">{name}</p>
          <div className="flex items-center">
            <FavoriteRoundedIcon sx={{ color: "red" }} />
            <p className="ml-0.5">{likeNum}</p>
            <TouristSpotDetailBookmark bookmarked={bookmarked} bookmarkHandler={bookmarkHandler} />
          </div>
        </div>
        <div className="mb-2 md:mb-4">
          <Swiper
            className="h-72 md:h-96 rounded-md"
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
        {/* {description && (
          <div className="mb-3">
            <p className="text-black1">{description}</p>
          </div>
        )} */}
        <div className="mb-[20px]">
          <div className="px-5 md:px-10 py-3 md:py-5 border-green1 border-2 rounded-md flex flex-col items-start">
            <div className="w-full mb-1 md:mb-2">
              <div className="flex items-center justify-between">
                <p className="text-base md:text-lg font-semibold">주소</p>
                <MapIcon onClick={mapClickHandler} className="cursor-pointer" fontSize="medium" />
              </div>
              <p className="text-sm text-gray-700">{address}</p>
            </div>
            <div className="mb-1 md:mb-2">
              <p className="text-base md:text-lg font-semibold">전화번호</p>
              <p className="text-sm text-gray-700">{phone}</p>
            </div>
            {processedInfo.length > 0 && (
              <div className="mb-1 md:mb-2">
                <p className="text-base md:text-lg font-semibold">영업정보</p>
                <div>
                  {processedInfo.map(info => {
                    return (
                      <div key={info.title} className="mb-2">
                        <p className="font-semibold text-sm">{info.title}</p>
                        <p className="text-sm text-gray-700">{info.content}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            <div className="mb-1 md:mb-2">
              {stations.length > 0 && <p className="text-base md:text-lg font-semibold">가까운 버스 정류장</p>}
              {stations.length > 0 && (
                <div>
                  {stations
                    .sort((a, b) => {
                      return a.distance - b.distance;
                    })
                    .map(station => {
                      return (
                        <div className="flex items-center" key={station.stationName}>
                          <DirectionsBusIcon className="mr-1" />
                          <p className="text-sm text-gray-700">
                            {station.stationName} - {station.distance}m
                          </p>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
        </div>
        <Comments category={"touristspot"} id={spotID} refetchComments={refetchComments} />
        <div>
          <div className="bg-white1 rounded-md px-5 md:px-10 py-3 md:py-5">
            <p className="text-base md:text-lg font-semibold">리뷰</p>
            <div className="grid gap-[44px]">
              {reviews.map(review => {
                return <ReviewItem key={review.id} data={review} />;
              })}
            </div>
          </div>
        </div>
        {isMapModalOpen && (
          <div>
            <div className="fixed top-0 left-0 z-10 w-[100vw] h-[100vh] bg-black1 opacity-50" onClick={backdropClickHandler}></div>
            <div className="fixed z-10 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] shadow-lg">
              <Map address={address} name={name} />
            </div>
          </div>
        )}
      </Layout>
    );
  }
};

export default TouristSpotDetailPage;
