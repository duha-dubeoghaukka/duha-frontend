import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import { useNavigate } from "react-router-dom";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

const Item = ({ data }) => {
  const navigator = useNavigate();
  const { id, name, description, region, likeNum, thumbnailUrl, bookmarked } = data;
  const itemClickHandler = () => {
    return navigator("/spots/" + id);
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
        {bookmarked ? (
          <StarRoundedIcon className="absolute top-1 right-1 cursor-pointer hover:scale-125" fontSize="large" sx={{ color: "#ffd740" }} />
        ) : (
          <StarOutlineRoundedIcon
            className="absolute top-1 right-1 cursor-pointer hover:scale-125"
            fontSize="large"
            sx={{ color: "#ffd740" }}
          />
        )}
      </div>
    </div>
  );
};

export default Item;
