import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { useNavigate } from "react-router-dom";
import checkIsLoggedIn from "../../utils/checkIsLoggedIn";
import { bookmarkAPI } from "../../api/api";
import Bookmark from "./Bookmark";
import { useState } from "react";
import updateLocalStorage from "../../utils/updateLocalStorage";

const Item = ({ data }) => {
  const navigator = useNavigate();
  const { id, name, description, region, likeNum, thumbnailUrl, bookmarked } = data;
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);
  const itemClickHandler = () => {
    return navigator("/spots/" + id);
  };
  const bookmarkHandler = () => {
    const isLoggedIn = checkIsLoggedIn();
    if (isLoggedIn) {
      bookmarkAPI
        .get("/auth/touristspot/bookmark/" + id)
        .then(response => {
          if (response.data.isSuccess) {
            const nextBookmarked = response.data.data.bookmarked;
            setIsBookmarked(nextBookmarked);
            updateLocalStorage(id, nextBookmarked);
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
    <div className="p-[15px] group bg-white1 md:p-[20px] rounded-xl mb-[32px] shadow-md cursor-pointer flex justify-between items-center hover:brightness-95 transition-all">
      <div className="pl-[5px] md:pl-[50px] group-hover:brightness-95" onClick={itemClickHandler}>
        <div className="mb-[4px]">
          <p className="font-bold text-[20px]">{name}</p>
        </div>
        <div>
          <p className="text-[12px]">{description}</p>
        </div>
        <div className="mb-[16px]">
          <p className="text-[12px]">{region}</p>
        </div>
        <div className="flex items-center">
          <FavoriteRoundedIcon sx={{ color: "red" }} className="mr-[3px]" />
          <p className="text-[12px]">{likeNum}</p>
        </div>
      </div>
      <div className="ml-3 w-[150px] h-[120px] md:w-[220px] md:h-[150px] flex-shrink-0 relative">
        <img
          loading="lazy"
          className="w-full h-full object-cover object-center rounded-xl"
          src={thumbnailUrl}
          alt={name}
          onClick={itemClickHandler}
        />
        <Bookmark bookmarked={isBookmarked} bookmarkHandler={bookmarkHandler} />
      </div>
    </div>
  );
};

export default Item;
