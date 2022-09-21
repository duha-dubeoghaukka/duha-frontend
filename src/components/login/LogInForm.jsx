import React from 'react';
import { Link } from 'react-router-dom';

const LogInForm = () => {
  return (
    <div className="w-[600px] mx-auto">
      <form className="flex flex-col my-10 py-10">
        <img src="https://i.ibb.co/sHHr4Dj/2.png" className="w-[284px] mx-auto" />
        <input type="text" placeholder="아이디" className="input" />
        <input type="password" placeholder="비밀번호" className="input" />
        <button className="btn-primary mx-auto my-2">로그인</button>
        <button className="btn-kakao mx-auto my-2">카카오 계정으로 시작하기</button>
        <button className="btn-white mx-auto my-2">Google 계정으로 시작하기</button>
        <p className="mx-auto my-4">
          계정이 없으신가요?{' '}
          <Link to="/signup" className="font-bold">
            회원가입
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LogInForm;
