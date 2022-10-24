import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api/api";
import DirectionsBusFilledOutlinedIcon from "@mui/icons-material/DirectionsBusFilledOutlined";

const AddCourseItem = ({ data, category }) => {
  const { tripId, currentCourseId, day } = useParams();
  const navigate = useNavigate();
  const { id, name, description, region, likeNum, thumbnailUrl, hasNearStation } = data;

  const itemClickHandler = async () => {
    try {
      await api.post(`/auth/course/details`, {
        courseId: currentCourseId,
        category,
        detailId: id
      });
      alert("코스가 저장되었습니다.");
      navigate(`/schedule/${tripId}/${day}`);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div
      onClick={itemClickHandler}
      className="p-2 md:p-4 group bg-white1 rounded-md mb-4 shadow-md cursor-pointer flex justify-start items-start hover:brightness-95 transition-all"
    >
      <div className="w-[150px] h-[120px] md:w-[220px] md:h-[150px] flex-shrink-0 relative mr-2">
        <img loading="lazy" className="w-full h-full object-cover object-center rounded-md" src={thumbnailUrl} alt={name} />
      </div>
      <div className="group-hover:brightness-95">
        <div className="mb-1 flex items-center justify-start">
          <p className="font-bold text-sm md:text-lg">{name}</p>
          {hasNearStation && (
            <DirectionsBusFilledOutlinedIcon
              fontSize="medium"
              sx={{
                color: "rgb(116, 175, 115)"
              }}
              className=""
            />
          )}
        </div>
        <div className="hidden md:block">
          <p className="text-xs">{region}</p>
        </div>
        <div className="mb-2">
          <p className="text-xs">{description}</p>
        </div>
        <div className="flex items-center">
          <FavoriteRoundedIcon sx={{ color: "red" }} className="mr-[3px]" />
          <p className="text-xs">{likeNum}</p>
        </div>
      </div>
    </div>
  );
};

export default AddCourseItem;
