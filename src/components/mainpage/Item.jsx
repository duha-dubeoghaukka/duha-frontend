import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import DirectionsBusFilledOutlinedIcon from "@mui/icons-material/DirectionsBusFilledOutlined";
import { useNavigate } from "react-router-dom";
import checkIsLoggedIn from "../../utils/checkIsLoggedIn";
import { api } from "../../api/api";
import Bookmark from "./Bookmark";
import { useState } from "react";

const Item = ({ data, setCounter, category }) => {
  const navigator = useNavigate();
  const { id, name, description, region, likeNum, thumbnailUrl, bookmarked, hasNearStation } = data;
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);
  const itemClickHandler = () => {
    switch (category) {
      case "touristspot":
        return navigator("/spots/" + id);
        break;
      case "restaurant":
        return navigator("/restaurants/" + id);
        break;
      case "accommodation":
        return navigator("/accommodations/" + id);
        break;
    }
  };
  const bookmarkHandler = event => {
    event.stopPropagation();
    const isLoggedIn = checkIsLoggedIn();
    if (isLoggedIn) {
      api
        .get(`/auth/${category}/bookmark/` + id)
        .then(response => {
          if (response.data.isSuccess) {
            const nextBookmarked = response.data.data.bookmarked;
            setIsBookmarked(nextBookmarked);
            setCounter(previousCounter => previousCounter + 1);
          } else {
            alert(response.data.message);
          }
        })
        .catch(error => {
          alert(error);
        });
    } else {
      alert("로그인을 먼저 해주세요.");
    }
  };
  return (
    <div
      onClick={itemClickHandler}
      className="p-2 md:p-4 group bg-white1 rounded-md mb-4 shadow-md cursor-pointer flex justify-start items-start hover:brightness-95 transition-all"
    >
      <div className="w-[150px] h-[120px] md:w-[220px] md:h-[150px] flex-shrink-0 relative mr-2">
        <img loading="lazy" className="w-full h-full object-cover object-center rounded-md" src={thumbnailUrl} alt={name} />
        <Bookmark bookmarked={isBookmarked} bookmarkHandler={bookmarkHandler} />
      </div>
      <div>
        <div className="mb-1 flex items-center justify-start">
          <p className="font-bold text-sm md:text-lg">{name}</p>
          {hasNearStation && (
            <DirectionsBusFilledOutlinedIcon
              fontSize="medium"
              sx={{
                color: "rgb(242, 132, 50)"
              }}
            />
          )}
        </div>
        <div className="hidden md:block">
          <p className="text-xs">{region}</p>
        </div>
        <div className="mb-2">
          <p className="text-xs">{description}</p>
        </div>
        <div className="flex items-center">
          <FavoriteRoundedIcon sx={{ color: "red" }} className="mr-[3px]" />
          <p className="text-xs">{likeNum}</p>
        </div>
      </div>
    </div>
  );
};

export default Item;
