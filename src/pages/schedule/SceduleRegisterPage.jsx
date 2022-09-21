import React, { useState } from "react";
import Calendar from "react-calendar";
// import 'react-calendar/dist/Calendar.css';
import "./styles.css";
import moment from "moment";
import Layout from "../../components/layout/Layout";
import useInput from "../../hooks/useInput";
import Button from "../../components/button/Button";

function ScheduleRegisterPage() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [value, setValue, onChangeHandler] = useInput();
  const [disableButton, setDisableButton] = useState();

  const changeDate = e => {
    setDisableButton(false); //버튼 비활성화 푸는 state

    const startDateFormat = moment(e[0]).format("YYYY/MM/DD");
    const endDateFormat = moment(e[1]).format("YYYY/MM/DD");

    setStartDate(startDateFormat);
    setEndDate(endDateFormat);
  };

  return (
    <Layout isLoggedIn={false} title="관광지" highlight={"mainpage/spots"}>
      <div>
        <Calendar onChange={changeDate} selectRange={true} formatDay={(locale, date) => moment(date).format("DD")} />
        <div className="flex w-72 flex-col gap-4">
          <input
            type="text"
            className="w-full p-2 text-sm border-b-2 border-green1 outline-none opacity-70 my-5 bg-transparent"
            placeholder="출발하는 날짜를 입력해주세요"
            value={startDate || ""}
            disabled
          />
          <input
            type="text"
            className="w-full p-2 text-sm border-b-2 border-green1 outline-none opacity-70 bg-transparent"
            placeholder="돌아오는 날짜를 입력해주세요"
            value={endDate || ""}
            disabled
          />
          <input
            type="text"
            className="w-full p-2 text-sm border-b-2 border-green1 outline-none opacity-70 bg-transparent my-5"
            placeholder="일정 제목을 입력하세요"
            name="title"
            value={value}
            onChange={onChangeHandler}
          />
          <p>일정을 다른사람과 공유합니다.</p>
          <Button text="등록하기" type="button" buttonStyle="rounded" handleClick={() => console.log("Clicked!")} />
        </div>
      </div>
    </Layout>
  );
}

export default ScheduleRegisterPage;
