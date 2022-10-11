import regionNames from "../../utils/regionNames.js";
import RegionButton from "../../components/mainpage/RegionButton";
import Layout from "../../components/layout/Layout";
import { useContext, useEffect } from "react";
import GlobalState from "../../shared/GlobalState";
import { useQuery } from "react-query";
import { instance } from "../../api/api";
import { removeDuplicates } from "../../utils/removeDuplicates";
import { filterItems } from "../../utils/filterItems";
import { arraySplitter } from "../../utils/arraySplitter";
import Spinner from "../../components/Spinner/Spinner";
import { Link, useParams } from "react-router-dom";
import AddCourseItem from "../../components/schedule/AddCourseItem";
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";

const AddSpot = () => {
  const { tripId, day, currentCourseId } = useParams();
  const { isLoading, error, data } = useQuery(["touristSpots"], () => {
    return instance.get("/touristspot");
  });
  const { regionSelection, spotPageSelection } = useContext(GlobalState);
  const { selectedRegion, setSelectedRegion } = regionSelection;
  const { currentSpotPage, setCurrentSpotPage } = spotPageSelection;

  const selectChangeHandler = event => {
    setSelectedRegion(event.target.value);
    setCurrentSpotPage(1);
  };

  useEffect(() => {
    setCurrentSpotPage(1);
    setSelectedRegion("전체");
  }, []);

  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (data) {
    const spots = data.data.data;
    const processedSpots = removeDuplicates(spots);
    const sortedSpots = processedSpots.sort((a, b) => b.likeNum - a.likeNum);
    const filteredSpots = filterItems(sortedSpots, selectedRegion);
    const splittedSpots = arraySplitter(filteredSpots);
    const numberOfPages = splittedSpots.length;
    const pages = [...Array(numberOfPages).keys()].map(page => page + 1);
    const currentSpots = splittedSpots[currentSpotPage - 1];
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    };

    return (
      <Layout title="일정 등록" highlight={"schedule/create"}>
        <div className="my-3">
          <ul className="flex justify-around font-bold text-base md:text-lg">
            <Link to={`/schedule/${tripId}/${day}/${currentCourseId}/addspot`} className="text-green1">
              관광
            </Link>
            <Link to={`/schedule/${tripId}/${day}/${currentCourseId}/addrestaurant`}>맛집</Link>
            <Link to={`/schedule/${tripId}/${day}/${currentCourseId}/addaccommodation`}>숙소</Link>
          </ul>
        </div>
        <div className="my-3">
          <ul className="hidden md:flex flex-row justify-between">
            {regionNames.map(region => {
              return <RegionButton key={region.name} {...region} />;
            })}
          </ul>
          <select
            onChange={selectChangeHandler}
            className="pl-3 text-[16px] block md:hidden w-full h-[43px] text-black1 font-bold rounded-lg border-black1 border-solid border-2"
          >
            {regionNames.map(region => {
              return <option key={region.name}>{region.name}</option>;
            })}
          </select>
        </div>
        <div className="mb-3">
          <p className="font-bold text-sm">총 {filteredSpots.length}건이 검색되었습니다.</p>
        </div>
        <div>
          {currentSpots.map(spot => {
            return <AddCourseItem key={spot.id} data={spot} category="관광지" />;
          })}
        </div>
        <div className="flex justify-start overflow-x-scroll pb-3">
          {pages.map(page => {
            if (page === currentSpotPage) {
              return (
                <div key={page} className="mr-1">
                  <p>{page}</p>
                </div>
              );
            } else {
              return (
                <div
                  key={page}
                  className="mr-1 cursor-pointer"
                  onClick={() => {
                    setCurrentSpotPage(page);
                  }}
                >
                  <p className="underline text-sky-500">{page}</p>
                </div>
              );
            }
          })}
        </div>
        <ArrowCircleUpOutlinedIcon className="fixed right-5 bottom-5 cursor-pointer md:visible invisible" onClick={scrollToTop} />
      </Layout>
    );
  }
};

export default AddSpot;
