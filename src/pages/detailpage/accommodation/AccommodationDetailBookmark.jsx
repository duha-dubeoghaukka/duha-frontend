import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";

const AccommodationDetailBookmark = ({ bookmarked, bookmarkHandler }) => {
  return (
    <div className="cursor-pointer">
      {bookmarked ? (
        <StarRoundedIcon fontSize="large" sx={{ color: "#ffd740" }} onClick={bookmarkHandler} />
      ) : (
        <StarOutlineRoundedIcon fontSize="large" sx={{ color: "#ffd740" }} onClick={bookmarkHandler} />
      )}
    </div>
  );
};

export default AccommodationDetailBookmark;
