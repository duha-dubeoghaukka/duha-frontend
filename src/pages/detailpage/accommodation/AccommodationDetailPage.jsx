import { useParams } from "react-router-dom";
import Layout from "../../../components/layout/Layout";
import { useContext, useEffect } from "react";
import { useQuery } from "react-query";
import Spinner from "../../../components/Spinner/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper";
import GlobalState from "../../../shared/GlobalState";
import Map from "../mappage/Map";
import { api } from "../../../api/api";
import checkIsLoggedIn from "../../../utils/checkIsLoggedIn";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import processInfo from "../../../utils/processInfo";
import Comments from "../../../components/mainpage/comment/Comments";
import Bookmark from "../../../components/mainpage/Bookmark";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const AccommodationDetailPage = () => {
  const { mapModal } = useContext(GlobalState);
  const { isMapModalOpen, setIsMapModalOpen } = mapModal;
  const { isLoading, error, data, refetch } = useQuery(["accommodationDetail"], () => {
    return api.get("/accommodation/" + accommodationID);
  });
  const { accommodationID } = useParams();
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
        .delete(`/auth/accommodation/review/${id}`)
        .then(() => {
          refetch();
        })
        .catch(error => {
          alert(error);
        });
    }
  };

  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (data) {
    const accommodation = data.data.data;
    const { address, name, phone, reviews, imgUrl, bookmarked, stations, info, latitude, longitude, bookmarkNum, id } = accommodation;
    const processedInfo = processInfo(info);
    return (
      <Layout title="숙소 상세" highlight="mainpage/accommodations">
        <div className="flex justify-between items-center my-2 md:my-4">
          <div className="flex items-center">
            <p className="font-bold md:text-xl">🛏 {name}</p>
          </div>
          <div className="flex items-center cursor-pointer">
            <Bookmark bookmarked={bookmarked} numberOfBookmarks={bookmarkNum} category={"accommodation"} id={id} refetchList={refetch} />
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
                <LocationOnOutlinedIcon onClick={mapClickHandler} className="cursor-pointer" fontSize="medium" />
              </div>
              <p className="text-sm text-gray-700 mb-2">{address}</p>
            </div>
            <div className="mb-1 md:mb-2 w-full border-b">
              <p className="text-base md:text-lg font-semibold">전화번호</p>
              <p className="text-sm text-gray-700 mb-2">{phone}</p>
            </div>
            <div className="mb-1 md:mb-2 w-full">
              {stations.length > 0 && <p className="text-base md:text-lg font-semibold">가까운 버스 정류장</p>}
              {stations.length > 0 && (
                <div className="mb-2">
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
                      <p className="font-semibold text-sm">{info.title}</p>
                      <p className="text-sm text-gray-700 mb-2">{info.content}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <Comments
          category={"accommodation"}
          id={accommodationID}
          refetchComments={refetchComments}
          comments={reviews}
          commentDeleteHandler={commentDeleteHandler}
        />
        {isMapModalOpen && (
          <div>
            <div className="fixed top-0 left-0 z-10 w-[100vw] h-[100vh] bg-black1 opacity-50" onClick={backdropClickHandler}></div>
            <div className="fixed z-10 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] shadow-lg">
              <Map latitude={latitude} longitude={longitude} name={name} setIsMapModalOpen={setIsMapModalOpen} />
            </div>
          </div>
        )}
      </Layout>
    );
  }
};

export default AccommodationDetailPage;
