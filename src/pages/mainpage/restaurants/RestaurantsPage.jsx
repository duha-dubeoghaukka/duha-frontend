import regionNames from "../../../utils/regionNames.js";
import RegionButton from "../../../components/mainpage/RegionButton";
import Layout from "../../../components/layout/Layout";
import { useContext, useEffect } from "react";
import GlobalState from "../../../shared/GlobalState";
import Item from "../../../components/mainpage/Item";
import { removeDuplicates } from "../../../utils/removeDuplicates";
import { filterItems } from "../../../utils/filterItems";
import { arraySplitter } from "../../../utils/arraySplitter";
import Spinner from "../../../components/Spinner/Spinner";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { api } from "../../../api/api";

const RestaurantsPage = () => {
  const { isLoading, error, data, refetch, status, isFetching } = useQuery(["bookmarkedRestaurants"], () => {
    return api.get("/restaurant");
  });
  const { regionSelection, restaurantPageSelection } = useContext(GlobalState);
  const { selectedRegion, setSelectedRegion } = regionSelection;
  const { currentRestaurantPage, setCurrentRestaurantPage } = restaurantPageSelection;
  const selectChangeHandler = event => {
    setSelectedRegion(event.target.value);
    setCurrentRestaurantPage(1);
  };
  useEffect(() => {
    setCurrentRestaurantPage(1);
    setSelectedRegion("전체");
  }, []);
  useEffect(() => {
    refetch();
  }, [regionSelection, currentRestaurantPage]);
  if (isLoading || isFetching || status === "loading") {
    return <Spinner />;
  }
  if (error || status === "error") {
    return <div>{error}</div>;
  }
  if (data && status === "success" && isFetching === false) {
    const restaurants = data.data.data;
    const processedRestaurants = removeDuplicates(restaurants);
    const sortedRestaurants = processedRestaurants.sort((a, b) => b.likeNum - a.likeNum);
    const filteredRestaurants = filterItems(sortedRestaurants, selectedRegion);
    const splittedRestaurants = arraySplitter(filteredRestaurants);
    const numberOfPages = splittedRestaurants.length;
    const pages = [...Array(numberOfPages).keys()].map(page => page + 1);
    const currentRestaurants = splittedRestaurants[currentRestaurantPage - 1];
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    };
    const counter = undefined;
    const setCounter = () => {};
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
          <p className="font-bold">총 {filteredRestaurants.length}건이 검색되었습니다.</p>
        </div>
        <div className="mb-0">
          {currentRestaurants.map(restaurant => {
            return <Item key={restaurant.id} data={restaurant} category={"restaurant"} counter={counter} setCounter={setCounter} />;
          })}
        </div>
        <div className="flex justify-center">
          {pages.map(page => {
            if (page === currentRestaurantPage) {
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
                    setCurrentRestaurantPage(page);
                  }}
                >
                  <p className="underline text-sky-500">{page}</p>
                </div>
              );
            }
          })}
        </div>
        <div className="flex justify-center cursor-pointer text-sky-500 underline" onClick={scrollToTop}>
          <p>최상단으로 이동</p>
        </div>
      </Layout>
    );
  }
};

export default RestaurantsPage;
