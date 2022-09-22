import axios from "axios";
import { React, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputNickname, setInputNickname] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputConfirmPassword, setInputConfirmPassword] = useState("");
  const [validEmailCheck, setValidEmailCheck] = useState(false);
  const [validNicknameCheck, setValidNicknameCheck] = useState(false);
  const [validPasswordCheck, setValidPasswordCheck] = useState(false);
  const [validConfirmPassword, setValidConfirmPassword] = useState(false);
  const [validEmailDuplicateCheck, setValidEmailDuplicateCheck] = useState(false);
  const [validNicknameDuplicateCheck, setValidNicknameDuplicateCheck] = useState(false);
  // const [validationError, setValidationError] = useState(false);

  const navigate = useNavigate();

  const onChangeEmail = e => {
    const emailRegex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (emailRegex.test(e.target.value)) {
      setValidEmailCheck(false);
    } else {
      setValidEmailCheck(true);
      setInputEmail(e.target.value);
    }
  };

  const onChangeNickname = e => {
    const nicknameRegex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|+]{2,6}$/;
    if (nicknameRegex.test(e.target.value)) {
      setValidNicknameCheck(false);
    } else {
      setValidNicknameCheck(true);
      setInputNickname(e.target.value);
    }
  };

  const onChangePassword = e => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;
    if (passwordRegex.test(e.target.value)) {
      setValidPasswordCheck(false);
    } else {
      setValidPasswordCheck(true);
    }
    if (e.target.value === inputConfirmPassword) {
      setValidConfirmPassword(false);
    } else {
      setValidConfirmPassword(true);
      setInputPassword(e.target.value);
    }
  };

  const onChangeConfirmPassword = e => {
    if (e.target.value === inputPassword) {
      setValidConfirmPassword(false);
    } else {
      setValidConfirmPassword(true);
      setInputConfirmPassword(e.target.value);
    }
  };

  const eamailDuplicateCheck = async e => {
    e.preventDefault();
    if (validEmailCheck || !inputEmail) {
      return;
    } else {
      try {
        await axios.post(`/member/emailcheck`, {
          email: inputEmail
        });
        setValidEmailDuplicateCheck(false);
      } catch (error) {
        setValidEmailDuplicateCheck(true);
      }
    }
  };

  const nicknameDuplicateCheck = async e => {
    e.preventDefault();
    if (validNicknameDuplicateCheck || !inputNickname) {
      return;
    } else {
      try {
        await axios.post(`/member/nicknamecheck`, {
          nickname: inputNickname
        });
        setValidNicknameDuplicateCheck(false);
      } catch (error) {
        setValidNicknameDuplicateCheck(true);
      }
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (validEmailCheck || validNicknameCheck || validPasswordCheck || validConfirmPassword) {
      // setValidationError(true)
      return;
    } else {
      try {
        await axios.post(`/member/signup`, {
          email: inputEmail,
          nickname: inputNickname,
          password: inputPassword
        });
        alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
        // navigate("/login");
        setInputEmail("");
        setInputNickname("");
        setInputPassword("");
        setInputConfirmPassword("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="w-[600px] mx-auto">
      <form className="flex flex-col my-10" onSubmit={handleSubmit}>
        <img src="https://i.ibb.co/sHHr4Dj/2.png" className="w-[284px] mx-auto" />
        <div className="relative w-[385px] md:w-[500px] mx-auto">
          <input type="text" placeholder="이메일" className="input mt-2" required dafaultvalue={inputEmail} onChange={onChangeEmail} />
          <button className="absolute top-6 right-4 font-semibold text-green1" onClick={eamailDuplicateCheck}>
            중복확인
          </button>
        </div>
        {validEmailCheck && <p className="input-helper">이메일 형식으로 입력해주세요</p>}
        {validEmailDuplicateCheck && <p className="input-helper">중복된 이메일 입니다</p>}
        <div className="relative w-[385px] md:w-[500px] mx-auto">
          <input
            type="text"
            placeholder="닉네임"
            className="input mt-2"
            required
            dafaultvalue={inputNickname}
            onChange={onChangeNickname}
          />
          <button className="absolute top-6 right-4 font-semibold text-green1" onClick={nicknameDuplicateCheck}>
            중복확인
          </button>
        </div>
        {validNicknameCheck && <p className="input-helper">한글/영문 2글자 이상</p>}
        {validNicknameDuplicateCheck && <p className="input-helper">중복된 닉네임 입니다</p>}
        <input
          type="text"
          placeholder="비밀번호"
          className="input mt-2"
          autoComplete="false"
          dafaultvalue={inputPassword}
          onChange={onChangePassword}
          required
        />
        {validPasswordCheck && <p className="input-helper">영문/숫자 조합 4글자 이상</p>}
        <input
          type="text"
          placeholder="비밀번호 확인"
          className="input mt-2"
          autoComplete="false"
          onChange={onChangeConfirmPassword}
          required
        />
        {validConfirmPassword && <p className="input-helper">비밀번호가 일치하지 않습니다</p>}
        {/* {validationError && <p className="input-helper">양식에 맞게 작성해주세요</p>} */}
        <button className="btn-primary mx-auto mt-6 mb-4">회원 가입</button>
        <p className="mx-auto my-4 text-gray-600">
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
