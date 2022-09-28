import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { useNavigate } from "react-router-dom";
import Bookmark from "./Bookmark";
import { useContext, useState } from "react";
import checkIsLoggedIn from "../../utils/checkIsLoggedIn";
import { bookmarkAPI } from "../../api/api";
import GlobalState from "../../shared/GlobalState";

const Item = props => {
  const { spotsBookmarks } = useContext(GlobalState);
  const { spotBookmarks, setSpotBookmarks } = spotsBookmarks;
  const navigator = useNavigate();
  const { id, name, description, region, likeNum, thumbnailUrl, bookmarked } = props.data;
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);
  const itemClickHandler = () => {
    return navigator("/spots/" + id);
  };
  const bookmarkHandler = () => {
    const isLoggedIn = checkIsLoggedIn();
    if (isLoggedIn) {
      const promise = bookmarkAPI.get("/auth/touristspot/bookmark/" + id);
      promise
        .then(response => {
          if (response.data.isSuccess) {
            setIsBookmarked(previousIsBookMarked => !previousIsBookMarked);
            if (spotBookmarks.find(bookmark => bookmark.id === id)) {
              const spotBookmarksCopy = [...spotBookmarks];
              const mutatedBookmarks = spotBookmarksCopy.map(bookmark => {
                if (bookmark.id === id) {
                  bookmark.bookmarked = !bookmark.bookmarked;
                }
                return bookmark;
              });
              setIsBookmarked(mutatedBookmarks);
            } else {
              const spotBookmarksCopy = [...spotBookmarks];
              spotBookmarksCopy.push({
                id,
                bookmarked: !bookmarked
              });
              setSpotBookmarks(spotBookmarksCopy);
            }
          } else {
            alert(response.error);
          }
        })
        .catch(error => {
          alert(error);
        });
    } else {
      alert("로그인을 먼저 해주세요");
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
