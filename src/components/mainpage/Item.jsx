import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import { useNavigate } from "react-router-dom";
import { instance } from "../../api/api";
import checkIsLoggedIn from "../../utils/checkIsLoggedIn";
import { useState } from "react";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

const Item = ({ data }) => {
  const navigator = useNavigate();
  const [isBookMarked, setIsBookMarked] = useState(false);
  const { id, name, description, region, likeNum, thumbnailUrl } = data;
  const bookmark = async () => {
    const { response } = await instance.get("/auth/touristspot/bookmark/" + id);
    console.dir(response);
  };
  const emptyStarClickHandler = () => {
    const isLoggedIn = checkIsLoggedIn();
    if (isLoggedIn) {
      bookmark()
        .then(response => {
          console.dir(response);
        })
        .catch(error => {
          setIsBookMarked(true);
        });
    } else {
      return navigator("/login");
    }
  };
  const filledStarClickHandler = () => {
    setIsBookMarked(false);
  };
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
        {isBookMarked ? (
          <StarRoundedIcon
            onClick={filledStarClickHandler}
            className="absolute top-1 right-1 cursor-pointer"
            fontSize="large"
            sx={{ color: "#ffd740" }}
          />
        ) : (
          <StarOutlineRoundedIcon
            onClick={emptyStarClickHandler}
            className="absolute top-1 right-1 cursor-pointer"
            fontSize="large"
            sx={{ color: "#ffd740" }}
          />
        )}
      </div>
    </div>
  );
};

export default Item;
