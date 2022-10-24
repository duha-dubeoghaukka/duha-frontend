import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { scheduleAPIs } from "../../api/api";
import MapContainer from "../map/MapContainer";
import NonLayoutSpinner from "../Spinner/NonLayoutSpinner";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { sortBy } from "lodash";

function ShareDetail() {
  const param = useParams();
  const id = Number(param.id);

  const [courseItem, setCourseItem] = useState();
  const [courseDetail, setCourseDetail] = useState();
  const [activeDay, setActiveDay] = useState(false);
  const [firstDayData, setFirstDayData] = useState();
  const [day, setDay] = useState();
  const [message, setMessage] = useState("1일차에 등록된 코스가 없습니다.");
  const [isDetailData, setIsDetailData] = useState();

  useEffect(() => {
    scheduleAPIs.getShareDetailCourse(id).then(res => {
      setCourseItem(res.data.data.courses);
      setDay(res.data.data.courses.day);
      // default로 렌더링 시킬 day1 데이터
      setFirstDayData(res.data.data.courses[0].courseDetails);
    });
  }, []);

  if (!courseItem) return <NonLayoutSpinner />;

  const onClickDay = day => {
    setDay(day);

    if (day) {
      setActiveDay(true);
      const data = courseItem.filter(item => item.day === day);
      if (data[0].courseDetails[0]) {
        setIsDetailData(true);
        setMessage(null);
        setCourseDetail(data[0].courseDetails);
      } else {
        setIsDetailData(false);
        setMessage(`${day}일차에 등록된 코스가 없습니다.`);
        setCourseDetail(data[0].courseDetails);
      }
    }
  };

  return (
    <>
      <div className="mt-4 mb-6 flex justify-center">
        <div className="my-2 flex justify-start overflow-x-scroll pb-4 pt-2">
          {courseItem?.map(item => {
            return (
              <div key={item?.courseId} className="font-bold text-lg px-4 cursor-pointer">
                <>
                  {!activeDay ? (
                    1 === item.day ? (
                      <div
                        className="border-b-2 pb-1 border-green1 text-green1 transition ease-in-out"
                        onClick={() => onClickDay(item.day)}
                      >
                        Day{item.day}
                      </div>
                    ) : (
                      <div
                        className="border-b-2 pb-1 border-white text-gray-400 hover:border-gray-400 transition ease-in-out"
                        onClick={() => onClickDay(item.day)}
                      >
                        Day{item.day}
                      </div>
                    )
                  ) : day === item.day ? (
                    <div className="border-b-2 pb-1 border-green1 text-green1 transition ease-in-out" onClick={() => onClickDay(item.day)}>
                      Day{item.day}
                    </div>
                  ) : (
                    <div
                      className="border-b-2 pb-1 border-white text-gray-400 hover:border-gray-400 transition ease-in-out"
                      onClick={() => onClickDay(item.day)}
                    >
                      Day{item.day}
                    </div>
                  )}
                </>
              </div>
            );
          })}
        </div>
      </div>
      <div className="course-layout">
        {activeDay
          ? courseDetail?.length > 0 && (
              <div className="bg-gray-200 md:h-[350px] h-[200px] mb-4 md:mb-6 shadow-md rounded-lg">
                <MapContainer dayCourse={courseDetail} />
              </div>
            )
          : firstDayData?.length > 0 && (
              <div className="bg-gray-200 md:h-[350px] h-[200px] mb-4 md:mb-6 shadow-md rounded-lg">
                <MapContainer dayCourse={firstDayData} />
              </div>
            )}
        {/* active day가 true이면 선택한 day 코스 조회, 아니면 day1 데이터 조회*/}
        {activeDay ? (
          isDetailData ? (
            sortBy(courseDetail, ["detailOrder"])?.map(item => {
              return <CourseItemComponent key={item.detailOrder} item={item} day={day} course={courseDetail} />;
            })
          ) : (
            <div className="mb-6 text-center font-bold text-base">{message}</div>
          )
        ) : firstDayData?.length || 0 ? (
          sortBy(firstDayData, ["detailOrder"])?.map(item => {
            return <CourseItemComponent key={item.detailOrder} item={item} course={firstDayData} />;
          })
        ) : (
          <div className="mb-6 text-center font-bold text-base">{message}</div>
        )}
      </div>
    </>
  );
}

function CourseItemComponent({ item, course }) {
  const { detailOrder, category, name } = item;

  return (
    <>
      <div className="flex items-center flex justify-between md:mb-3 mb-1">
        <div className="flex items-center">
          <div className="bg-green1 rounded-full w-12 h-12 text-center font-bold text-lg text-white1 pt-[10px]">{detailOrder}</div>
          <div className="my-2 ml-9">
            <div className="font-semibold text-sm">{category}</div>
            <div className="font-bold md:text-base text-sm">{name}</div>
          </div>
        </div>
      </div>
      {detailOrder !== course.length && <KeyboardDoubleArrowDownIcon className="md:mb-3 mb-1 ml-3 text-green1" />}
    </>
  );
}

export default ShareDetail;
