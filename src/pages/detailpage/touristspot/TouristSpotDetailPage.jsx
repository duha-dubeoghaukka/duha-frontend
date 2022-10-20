import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../../components/layout/Layout";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import MapIcon from "@mui/icons-material/Map";
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
  const commentDeleteHandler = id => {
    if (!checkIsLoggedIn()) {
      alert("로그인 후에 삭제가 가능합니다.");
    } else {
      api
        .delete(`/auth/touristspot/review/${id}`)
        .then(response => {
          refetch();
        })
        .catch(error => {
          alert(error);
        });
    }
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
          <div>
            <p className="font-bold text-sm md:text-xl">📷 {name}</p>
          </div>
          <div className="flex items-center">
            <FavoriteRoundedIcon sx={{ color: "red" }} />
            <p className="ml-0.5 text-sm">{likeNum}</p>
            <TouristSpotDetailBookmark bookmarked={bookmarked} bookmarkHandler={bookmarkHandler} />
          </div>
        </div>
        <div className="justify-between items-center mb-2 md:my-4 hidden md:flex">
          <p className="font-bold text-base md:text-xl">📷 {name}</p>
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
        <div className="mb-2 md:mb-4">
          <div className="px-5 md:px-10 py-3 md:py-5 bg-white1 rounded-md flex flex-col items-start">
            <div className="w-full mb-1 md:mb-2 border-b">
              <div className="flex items-center justify-between">
                <p className="text-base md:text-lg font-semibold">주소</p>
                <MapIcon onClick={mapClickHandler} className="cursor-pointer" fontSize="medium" />
              </div>
            </div>
            <div className="mb-1 md:mb-2 w-full">
              {stations.length > 0 && <p className="text-base md:text-lg font-semibold">가까운 버스 정류장</p>}
              {stations.length > 0 && (
                <div className="mb-2 border-b">
                  {stations
                    .sort((a, b) => {
                      return a.distance - b.distance;
                    })
                    .map(station => {
                      return (
                        <div className="flex items-center mb-2" key={station.stationName}>
                          <DirectionsBusIcon className="mr-1" fontSize="small" />
                          <p className="text-sm text-gray-700">
                            {station.stationName} - {station.distance}m
                          </p>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
            {processedInfo.length > 0 && (
              <div className="w-full">
                {processedInfo.map(info => {
                  return (
                    <div key={info.title} className="mb-2 border-b last:border-none">
                      <p className="text-sm font-semibold text-">{info.title}</p>
                      <p className="text-sm text-gray-700 mb-2">{info.content}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <Comments
          category={"touristspot"}
          id={spotID}
          refetchComments={refetchComments}
          comments={reviews}
          commentDeleteHandler={commentDeleteHandler}
        />
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
