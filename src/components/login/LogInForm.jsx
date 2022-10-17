import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { api } from "../../api/api";
import { KAKAO_AUTH_URI } from "../../utils/socialLoginUtils/kakao";
import { GOOGLE_AUTH_URI } from "../../utils/socialLoginUtils/google";
import useChange from "../../hooks/useChange";
import ShowEmailModal from "../modal/ShowEmailModal";

const LogInForm = () => {
  const [isHidden, setIsHidden] = useState(true);
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [validEmailCheck, setValidEmailCheck] = useState(false);

  const navigate = useNavigate();
  const isToken = localStorage.getItem("authorization");
  const [isSignupModal, signupModalHandler] = useChange();
  const [isResetPasswordModal, resetPasswordModalHandler] = useChange();

  const handleHide = () => setIsHidden(!isHidden);

  const onChangeEmail = e => {
    setInputEmail(e.target.value);
    const emailRegex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (emailRegex.test(e.target.value)) {
      setValidEmailCheck(false);
    } else {
      setValidEmailCheck(true);
      setInputEmail(e.target.value);
    }
  };

  const onChangePassword = e => {
    setInputPassword(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await api.post(`/member/login`, {
        email: inputEmail,
        password: inputPassword
      });
      if (response.data.isSuccess) {
        alert("로그인 되었습니다. 메인페이지로 이동합니다.");
        localStorage.setItem("authorization", response.headers.authorization);
        localStorage.setItem("refresh-token", response.headers["refresh-token"]);
        navigate("/");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const kakaoLogin = () => {
    isToken ? navigate(`/`) : (location.href = KAKAO_AUTH_URI);
  };

  const googleLogin = () => {
    isToken ? navigate(`/`) : (location.href = GOOGLE_AUTH_URI);
  };

  return (
    <div className="w-full md:w-[600px] mx-auto mt-5 md:mt-10">
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <img src="https://i.ibb.co/sHHr4Dj/2.png" className="w-[284px] mx-auto" alt={"Logo"} />
        <input
          type="text"
          placeholder="이메일"
          className="input mt-2"
          autoComplete="true"
          dafaultvalue={inputEmail}
          onChange={onChangeEmail}
          required
        />
        {validEmailCheck && <p className="input-helper">이메일 형식으로 입력해주세요</p>}
        <div className="relative w-full md:w-[500px] mx-auto mt-2">
          <input
            type={isHidden ? "password" : "text"}
            placeholder="비밀번호"
            className="input"
            autoComplete="false"
            dafaultvalue={inputPassword}
            onChange={onChangePassword}
            required
          />
          <span className="password-icon" onClick={handleHide}>
            {isHidden ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
          </span>
        </div>
        <button className="btn-primary mx-auto mt-4">로그인</button>
      </form>
      <button className="btn-kakao mx-auto my-2 grid place-items-center" onClick={() => kakaoLogin()}>
        카카오 계정으로 시작하기
      </button>
      <button className="btn-white flex items-center justify-center mx-auto my-2" onClick={() => googleLogin()}>
        <svg width={19} height={20} viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M18.9892 10.1871C18.9892 9.36767 18.9246 8.76973 18.7847 8.14966H9.68848V11.848H15.0277C14.9201 12.767 14.3388 14.1512 13.047 15.0812L13.0289 15.205L15.905 17.4969L16.1042 17.5173C17.9342 15.7789 18.9892 13.221 18.9892 10.1871Z"
            fill="#4285F4"
          />
          <path
            d="M9.68813 19.9314C12.3039 19.9314 14.4999 19.0455 16.1039 17.5174L13.0467 15.0813C12.2286 15.6682 11.1306 16.0779 9.68813 16.0779C7.12612 16.0779 4.95165 14.3395 4.17651 11.9366L4.06289 11.9465L1.07231 14.3273L1.0332 14.4391C2.62638 17.6946 5.89889 19.9314 9.68813 19.9314Z"
            fill="#34A853"
          />
          <path
            d="M4.17667 11.9366C3.97215 11.3165 3.85378 10.6521 3.85378 9.96562C3.85378 9.27905 3.97215 8.6147 4.16591 7.99463L4.1605 7.86257L1.13246 5.44363L1.03339 5.49211C0.37677 6.84302 0 8.36005 0 9.96562C0 11.5712 0.37677 13.0881 1.03339 14.4391L4.17667 11.9366Z"
            fill="#FBBC05"
          />
          <path
            d="M9.68807 3.85336C11.5073 3.85336 12.7344 4.66168 13.4342 5.33718L16.1684 2.59107C14.4892 0.985496 12.3039 0 9.68807 0C5.89885 0 2.62637 2.23672 1.0332 5.49214L4.16573 7.99466C4.95162 5.59183 7.12608 3.85336 9.68807 3.85336Z"
            fill="#EB4335"
          />
        </svg>
        <a className="ml-2">Google 계정으로 시작하기</a>
      </button>
      <div className="flex flex-row justify-center">
        <p className="text-xs text-black2">Google 로그인은 Chrome 환경에서 이용해주세요</p>
      </div>
      <div className="flex flex-row justify-center">
        <p className="text-gray-600 mt-5">계정이 없으신가요?</p>
        <button
          className="font-bold ml-2 mt-5"
          onClick={() => {
            signupModalHandler();
          }}
        >
          회원가입
        </button>
        <ShowEmailModal show={isSignupModal} modalHandler={signupModalHandler} category={"email"} />
      </div>
      <div className="flex flex-row justify-center mt-2">
        <p className=" text-gray-600">비밀번호가 생각나지 않나요?</p>
        <button
          className="font-bold ml-2"
          onClick={() => {
            resetPasswordModalHandler();
          }}
        >
          비밀번호 찾기
        </button>
        <ShowEmailModal show={isResetPasswordModal} modalHandler={resetPasswordModalHandler} category={"findPassword"} />
      </div>
    </div>
  );
};

export default LogInForm;
