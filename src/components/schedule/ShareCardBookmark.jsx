import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

const ShareCardBookmark = ({ bookmarked, bookmarkHandler }) => {
  return (
    <div>
      {bookmarked ? (
        <StarRoundedIcon
          className="absolute top-4 right-4 cursor-pointer hover:scale-125"
          fontSize="large"
          sx={{ color: "#ffd740" }}
          onClick={bookmarkHandler}
        />
      ) : (
        <StarOutlineRoundedIcon
          className="absolute top-4 right-4 cursor-pointer hover:scale-125"
          fontSize="large"
          sx={{ color: "#ffd740" }}
          onClick={bookmarkHandler}
        />
      )}
    </div>
  );
};

export default ShareCardBookmark;
