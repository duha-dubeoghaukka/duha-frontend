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
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";

const AccommodationsPage = () => {
  const { isLoading, error, data, refetch, status, isFetching } = useQuery(["bookmarkedAccommodations"], () => {
    return api.get("/accommodation");
  });
  const [searchedResults, setSearchedResults] = useState([]);
  const [searchMode, setSearchMode] = useState(false);
  const [autoCompletedInput, setAutoCompletedInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedAutoComplete, setSelectedAutoComplete] = useState(0);
  const { regionSelection, accommodationPageSelection } = useContext(GlobalState);
  const { selectedRegion, setSelectedRegion } = regionSelection;
  const { currentAccommodationPage, setCurrentAccommodationPage } = accommodationPageSelection;
  const selectChangeHandler = event => {
    setSelectedRegion(event.target.value);
    setCurrentAccommodationPage(1);
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
        <div className="flex justify-around my-4 text-lg font-bold">
          <Link to="/spots" className="text-gray-500">
            관광
          </Link>
          <Link to="/restaurants" className="text-gray-500">
            맛집
          </Link>
          <Link to="/accommodations" className="text-green1">
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
            category="accommodations"
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
                return <Item key={result.id} data={result} counter={counter} setCounter={setCounter} category={"accommodation"} />;
              })}
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-2">
              <p className="text-sm">총 {filteredAccommodations.length}건이 검색되었습니다</p>
            </div>
            <div>
              {currentAccommodations.map(accommodation => {
                return (
                  <Item key={accommodation.id} data={accommodation} category={"accommodation"} counter={counter} setCounter={setCounter} />
                );
              })}
            </div>
            <div className="flex justify-center">
              <div className="flex justify-start overflow-x-scroll pb-2">
                {pages.map(page => {
                  if (page === currentAccommodationPage) {
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
                          setCurrentAccommodationPage(page);
                        }}
                      >
                        <p className="text-gray-500">{page}</p>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        )}
        <ArrowCircleUpOutlinedIcon className="fixed right-5 bottom-5 cursor-pointer hidden md:block" onClick={scrollToTop} />
      </Layout>
    );
  }
};

export default AccommodationsPage;
