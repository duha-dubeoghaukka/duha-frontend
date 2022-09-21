import React, { useState } from 'react';
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import './styles.css';
import moment from 'moment';

function ScheduleRegisterPage() {
  const [value, onChange] = useState(new Date());

  return (
    <>
      <div>
        <Calendar onChange={onChange} value={value} selectRange={true} formatDay={(locale, date) => moment(date).format('DD')} minDetail="month" maxDetail="month" />
        <div className="text-gray-500 mt-4">{moment(value).format('YYYY년 MM월 DD일')}</div>
        <div className="flex flex-col">
          <input placeholder="출발하는 날짜를 입력해주세요" />
          <input placeholder="돌아오는 날짜를 입력해주세요" />
        </div>
      </div>
    </>
  );
}

export default ScheduleRegisterPage;
