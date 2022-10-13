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
import checkIsLoggedIn from "../../../utils/checkIsLoggedIn";
import RestaurantDetailBookmark from "./RestaurantDetailBookmark";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import processInfo from "../../../utils/processInfo";
import Comments from "../../../components/mainpage/Comments";

const RestaurantDetailPage = () => {
  const navigate = useNavigate();
  const { mapModal } = useContext(GlobalState);
  const { isMapModalOpen, setIsMapModalOpen } = mapModal;
  const { isLoading, error, data, refetch } = useQuery(["restaurantDetail"], () => {
    return api.get("/restaurant/" + restaurantID);
  });
  const { restaurantID } = useParams();
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
        .delete(`/auth/restaurant/review/${id}`)
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
        .get("/auth/restaurant/bookmark/" + restaurantID)
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
      <Layout isLoggedIn={false} title="맛집 상세" highlight="mainpage/restaurants">
        <div className="flex items-center mb-3">
          <WestIcon className="mr-3" onClick={() => navigate(-1)} />
          <p className="text-[16px] text-black1">뒤로 가기</p>
        </div>
        <div className="flex justify-between mb-[20px]">
          <div className="flex items-center">
            <h2 className="font-bold text-[26px] mr-3">{name}</h2>
            <FavoriteRoundedIcon sx={{ color: "red" }} />
            <p className="text-[16px] ml-1">{likeNum}</p>
          </div>
          <RestaurantDetailBookmark bookmarked={bookmarked} bookmarkHandler={bookmarkHandler} />
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
        {description && (
          <div className="mb-3">
            <p className="text-black1">{description}</p>
          </div>
        )}
        <div className="mb-[20px]">
          <div className="px-[25px] py-[36px] border-green1 border-[1px] rounded-lg">
            <div className="flex items-center">
              <p className="mb-[26px] text-[20px] w-[100px]">주소</p>
              <p className="mb-[26px]">{address}</p>
              <div onClick={mapClickHandler} className="flex-grow-[1] flex flex-row-reverse">
                <MapIcon className="cursor-pointer" fontSize="large" />
              </div>
            </div>
            <div className="flex items-center">
              <p className="text-[20px] w-[100px]">전화번호</p>
              <p>{phone}</p>
            </div>
            <div className="flex">
              {stations.length > 0 && <p className="text-[20px] mt-[26px] mr-3">가까운 버스 정류장</p>}
              {stations.length > 0 && (
                <div className="mt-[33px]">
                  {stations
                    .sort((a, b) => {
                      return a.distance - b.distance;
                    })
                    .map(station => {
                      return (
                        <div className="flex" key={station.stationName}>
                          <DirectionsBusIcon className="mr-1" />
                          <p>
                            {station.stationName} - {station.distance}m
                          </p>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
            {processedInfo.length > 0 && (
              <div className="mt-[26px] flex">
                <p className="text-[20px] w-[100px] flex-shrink-0">영업정보</p>
                <div className="grid gap-3">
                  {processedInfo.map(info => {
                    return (
                      <div key={info.title}>
                        <p className="text-[17px]">{info.title}</p>
                        <p className="text-[14px]">{info.content}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
        <Comments
          category={"restaurant"}
          id={restaurantID}
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

export default RestaurantDetailPage;
