import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";

const Item = ({ data }) => {
  const { name, description, region, likeNum, thumbnailUrl } = data;
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
          <p className="text-[12px]">{region}</p>
        </div>
        <div className="flex items-center">
          <FavoriteRoundedIcon sx={{ color: "red" }} className="mr-[3px]" />
          <p className="text-[12px]">{likeNum}</p>
        </div>
      </div>
      <div className="flex justify-end">
        <img className="w-[220px] h-full object-cover rounded-xl" src={thumbnailUrl} alt={name} />
      </div>
    </div>
  );
};

export default Item;
