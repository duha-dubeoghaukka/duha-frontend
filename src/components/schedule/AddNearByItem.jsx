import React from "react";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api/api";

const AddNearByItem = ({ data, lastCourseName }) => {
  const { tripId, currentCourseId, day } = useParams();
  const navigate = useNavigate();
  const { id, name, description, thumbnailUrl, distance } = data;
  const category = data.category;

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
      <div className="w-[150px] h-[120px] md:w-[220px] md:h-[150px] flex-shrink-0 relative">
        <img loading="lazy" className="w-full h-full object-cover object-center rounded-md" src={thumbnailUrl} alt={name} />
      </div>
      <div className="group-hover:brightness-95 ml-2 md:ml-4">
        <div className="mb-1 flex flex-col items-start">
          <p className="text-xs md:text-sm">{category}</p>
          <p className="font-bold text-sm md:text-base">{name}</p>
        </div>
        <div className="flex items-center my-1">
          <RoomOutlinedIcon fontSize="small" className="text-gray-600" />
          <p className="text-xs md:text-sm">
            {lastCourseName}부터 {distance}m
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default AddNearByItem;
