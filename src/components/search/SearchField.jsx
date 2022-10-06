import { useCallback, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { debouncer } from "../../utils/debouncer";
import { api } from "../../api/api";

const SearchField = ({ sendResults, autoCompletedInput, sendSearchedResults, region, category }) => {
  const categoryMapper = {
    touristSpots: "touristspot",
    restaurants: "restaurant",
    accommodations: "accommodation"
  };
  const placeHolderMapper = {
    touristSpots: "관광지를",
    restaurants: "맛집을",
    accommodations: "숙소를"
  };
  const [userInput, setUserInput] = useState("");
  useEffect(() => {
    setUserInput(autoCompletedInput);
  }, [autoCompletedInput]);
  const searchHandler = () => {
    const whiteSpacesRegex = new RegExp(/^\s*$/);
    if (!whiteSpacesRegex.test(userInput)) {
      api
        .get(
          region === "전체"
            ? `/${categoryMapper[category]}/search?keyword=${userInput}`
            : `/${categoryMapper[category]}/search?region=${region}&keyword=${userInput}`
        )
        .then(response => {
          const results = response.data.data;
          sendSearchedResults(results);
          sendResults([]);
        })
        .catch(error => {
          alert(error);
        });
    }
  };
  const sendValue = useCallback(
    debouncer(value => {
      api
        .get(
          region === "전체"
            ? `/${categoryMapper[category]}/search?keyword=${value}`
            : `/${categoryMapper[category]}/search?region=${region}&keyword=${value}`
        )
        .then(response => {
          const results = response.data.data;
          sendResults(results);
        })
        .catch(error => {
          console.dir(error);
        });
    }, 500),
    []
  );
  const handleUserInput = event => {
    const input = event.target.value;
    const inputRegex = new RegExp(/^[가-힣a-zA-Z0-9\s]+$/);
    const whiteSpacesRegex = new RegExp(/^\s*$/);
    const isValidInput = inputRegex.test(input);
    if (whiteSpacesRegex.test(input)) {
      sendValue("N/A");
    } else if (isValidInput) {
      sendValue(input);
    }
    setUserInput(event.target.value);
  };
  return (
    <div className="relative">
      <input
        placeholder={`${placeHolderMapper[category]} 검색하세요...`}
        type="text"
        value={userInput}
        onChange={handleUserInput}
        className="w-full border-green1 border-solid border-2 rounded-lg p-2 px-5 text-black1"
      />
      <SearchIcon
        fontSize="large"
        sx={{ color: "rgb(125, 171, 120)" }}
        className="absolute right-3 top-[4px] cursor-pointer"
        onClick={searchHandler}
      />
    </div>
  );
};

export default SearchField;
