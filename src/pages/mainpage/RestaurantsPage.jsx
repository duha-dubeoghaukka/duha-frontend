import regionNames from "../../utils/regionNames.js";
import RegionButton from "../../components/mainpage/RegionButton";
import Item from "../../components/mainpage/Item";
import Layout from "../../components/layout/Layout";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import GlobalState from "../../shared/GlobalState";
import { useQuery } from "react-query";
import { instance } from "../../api/api";
import { removeDuplicates } from "../../utils/removeDuplicates";
import { filterItems } from "../../utils/filterItems";
import { arraySplitter } from "../../utils/arraySplitter";

const RestaurantsPage = () => {
  const { isLoading, error, data } = useQuery(["restaurants"], () => {
    return instance.get("/restaurant");
  });
  const { regionSelection, pageSelection } = useContext(GlobalState);
  const { selectedRegion, setSelectedRegion } = regionSelection;
  const { currentPage, setCurrentPage } = pageSelection;
  useEffect(() => {
    setSelectedRegion("전체");
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (data) {
    const restaurants = data.data;
    const processedRestaurants = removeDuplicates(restaurants);
    const sortedRestaurants = processedRestaurants.sort((a, b) => b.likeNum - a.likeNum);
    const filteredRestaurants = filterItems(sortedRestaurants, selectedRegion);
    const splittedRestaurants = arraySplitter(filteredRestaurants);
    const numberOfPages = splittedRestaurants.length;
    const pages = [...Array(numberOfPages).keys()].map(page => page + 1);
    const currentRestaurants = splittedRestaurants[currentPage - 1];
    return (
      <Layout isLoggedIn={false} title="맛집" highlight={"mainpage/restaurants"}>
        <div className="mb-[48px]">
          <ul className="flex flex-row justify-around">
            <Link to="/spots" className="font-bold text-2xl cursor-pointer">
              관광
            </Link>
            <Link to="/restaurants" className="font-bold text-2xl text-green1 cursor-pointer">
              맛집
            </Link>
            <Link to="/accommodations" className="font-bold text-2xl cursor-pointer">
              숙소
            </Link>
          </ul>
        </div>
        <div className="mb-[43px]">
          <ul className="flex flex-row justify-between">
            {regionNames.map(place => {
              return <RegionButton key={place.name} {...place} />;
            })}
          </ul>
        </div>
        <div className="mb-3">
          <p className="font-bold">총 {filteredRestaurants.length}건이 검색되었습니다.</p>
        </div>
        <div className="mb-[100px] md:mb-0">
          {currentRestaurants.map(restaurant => {
            return <Item key={restaurant.id} data={restaurant} />;
          })}
        </div>
        <div className="flex justify-center">
          {pages.map(page => {
            if (page === currentPage) {
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
                    setCurrentPage(page);
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

export default RestaurantsPage;
