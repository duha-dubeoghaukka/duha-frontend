import regionNames from "../../utils/regionNames.js";
import RegionButton from "../../components/mainpage/RegionButton";
import Layout from "../../components/layout/Layout";
import { useContext, useEffect } from "react";
import GlobalState from "../../shared/GlobalState";
import Item from "../../components/mainpage/Item";
import { useQuery } from "react-query";
import { instance } from "../../api/api";
import { removeDuplicates } from "../../utils/removeDuplicates";
import { filterItems } from "../../utils/filterItems";
import { arraySplitter } from "../../utils/arraySplitter";
import Spinner from "../../components/Spinner/Spinner";
import { Link } from "react-router-dom";

const TouristSpotsPage = () => {
  const { isLoading, error, data } = useQuery(["touristSpots"], () => {
    return instance.get("/touristspot");
  });
  const { regionSelection, spotPageSelection } = useContext(GlobalState);
  const { selectedRegion, setSelectedRegion } = regionSelection;
  const { currentSpotPage, setCurrentSpotPage } = spotPageSelection;
  const selectChangeHandler = event => {
    setSelectedRegion(event.target.value);
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
    const spots = data.data;
    const processedSpots = removeDuplicates(spots);
    const sortedSpots = processedSpots.sort((a, b) => b.likeNum - a.likeNum);
    const filteredSpots = filterItems(sortedSpots, selectedRegion);
    const splittedSpots = arraySplitter(filteredSpots);
    const numberOfPages = splittedSpots.length;
    const pages = [...Array(numberOfPages).keys()].map(page => page + 1);
    const currentSpots = splittedSpots[currentSpotPage - 1];
    return (
      <Layout isLoggedIn={false} title="관광지" highlight={"mainpage/spots"}>
        <div className="mb-[48px]">
          <ul className="flex flex-row justify-around">
            <Link to="/spots" className="font-bold text-2xl text-green1 cursor-pointer">
              관광
            </Link>
            <Link to="/restaurants" className="font-bold text-2xl cursor-pointer">
              맛집
            </Link>
            <Link to="/accommodations" className="font-bold text-2xl cursor-pointer">
              숙소
            </Link>
          </ul>
        </div>
        <div className="mb-[43px]">
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
              return <option>{region.name}</option>;
            })}
          </select>
        </div>
        <div className="mb-3">
          <p className="font-bold">총 {filteredSpots.length}건이 검색되었습니다.</p>
        </div>
        <div className="mb-0">
          {currentSpots.map(spot => {
            return <Item key={spot.id} data={spot} />;
          })}
        </div>
        <div className="flex justify-center">
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
      </Layout>
    );
  }
};

export default TouristSpotsPage;
