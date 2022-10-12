import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./styles.css";
import moment from "moment";
import Layout from "../../components/layout/Layout";
import useInput from "../../hooks/useInput";
import Button from "../../components/button/Button";
import { scheduleAPIs } from "../../api/api";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { routingLoginPage } from "../../utils/routingLoginPage";
import { useDispatch } from "react-redux";
import { __editSchedule } from "../../redux/modules/schedules";

function Registration() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const param = useParams();
  const id = Number(param.id);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [value, setValue, onChangeHandler] = useInput();
  const [isChecked, setIsChecked] = useState();

  const handleClick = () => {
    setIsChecked(!isChecked);
  };

  const onSubmit = () => {
    if (startDate === "" || endDate === "" || value === "") {
      alert("전부 입력하세요!");
    } else {
      scheduleAPIs
        .register({
          title: value,
          description: null,
          isPublic: isChecked ? isChecked : false,
          startAt: startDate,
          endAt: endDate
        })
        .then(res => {
          if (res.data.isSuccess) {
            alert("일정 등록이 완료되었습니다!");
            navigate(`/schedule`);
          } else {
            alert("일정 등록이 실패되었습니다!");
          }
        });
    }
  };

  const onEdit = id => {
    let data = {
      title: value,
      isPublic: isChecked,
      startAt: startDate,
      endAt: endDate
    };
    dispatch(__editSchedule({ id: id, editData: data }))
      .then(res => {
        if (res.payload.isSuccess) {
          alert("변경이 완료되었습니다.");
          navigate(`/schedule`);
        } else {
          alert(res.payload.message);
        }
      })
      .catch(err => alert(err.response));
  };

  const changeDate = e => {
    const startDateFormat = moment(e[0]).format("YYYY/MM/DD");
    const endDateFormat = moment(e[1]).format("YYYY/MM/DD");

    setStartDate(startDateFormat);
    setEndDate(endDateFormat);
  };

  useEffect(() => {
    routingLoginPage(navigate);
    if (state) {
      setValue(state[0]);
      setStartDate(state[1]);
      setEndDate(state[2]);
      setIsChecked(state[3]);
    }
  }, []);

  return (
    <Layout isLoggedIn={false} title="일정 등록" highlight={"schedule/create"}>
      <div className="grid place-items-center h-screen mt-10">
        <div className="flex w-72 flex-col gap-4 h-screen">
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
          <div className="flex flex-row space-x-20 mb-3">
            <p className="text-sm ml-2">일정을 다른사람과 공유합니다.</p>
            <input type="checkbox" checked={isChecked || ""} name="checked" onChange={handleClick} />
          </div>
          {state ? (
            <Button
              text="변경하기"
              type="button"
              buttonStyle={startDate === "" || endDate === "" || value === "" ? "disabled" : "rounded"}
              onClick={() => onEdit(id)}
            />
          ) : (
            <Button
              text="등록하기"
              type="button"
              buttonStyle={startDate === "" || endDate === "" || value === "" ? "disabled" : "rounded"}
              onClick={() => onSubmit()}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Registration;
