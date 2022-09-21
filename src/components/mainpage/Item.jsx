import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";

const Item = ({ name, description, location, likes, image, isFavorite }) => {
  return (
    <div className="bg-white1 p-[20px] rounded-xl mb-[32px] shadow-md grid grid-cols-2">
      <div className="pl-[50px]">
        <div className="mb-[4px]">
          <p className="font-bold text-[20px]">{name}</p>
        </div>
        <div>
          <p className="text-[12px]">{description}</p>
        </div>
        <div className="mb-[16px]">
          <p className="text-[12px]">{location}</p>
        </div>
        <div className="flex items-center">
          <FavoriteRoundedIcon sx={{ color: "red" }} className="mr-[3px]" />
          <p className="text-[12px]">{likes}</p>
        </div>
      </div>
      <div>
        <p>{image}</p>
      </div>
    </div>
  );
};

export default Item;
