import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";

const Bookmark = ({ bookmarked, bookmarkHandler, numberOfBookmarks }) => {
  return (
    <div className="flex items-center">
      {bookmarked ? (
        <StarRoundedIcon sx={{ color: "#ffd740" }} onClick={bookmarkHandler} />
      ) : (
        <StarOutlineRoundedIcon sx={{ color: "#ffd740" }} onClick={bookmarkHandler} />
      )}
      <p className="text-black1 font-bold text-sm ml-1">{numberOfBookmarks}</p>
    </div>
  );
};

export default Bookmark;
