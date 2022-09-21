import { React, useState } from "react";
import { Link } from "react-router-dom";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

const SignUpForm = () => {
  const [isHidden, setIsHidden] = useState(true);
  const handleHide = () => setIsHidden(!isHidden);

  const handleSubmit = event => {
    event.preventDefault();
  };

  const idDuplicateCheck = () => {};

  return (
    <div className="w-[600px] mx-auto">
      <form className="flex flex-col my-10 py-10" onSubmit={handleSubmit}>
        <img src="https://i.ibb.co/sHHr4Dj/2.png" className="w-[284px] mx-auto" />
        <div className="relative w-[385px] md:w-[500px] mx-auto">
          <input type="text" placeholder="아이디" className="input" required />
          <button className="absolute top-3 right-4 font-semibold text-green1" onClick={idDuplicateCheck}>
            중복확인
          </button>
        </div>
        <p className="input-helper">이메일 형식으로 입력해주세요</p>
        <p className="input-helper">중복된 이메일 입니다</p>
        <input type="text" placeholder="닉네임" className="input" required />
        <p className="input-helper">한글/영문 2글자 이상</p>
        <div className="relative w-[385px] md:w-[500px] mx-auto">
          {isHidden ? (
            <input type="password" placeholder="비밀번호" className="input" required />
          ) : (
            <input type="text" placeholder="비밀번호" className="input" required />
          )}
          {isHidden ? (
            <VisibilityOutlinedIcon className="password-icon" onClick={handleHide} />
          ) : (
            <VisibilityOffOutlinedIcon className="password-icon" onClick={handleHide} />
          )}
        </div>
        <p className="input-helper">영문/숫자/특수문자 조합 4글자 이상</p>
        <input type="password" placeholder="비밀번호 확인" className="input" required />
        <button className="btn-primary mx-auto my-4">회원 가입</button>
        <p className="mx-auto my-4">
          계정이 있으신가요?{" "}
          <Link to="/login" className="font-bold">
            로그인
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
