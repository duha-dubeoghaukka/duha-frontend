import regionNames from "../../../utils/regionNames.js";
import RegionButton from "../../../components/mainpage/RegionButton";
import Layout from "../../../components/layout/Layout";
import { useEffect, useState } from "react";
import Item from "../../../components/mainpage/Item";
import Spinner from "../../../components/Spinner/Spinner";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { api } from "../../../api/api";
import SearchField from "../../../components/search/SearchField";
import AutoComplete from "../../../components/search/AutoComplete";
import { DirectionsBusFilledOutlined } from "@mui/icons-material";
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
import scrollToTop from "../../../utils/scrollToTop";
import Pagination from "../../../components/mainpage/Pagination";

const TouristSpotsPage = () => {
  const { isLoading, error, data, refetch } = useQuery(["touristSpots"], () => {
    if (currentRegion === "전체") {
      return api.get(`/touristspot?page=${currentPage}`);
    } else {
      return api.get(`/touristspot?page=${currentPage}&region=${currentRegion}`);
    }
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [currentRegion, setCurrentRegion] = useState("전체");
  useEffect(() => {
    refetch();
    scrollToTop();
  }, [currentRegion, currentPage]);
  const [searchedResults, setSearchedResults] = useState([]);
  const [searchMode, setSearchMode] = useState(false);
  const [autoCompletedInput, setAutoCompletedInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedAutoComplete, setSelectedAutoComplete] = useState(0);
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
  const changeCurrentRegion = regionName => {
    setCurrentPage(0);
    setCurrentRegion(regionName);
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
  const selectChangeHandler = event => {
    setCurrentRegion(event.target.value);
  };
  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (data) {
    const items = data.data.data;
    const totalNumberOfPages = data.data.data.totalPages;
    return (
      <Layout title="관광지" highlight={"mainpage/spots"}>
        <div className="flex justify-around my-4 text-lg font-bold">
          <Link to="/spots" className="text-green1">
            관광
          </Link>
          <Link to="/restaurants" className="text-gray-500">
            맛집
          </Link>
          <Link to="/accommodations" className="text-gray-500">
            숙소
          </Link>
        </div>
        <div className="mb-2 md:mb-4" onKeyDown={keyPressHandler}>
          <SearchField
            setSearchMode={setSearchMode}
            sendResults={sendResults}
            autoCompletedInput={autoCompletedInput}
            sendSearchedResults={sendSearchedResults}
            region={currentRegion}
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
              return <RegionButton key={region.name} {...region} currentRegion={currentRegion} setCurrentRegion={changeCurrentRegion} />;
            })}
          </ul>
          <select
            value={currentRegion}
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
                return <Item key={result.id} data={result} category={"touristspot"} />;
              })}
            </div>
          </div>
        ) : (
          <div>
            <div>
              {items.map(item => {
                return <Item key={item.id} data={item} category={"touristspot"} />;
              })}
            </div>
          </div>
        )}
        <Pagination currentPage={currentPage} numberOfPages={totalNumberOfPages} setCurrentPage={setCurrentPage} />
        <ArrowCircleUpOutlinedIcon className="fixed right-5 bottom-5 cursor-pointer hidden md:block" onClick={scrollToTop} />
      </Layout>
    );
  }
};

export default TouristSpotsPage;
