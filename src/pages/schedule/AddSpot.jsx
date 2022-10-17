import regionNames from "../../utils/regionNames.js";
import RegionButton from "../../components/mainpage/RegionButton";
import Layout from "../../components/layout/Layout";
import { useContext, useEffect, useState } from "react";
import GlobalState from "../../shared/GlobalState";
import { useQuery } from "react-query";
import { api } from "../../api/api";
import { removeDuplicates } from "../../utils/removeDuplicates";
import { filterItems } from "../../utils/filterItems";
import { arraySplitter } from "../../utils/arraySplitter";
import Spinner from "../../components/Spinner/Spinner";
import { Link, useParams } from "react-router-dom";
import AddCourseItem from "../../components/schedule/AddCourseItem";
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
import SearchField from "../../components/search/SearchField";
import { DirectionsBusFilledOutlined } from "@mui/icons-material";
import AutoComplete from "../../components/search/AutoComplete";

const AddSpot = () => {
  const { isLoading, error, data, refetch, status, isFetching } = useQuery(["bookmarkedTouristSpots"], () => {
    return api.get("/touristspot");
  });
  const [searchedResults, setSearchedResults] = useState([]);
  const [searchMode, setSearchMode] = useState(false);
  const [autoCompletedInput, setAutoCompletedInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedAutoComplete, setSelectedAutoComplete] = useState(0);
  const { regionSelection, spotPageSelection } = useContext(GlobalState);
  const { selectedRegion, setSelectedRegion } = regionSelection;
  const { currentSpotPage, setCurrentSpotPage } = spotPageSelection;
  const { tripId, day, currentCourseId } = useParams();

  const selectChangeHandler = event => {
    setSelectedRegion(event.target.value);
    setCurrentSpotPage(1);
  };

  const sendResults = results => {
    setSearchResults(
      results.map((result, index) => {
        if (index === 0) {
          result.isFocused = true;
        } else {
          result.isFocused = false;
        }
        return result;
      })
    );
    setSelectedAutoComplete(() => 0);
  };

  const selectAutoComplete = name => {
    setAutoCompletedInput(name);
    setSelectedAutoComplete(() => 0);
    setSearchResults([]);
  };

  const sendSearchedResults = results => {
    setSearchedResults(results);
    setSearchMode(true);
  };

  const keyPressHandler = event => {
    const length = searchResults.length;
    if (length > 0) {
      switch (event.keyCode) {
        case 40:
          setSelectedAutoComplete(previousSelectedAutoComplete => Math.min(length - 1, previousSelectedAutoComplete + 1));
          break;
        case 38:
          setSelectedAutoComplete(previousSelectedAutoComplete => Math.max(0, previousSelectedAutoComplete - 1));
          break;
        case 13:
          setAutoCompletedInput(() => searchResults[selectedAutoComplete].name);
          setSelectedAutoComplete(() => 0);
          setSearchResults([]);
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    setSearchResults(previousSearchResults => {
      return previousSearchResults.map((result, index) => {
        if (index === selectedAutoComplete) {
          result.isFocused = true;
        } else {
          result.isFocused = false;
        }
        return result;
      });
    });
  }, [selectedAutoComplete]);

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
      <Layout title="일정 관리" highlight={"schedule/create"}>
        <div className="flex justify-around my-4 text-lg font-bold">
          <Link to={`/schedule/${tripId}/${day}/${currentCourseId}/addspot`} className="text-green1">
            관광
          </Link>
          <Link to={`/schedule/${tripId}/${day}/${currentCourseId}/addrestaurant`} className="text-gray-500">
            맛집
          </Link>
          <Link to={`/schedule/${tripId}/${day}/${currentCourseId}/addaccommodation`} className="text-gray-500">
            숙소
          </Link>
        </div>
        <div className="mb-2 md:mb-4" onKeyDown={keyPressHandler}>
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
              {searchResults.map(result => {
                return (
                  <AutoComplete key={result.name} data={result} selectAutoComplete={selectAutoComplete} isSelected={result.isFocused} />
                );
              })}
            </div>
          )}
        </div>
        <div className="mb-2 md:mb-5">
          <ul className="hidden md:flex justify-between">
            {regionNames.map(region => {
              return <RegionButton key={region.name} {...region} />;
            })}
          </ul>
          <select
            value={selectedRegion}
            onChange={selectChangeHandler}
            className="px-3 md:hidden w-full h-[43px] text-gray-500 rounded-lg border-gray-500 border-solid border-2"
          >
            {regionNames.map(region => {
              return <option key={region.name}>{region.name}</option>;
            })}
          </select>
        </div>
        <div className="flex justify-start items-center mb-2">
          <DirectionsBusFilledOutlined className="mr-1" sx={{ color: "rgb(116, 174, 115)" }} />
          <p className="font-semibold text-green1 text-sm md:test-base">버스 정류장이 300m 반경 이내에 존재하는 항목</p>
        </div>
        {searchMode ? (
          <div>
            <div className="mb-2">
              <p className="text-sm">총 {searchedResults.length}건이 검색되었습니다</p>
            </div>
            <div>
              {searchedResults.map(result => {
                return <AddCourseItem key={result.id} data={result} category="관광지" />;
              })}
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-2">
              <p className="text-sm">총 {filteredSpots.length}건이 검색되었습니다</p>
            </div>
            <div>
              {currentSpots.map(spot => {
                return <AddCourseItem key={spot.id} data={spot} category="관광지" />;
              })}
            </div>
            <div className="flex justify-start overflow-x-scroll pb-2">
              {pages.map(page => {
                if (page === currentSpotPage) {
                  return (
                    <div key={page} className="mr-1">
                      <p className="font-medium">{page}</p>
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
                      <p className="text-gray-500">{page}</p>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        )}
        <ArrowCircleUpOutlinedIcon className="fixed right-5 bottom-5 cursor-pointer md:visible invisible" onClick={scrollToTop} />
      </Layout>
    );
  }
};

export default AddSpot;
