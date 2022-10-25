import regionNames from "../../utils/regionNames.js";
import RegionButton from "../../components/mainpage/regionbutton/RegionButton";
import Layout from "../../components/layout/Layout";
import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner/Spinner";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { api } from "../../api/api";
import SearchField from "../../components/search/SearchField";
import AutoComplete from "../../components/search/AutoComplete";
import { DirectionsBusFilledOutlined } from "@mui/icons-material";
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
import scrollToTop from "../../utils/scrollToTop";
import Pagination from "../../components/mainpage/Pagination";
import AddCourseItem from "../../components/schedule/AddCourseItem";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";

const RestaurantsPage = () => {
  const { tripId, day, currentCourseId } = useParams();
  const { isLoading, error, data, refetch } = useQuery(["restaurants"], () => {
    let region;
    if (currentRegion.includes("&")) {
      region = currentRegion.split("&")[0];
    } else {
      region = currentRegion;
    }
    return api.get(`/restaurant`, {
      params: {
        page: currentPage,
        region: region === "전체" ? null : region,
        station: isNearBusStopChecked ? "checked" : null
      }
    });
  });
  const [isNearBusStopChecked, setIsNearBusStopChecked] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentRegion, setCurrentRegion] = useState("전체");
  useEffect(() => {
    setCurrentPage(0);
    refetch();
  }, [isNearBusStopChecked]);
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
        result.isFocused = index === 0;
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
        result.isFocused = index === selectedAutoComplete;
        return result;
      });
    });
  }, [selectedAutoComplete]);
  const selectChangeHandler = event => {
    setCurrentRegion(event.target.value);
  };
  useEffect(() => {
    document.body.addEventListener("click", () => {
      setSearchResults([]);
    });
  }, []);
  if (isLoading) {
    return <Spinner title="맛집" />;
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (data) {
    const items = data.data.data.list;
    const totalNumberOfPages = data.data.data.totalPages;
    return (
      <Layout title="일정 관리" highlight={"schedule/create"}>
        <div className="flex justify-around my-4 text-lg font-bold">
          <Link to={`/schedule/${tripId}/${day}/${currentCourseId}/addspot`} className="text-gray-500">
            관광
          </Link>
          <Link to={`/schedule/${tripId}/${day}/${currentCourseId}/addrestaurant`} className="text-green1">
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
            region={currentRegion}
            category="restaurants"
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
          <ul className="hidden md:flex flex-row justify-between">
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
        <div className="w-fit mb-2 cursor-pointer">
          <div
            className="flex justify-start items-center"
            onClick={() => {
              setIsNearBusStopChecked(!isNearBusStopChecked);
            }}
          >
            <DirectionsBusFilledOutlined className="mr-1" sx={{ color: "#ECB390" }} />
            <p className="font-semibold text-sm md:test-base text-[#ECB390]">버스 정류장과 가까운 장소 (300m 이내)</p>
            <div className="text-[#ECB390] flex">
              {isNearBusStopChecked ? <CheckBoxOutlinedIcon fontSize="small" /> : <CheckBoxOutlineBlankOutlinedIcon fontSize="small" />}
            </div>
          </div>
        </div>
        {searchMode ? (
          <div>
            <div className="mb-2">
              <p className="text-sm">총 {searchedResults.length}건이 검색되었습니다</p>
            </div>
            <div>
              {searchedResults.map(result => {
                return <AddCourseItem key={result.id} data={result} category="맛집" />;
              })}
            </div>
          </div>
        ) : (
          <div>
            <div>
              {items.map(item => {
                return <AddCourseItem key={item.id} data={item} category="맛집" />;
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

export default RestaurantsPage;
