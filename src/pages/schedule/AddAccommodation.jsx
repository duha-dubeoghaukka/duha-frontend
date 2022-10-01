import regionNames from "../../utils/regionNames.js";
import RegionButton from "../../components/mainpage/RegionButton";
import Layout from "../../components/layout/Layout";
import { useContext, useEffect } from "react";
import GlobalState from "../../shared/GlobalState";
import { removeDuplicates } from "../../utils/removeDuplicates";
import { filterItems } from "../../utils/filterItems";
import { arraySplitter } from "../../utils/arraySplitter";
import Spinner from "../../components/Spinner/Spinner";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { api } from "../../api/api";
import AddCourseItem from "../../components/schedule/AddCourseItem";

const AddAccommodation = () => {
  const { tripId, day, currentCourseId } = useParams();
  const { isLoading, error, data, refetch, status, isFetching } = useQuery(["bookmarkedAccommodations"], () => {
    return api.get("/accommodation");
  });
  const { regionSelection, accommodationPageSelection } = useContext(GlobalState);
  const { selectedRegion, setSelectedRegion } = regionSelection;
  const { currentAccommodationPage, setCurrentAccommodationPage } = accommodationPageSelection;
  const selectChangeHandler = event => {
    setSelectedRegion(event.target.value);
    setCurrentAccommodationPage(1);
  };
  useEffect(() => {
    setCurrentAccommodationPage(1);
    setSelectedRegion("전체");
  }, []);
  useEffect(() => {
    refetch();
  }, [regionSelection, currentAccommodationPage]);
  if (isLoading || isFetching || status === "loading") {
    return <Spinner />;
  }
  if (error || status === "error") {
    return <div>{error}</div>;
  }
  if (data && status === "success" && isFetching === false) {
    const accommodations = data.data.data;
    const processedAccommodations = removeDuplicates(accommodations);
    const sortedAccommodations = processedAccommodations.sort((a, b) => b.likeNum - a.likeNum);
    const filteredAccommodations = filterItems(sortedAccommodations, selectedRegion);
    const splittedAccommodations = arraySplitter(filteredAccommodations);
    const numberOfPages = splittedAccommodations.length;
    const pages = [...Array(numberOfPages).keys()].map(page => page + 1);
    const currentAccommodations = splittedAccommodations[currentAccommodationPage - 1];
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    };
    const counter = undefined;
    const setCounter = () => {};
    return (
      <Layout title="일정 등록" highlight={"schedule/create"}>
        <div className="mb-[48px]">
          <ul className="flex flex-row justify-around">
            <Link to={`/schedule/${tripId}/${day}/${currentCourseId}/addspot`} className="font-bold text-2xl cursor-pointer">
              관광
            </Link>
            <Link to={`/schedule/${tripId}/${day}/${currentCourseId}/addrestaurant`} className="font-bold text-2xl cursor-pointer">
              맛집
            </Link>
            <Link
              to={`/schedule/${tripId}/${day}/${currentCourseId}/addaccommodation`}
              className="font-bold text-2xl text-green1 cursor-pointer"
            >
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
          <p className="font-bold">총 {filteredAccommodations.length}건이 검색되었습니다.</p>
        </div>
        <div className="mb-0">
          {currentAccommodations.map(accommodation => {
            return <AddCourseItem key={accommodation.id} data={accommodation} category="숙소" counter={counter} setCounter={setCounter} />;
          })}
        </div>
        <div className="flex justify-center">
          {pages.map(page => {
            if (page === currentAccommodationPage) {
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
                    setCurrentAccommodationPage(page);
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

export default AddAccommodation;
