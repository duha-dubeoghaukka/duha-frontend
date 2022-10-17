import React, { useState } from "react";
import { api } from "../../api/api";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { Droppable, Draggable } from "react-beautiful-dnd";

const CourseItem = ({ dayCourse, setDayCourse, currentDay }) => {
  const deleteCourse = async (detailId, category) => {
    if (confirm("코스를 삭제할까요?")) {
      try {
        const { data } = await api.delete(`/auth/course/details`, {
          data: {
            category,
            detailId
          }
        });
        const newDayCourse = dayCourse.filter(dayCourse => dayCourse.detailId !== detailId);
        if (data.isSuccess) {
          setDayCourse(newDayCourse);
        } else {
          alert(data.message);
        }
      } catch (error) {
        throw new Error(error);
      }
    }
    return;
  };

  if (dayCourse.length === 0) return <div className="mb-6 text-center font-bold text-base">{currentDay}일차에 등록된 코스가 없습니다.</div>;
  return (
    <Droppable droppableId="courses">
      {provided => (
        <div className="courses" {...provided.droppableProps} ref={provided.innerRef}>
          {dayCourse.map((course, index) => (
            <Draggable key={course.detailId} draggableId={String(course.detailId)} index={index}>
              {provided => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                  <div className="flex items-center flex justify-between md:mb-3 mb-1">
                    <div className="flex items-center">
                      <div className="bg-green1 rounded-full w-8 h-8 pt-0.5 md:w-12 md:h-12 md:pt-[10px] text-center font-bold md:text-lg text-white1 ">
                        {index + 1}
                      </div>
                      <div className="my-2 ml-4 md:ml-9">
                        <div className="font-semibold text-sm">{course.category}</div>
                        <div className="font-bold md:text-base text-sm">{course.name}</div>
                      </div>
                    </div>
                    <div className="flex">
                      <DragIndicatorIcon className="text-gray-700" />
                      <DeleteOutlineIcon
                        className="cursor-pointer text-gray-700"
                        onClick={() => {
                          deleteCourse(course.detailId, course.category);
                        }}
                      />
                    </div>
                  </div>
                  {index + 1 !== dayCourse.length && <KeyboardDoubleArrowDownIcon className="md:mb-3 mb-1 ml-1 md:ml-3 text-green1" />}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default CourseItem;
