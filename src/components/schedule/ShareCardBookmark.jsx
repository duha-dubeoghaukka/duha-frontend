import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";

const ShareCardBookmark = () => {
  return (
    <div>
      <StarOutlineRoundedIcon
        className="absolute top-1 right-1 cursor-pointer hover:scale-125"
        fontSize="large"
        sx={{ color: "#ffd740" }}
      />
    </div>
  );
};

export default ShareCardBookmark;
