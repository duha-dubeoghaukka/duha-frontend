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

const TouristSpotsPage = ({ counter, setCounter }) => {
  const { isLoading, error, data, refetch, status, isFetching } = useQuery(["bookmarkedTouristSpots"], () => {
    return api.get("/touristspot");
  });
  const [searchedResults, setSearchedResults] = useState([]);
  const [searchMode, setSearchMode] = useState(false);
  const [autoCompletedInput, setAutoCompletedInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isAutoCompleteFocused, setIsAutoCompleteFocused] = useState(false);
  const [selectedAutoComplete, setSelectedAutoComplete] = useState(0);
  const { regionSelection, spotPageSelection } = useContext(GlobalState);
  const { selectedRegion, setSelectedRegion } = regionSelection;
  const { currentSpotPage, setCurrentSpotPage } = spotPageSelection;
  const selectChangeHandler = event => {
    setSelectedRegion(event.target.value);
    setCurrentSpotPage(1);
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
  const keyPressHandler = event => {
    const key = event.key;
    switch (key) {
      case "ArrowDown":
        if (searchResults.length > 0) {
          const length = searchResults.length;
          if (!isAutoCompleteFocused) {
            setIsAutoCompleteFocused(true);
            setSelectedAutoComplete(0);
          } else {
            setSelectedAutoComplete(previousSelectedAutoComplete => Math.min(length - 1, previousSelectedAutoComplete + 1));
          }
        }
        break;
      case "ArrowUp":
        if (searchResults.length > 0) {
          setIsAutoCompleteFocused(true);
          setSelectedAutoComplete(previousSelectedAutoComplete => Math.max(0, previousSelectedAutoComplete - 1));
        }
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    setCurrentSpotPage(1);
    setSelectedRegion("전체");
  }, []);
  useEffect(() => {
    setSearchMode(false);
    setAutoCompletedInput("");
    refetch();
  }, [regionSelection, currentSpotPage]);
  if (isLoading || isFetching || status === "loading") {
    return <Spinner />;
  }
  if (error || status === "error") {
    return <div>{error}</div>;
  }
  if (data && status === "success" && isFetching === false) {
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
        <div className="mb-[16px]" onKeyDown={keyPressHandler}>
          <SearchField
            setSearchMode={setSearchMode}
            sendResults={sendResults}
            autoCompletedInput={autoCompletedInput}
            sendSearchedResults={sendSearchedResults}
            region={selectedRegion}
            category="touristSpots"
          />
          {searchResults && (
            <div className="absolute bg-white z-10 rounded-lg shadow-lg w-[600px] overflow-clip">
              {searchResults.map((result, index) => {
                return (
                  <AutoComplete
                    key={result.name}
                    data={result}
                    selectAutoComplete={selectAutoComplete}
                    isSelected={selectedAutoComplete === index}
                  />
                );
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
                return <Item key={result.id} data={result} counter={counter} setCounter={setCounter} category={"touristspot"} />;
              })}
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-3">
              <p className="font-bold">총 {filteredSpots.length}건이 검색되었습니다.</p>
            </div>
            <div className="mb-0">
              {currentSpots.map(spot => {
                return <Item key={spot.id} data={spot} counter={counter} setCounter={setCounter} category={"touristspot"} />;
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
          </div>
        )}
        <div className="flex justify-center cursor-pointer text-sky-500 underline" onClick={scrollToTop}>
          <p>최상단으로 이동</p>
        </div>
      </Layout>
    );
  }
};

export default TouristSpotsPage;
