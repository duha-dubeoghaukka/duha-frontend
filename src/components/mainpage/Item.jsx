import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
// import StarRoundedIcon from "@mui/icons-material/StarRounded";

const Item = ({ data }) => {
  const { name, description, region, likeNum, thumbnailUrl } = data;
  const starClickHandler = () => {};
  return (
    <div className="p-[15px] bg-white1 md:p-[20px] rounded-xl mb-[32px] shadow-md flex justify-between items-center">
      <div className="pl-[5px] md:pl-[50px]">
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
      <div className="ml-3 w-[150px] h-[90px] md:w-[220px] md:h-[150px] flex-shrink-0 relative">
        <img loading="lazy" className="w-full h-full object-cover object-center rounded-xl" src={thumbnailUrl} alt={name} />
        <StarOutlineRoundedIcon
          onClick={starClickHandler}
          className="absolute top-1 right-1 cursor-pointer"
          fontSize="large"
          sx={{ color: "#ffd740" }}
        />
      </div>
    </div>
  );
};

export default Item;
