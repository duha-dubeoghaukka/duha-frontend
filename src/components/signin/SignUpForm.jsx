import React from 'react';
import { Link } from 'react-router-dom';

const SignUpForm = () => {
  return (
    <div className="w-[600px] mx-auto">
      <form className="flex flex-col my-10 py-10">
        <img src="https://i.ibb.co/sHHr4Dj/2.png" className="w-[284px] mx-auto" />
        <input type="text" placeholder="아이디" className="input" required />
        <p>이메일 형식</p>
        <input type="text" placeholder="닉네임" className="input" required />
        <p>한글,영문 2글자 이상</p>
        <input type="password" placeholder="비밀번호" className="input" required />
        <p>영문+숫자+특수문자 4글자 이상</p>
        <input type="password" placeholder="비밀번호 확인" className="input" required />
        <button className="btn-primary mx-auto my-4">회원 가입</button>
        <p className="mx-auto my-4">
          계정이 있으신가요?{' '}
          <Link to="/login" className="font-bold">
            로그인
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
