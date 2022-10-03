import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { scheduleAPIs } from "../../api/api";

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

  const onClickDay = day => {
    if (day) {
      setActiveDay(true);
      const data = courseItem.filter(item => item.day === day);
      if (data[0].courseDetails[0]) {
        setIsDetailData(true);
        setMessage("");
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
        {courseItem?.map(item => {
          return (
            <div key={item.courseId} className="text-green1 font-bold text-lg px-4 cursor-pointer" onClick={() => onClickDay(item.day)}>
              Day{item.day}
            </div>
          );
        })}
      </div>
      <div className="course-layout">
        {/* active day가 true이면 선택한 day 코스 조회, 아니면 day1 데이터 조회*/}
        {activeDay ? (
          isDetailData ? (
            courseDetail?.map(item => {
              return <CourseItemComponent key={item.detailOrder} item={item} day={day} />;
            })
          ) : (
            <div className="mb-6 text-center font-bold text-base">{message}</div>
          )
        ) : firstDayData?.length || 0 ? (
          firstDayData?.map(item => {
            return <CourseItemComponent key={item.detailOrder} item={item} />;
          })
        ) : (
          <div className="mb-6 text-center font-bold text-base">{message}</div>
        )}
      </div>
    </>
  );
}

function CourseItemComponent({ item }) {
  const { detailOrder, category, name } = item;

  return (
    <div>
      <div className="flex items-center mb-9 flex justify-between">
        <div className="flex items-center">
          <div className="bg-green1 rounded-full w-12 h-12 text-center font-bold text-lg text-white1 pt-[10px]">{detailOrder}</div>
          <div className="my-2 ml-9">
            <div className="font-semibold text-sm">{category}</div>
            <div className="font-bold md:text-base text-sm">{name}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShareDetail;
