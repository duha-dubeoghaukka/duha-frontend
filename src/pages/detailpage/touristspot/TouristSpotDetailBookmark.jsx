import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";

const TouristSpotDetailBookmark = ({ bookmarked }) => {
  return (
    <div className="cursor-pointer">
      {bookmarked ? (
        <StarRoundedIcon fontSize="large" sx={{ color: "#ffd740" }} />
      ) : (
        <StarOutlineRoundedIcon fontSize="large" sx={{ color: "#ffd740" }} />
      )}
    </div>
  );
};

export default TouristSpotDetailBookmark;
