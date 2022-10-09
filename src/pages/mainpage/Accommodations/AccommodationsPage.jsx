import regionNames from "../../../utils/regionNames.js";
import RegionButton from "../../../components/mainpage/RegionButton";
import Layout from "../../../components/layout/Layout";
import { useContext, useEffect, useState } from "react";
import GlobalState from "../../../shared/GlobalState";
import Item from "../../../components/mainpage/Item";
import { removeDuplicates } from "../../../utils/removeDuplicates";
import { filterItems } from "../../../utils/filterItems";
import { arraySplitter } from "../../../utils/arraySplitter";
import Spinner from "../../../components/Spinner/Spinner";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { api } from "../../../api/api";
import SearchField from "../../../components/search/SearchField";
import AutoComplete from "../../../components/search/AutoComplete";
import { DirectionsBusFilledOutlined } from "@mui/icons-material";

const AccommodationsPage = () => {
  const { isLoading, error, data, refetch, status, isFetching } = useQuery(["bookmarkedAccommodations"], () => {
    return api.get("/accommodation");
  });
  const [searchedResults, setSearchedResults] = useState([]);
  const [searchMode, setSearchMode] = useState(false);
  const [autoCompletedInput, setAutoCompletedInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { regionSelection, accommodationPageSelection } = useContext(GlobalState);
  const { selectedRegion, setSelectedRegion } = regionSelection;
  const { currentAccommodationPage, setCurrentAccommodationPage } = accommodationPageSelection;
  const selectChangeHandler = event => {
    setSelectedRegion(event.target.value);
    setCurrentAccommodationPage(1);
  };
  const sendResults = results => {
    setSearchResults(results);
  };
  const selectAutoComplete = name => {
    setAutoCompletedInput(name);
    setSearchResults([]);
  };
  const sendSearchedResults = results => {
    setSearchedResults(results);
    setSearchMode(true);
  };
  useEffect(() => {
    setCurrentAccommodationPage(1);
    setSelectedRegion("전체");
  }, []);
  useEffect(() => {
    setSearchMode(false);
    setAutoCompletedInput("");
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
      <Layout isLoggedIn={false} title="숙소" highlight={"mainpage/accommodations"}>
        <div className="mb-[48px]">
          <ul className="flex flex-row justify-around">
            <Link to="/spots" className="font-bold text-2xl cursor-pointer">
              관광
            </Link>
            <Link to="/restaurants" className="font-bold text-2xl cursor-pointer">
              맛집
            </Link>
            <Link to="/accommodations" className="font-bold text-2xl cursor-pointer text-green1">
              숙소
            </Link>
          </ul>
        </div>
        <div className="mb-[16px]">
          <ul className="hidden md:flex flex-row justify-between">
            {regionNames.map(region => {
              return <RegionButton key={region.name} {...region} />;
            })}
          </ul>
          <select
            value={selectedRegion}
            onChange={selectChangeHandler}
            className="pl-3 text-[16px] block md:hidden w-full h-[43px] text-black1 font-bold rounded-lg border-black1 border-solid border-2"
          >
            {regionNames.map(region => {
              return <option key={region.name}>{region.name}</option>;
            })}
          </select>
        </div>
        <div className="mb-[16px]">
          <SearchField
            setSearchMode={setSearchMode}
            sendResults={sendResults}
            autoCompletedInput={autoCompletedInput}
            sendSearchedResults={sendSearchedResults}
            region={selectedRegion}
            category="accommodations"
          />
          {searchResults && (
            <div className="absolute bg-white z-10 rounded-lg shadow-lg w-[600px] overflow-clip">
              {searchResults.map(result => {
                return <AutoComplete key={result.name} data={result} selectAutoComplete={selectAutoComplete} />;
              })}
            </div>
          )}
        </div>
        <div className="flex items-center mb-3">
          <DirectionsBusFilledOutlined className="mr-1" sx={{ color: "rgb(116, 174, 115)" }} />
          <p className="font-bold text-green1">버스 정류장이 300m 반경 이내에 존재하는 항목.</p>
        </div>
        {searchMode ? (
          <div>
            <div className="mb-3">
              <p className="font-bold">총 {searchedResults.length}건이 검색되었습니다.</p>
            </div>
            <div>
              {searchedResults.map(result => {
                return <Item key={result.id} data={result} counter={counter} setCounter={setCounter} category={"accommodation"} />;
              })}
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-3">
              <p className="font-bold">총 {filteredAccommodations.length}건이 검색되었습니다.</p>
            </div>
            <div className="mb-0">
              {currentAccommodations.map(accommodation => {
                return (
                  <Item key={accommodation.id} data={accommodation} category={"accommodation"} counter={counter} setCounter={setCounter} />
                );
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
          </div>
        )}
        <div className="flex justify-center cursor-pointer text-sky-500 underline" onClick={scrollToTop}>
          <p>최상단으로 이동</p>
        </div>
      </Layout>
    );
  }
};

export default AccommodationsPage;
