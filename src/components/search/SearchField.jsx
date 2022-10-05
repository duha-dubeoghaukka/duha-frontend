import { useCallback, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { debouncer } from "../../utils/debouncer";
import { api } from "../../api/api";

const SearchField = ({ setSearchMode, sendResults }) => {
  const [userInput, setUserInput] = useState("");
  const sendValue = useCallback(
    debouncer(value => {
      api
        .get(`/touristspot/search?region=${"애월"}&keyword=${value}`)
        .then(response => {
          const result = response.data.data;
          setSearchMode(true);
          sendResults(result);
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
    const isValidInput = inputRegex.test(input);
    if (isValidInput) {
      sendValue(input);
    }
    setUserInput(event.target.value);
  };
  return (
    <div className="relative">
      <input
        placeholder="관광지를 검색하세요"
        type="text"
        value={userInput}
        onChange={handleUserInput}
        className="w-full border-green1 border-solid border-2 rounded-lg p-2 px-5 text-black1"
      />
      <SearchIcon fontSize="large" sx={{ color: "rgb(125, 171, 120)" }}
                  className="absolute right-3 top-[4px] cursor-pointer" />
    </div>
  );
};

export default SearchField;
