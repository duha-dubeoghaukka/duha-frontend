import React from "react";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api/api";

const AddBookMarkItem = ({ data, myCourse }) => {
  const { tripId, currentCourseId, day } = useParams();
  const navigate = useNavigate();
  const { id, name, description, thumbnailUrl } = data;
  const category = data.category;

  const itemClickHandler = async () => {
    try {
      const { data } = await api.post(`/auth/course/details`, {
        courseId: currentCourseId,
        category,
        detailId: id
      });
      if (data.isSuccess) {
        alert("코스가 저장되었습니다.");
        navigate(`/schedule/${tripId}/${day}`);
      } else {
        alert(data.message);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div
      onClick={itemClickHandler}
      className="p-[15px] group bg-white1 md:p-[20px] rounded-xl mb-[32px] shadow-md cursor-pointer flex justify-between items-start hover:brightness-95 transition-all"
    >
      <div className="group-hover:brightness-95">
        <div className="mb-[4px] flex flex-col items-start">
          <p className="font-bold text-[12px] md:text-[14px]">[{category}] </p>
          <p className="font-bold text-[14px] md:text-[16px]">{name}</p>
        </div>
        <div>
          <p className="text-[12px]">{description}</p>
        </div>
      </div>
      <div className="w-2/5 h-[120px] md:w-[220px] md:h-[150px] flex-shrink-0 relative">
        <img loading="lazy" className="w-full h-full object-cover object-center rounded-xl" src={thumbnailUrl} alt={name} />
      </div>
    </div>
  );
};

export default AddBookMarkItem;
