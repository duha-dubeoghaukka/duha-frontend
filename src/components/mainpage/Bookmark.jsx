import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";

const Bookmark = ({ bookmarked, bookmarkHandler }) => {
  return (
    <div>
      {bookmarked ? (
        <StarRoundedIcon
          className="absolute top-1 right-1 cursor-pointer hover:scale-125"
          fontSize="large"
          sx={{ color: "#ffd740" }}
          onClick={bookmarkHandler}
        />
      ) : (
        <StarOutlineRoundedIcon
          className="absolute top-1 right-1 cursor-pointer hover:scale-125"
          fontSize="large"
          sx={{ color: "#ffd740" }}
          onClick={bookmarkHandler}
        />
      )}
    </div>
  );
};

export default Bookmark;
