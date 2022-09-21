import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "../../pages/schedule/styles.css";
import moment from "moment";
import Layout from "../../components/layout/Layout";
import useInput from "../../hooks/useInput";
import Button from "../../components/button/Button";

function Registration() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [value, setValue, onChangeHandler] = useInput();
  const [disableButton, setDisableButton] = useState();

  const [isChecked, setIsChecked] = useState();
  const handleClick = () => setIsChecked(!isChecked);

  const onSubmit = () => {
    if (startDate === "" || endDate === "" || value === "") {
      alert("전부 입력하세요!");
    } else {
      console.log("clicked");
    }
  };

  const changeDate = e => {
    const startDateFormat = moment(e[0]).format("YYYY/MM/DD");
    const endDateFormat = moment(e[1]).format("YYYY/MM/DD");

    setStartDate(startDateFormat);
    setEndDate(endDateFormat);
  };

  useEffect(() => {}, []);

  return (
    <Layout isLoggedIn={false} title="일정 등록" highlight={"schedule/create"}>
      <div className="grid place-items-center h-screen">
        <div className="flex w-72 flex-col gap-4 ">
          <Calendar onChange={changeDate} selectRange={true} formatDay={(locale, date) => moment(date).format("DD")} />
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
          <div className="flex flex-row  space-x-24">
            <p className="text-sm">일정을 다른사람과 공유합니다.</p>
            <input type="checkbox" checked={isChecked || ""} name="checked" onChange={handleClick} />
          </div>
          <Button
            text="등록하기"
            type="button"
            buttonStyle={startDate === "" || endDate === "" || value === "" ? "disabled" : "rounded"}
            onClick={() => onSubmit()}
          />
        </div>
      </div>
    </Layout>
  );
}

export default Registration;
