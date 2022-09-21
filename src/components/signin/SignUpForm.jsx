import { React, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [isHidden, setIsHidden] = useState(true);
  const [inputValue, setInputValue] = useState({
    email: "",
    nickname: "",
    password: ""
  });

  const [validEmailCheck, setValidEmailCheck] = useState(false);
  const [validNicknameCheck, setValidNicknameCheck] = useState(false);
  const [validPasswordCheck, setValidPasswordCheck] = useState(false);
  const [eamailDuplicateCheck, setEmailDuplicateCheck] = useState(false);

  const handleHide = () => setIsHidden(!isHidden);

  const { email, nickname, password } = inputValue;

  const handleInput = e => {
    const { id, value } = e.target;

    const emailRegex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (emailRegex.test(inputValue.email)) {
      setValidEmailCheck(false);
    } else {
      setValidEmailCheck(true);
    }

    const nicknameRegex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|+]{2,6}$/;
    if (nicknameRegex.test(inputValue.nickname)) {
      setValidNicknameCheck(false);
    } else {
      setValidNicknameCheck(true);
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;
    if (passwordRegex.test(inputValue.password)) {
      setValidPasswordCheck(false);
    } else {
      setValidPasswordCheck(true);
    }

    setInputValue({
      ...inputValue,
      [id]: value
    });
    console.log(inputValue.nickname);
  };

  const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();
    try {
      alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
      // navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const nicknameDuplicateCheck = () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[600px] mx-auto">
      <form className="flex flex-col my-10 py-10" onSubmit={handleSubmit}>
        <img src="https://i.ibb.co/sHHr4Dj/2.png" className="w-[284px] mx-auto" />
        <div className="relative w-[385px] md:w-[500px] mx-auto">
          <input id="email" type="text" placeholder="이메일" className="input" required dafaultvalue={email} onChange={handleInput} />
          <button className="absolute top-3 right-4 font-semibold text-green1">중복확인</button>
        </div>
        {validEmailCheck && <p className="input-helper">이메일 형식으로 입력해주세요</p>}
        {eamailDuplicateCheck && <p className="input-helper">중복된 이메일 입니다</p>}
        <div className="relative w-[385px] md:w-[500px] mx-auto">
          <input id="nickname" type="text" placeholder="닉네임" className="input" required dafaultvalue={nickname} onChange={handleInput} />
          <button className="absolute top-3 right-4 font-semibold text-green1" onClick={nicknameDuplicateCheck}>
            중복확인
          </button>
        </div>
        {validNicknameCheck && <p className="input-helper">한글/영문 2글자 이상</p>}
        <input
          id="password"
          type={isHidden ? "password" : "text"}
          placeholder="비밀번호"
          className="input"
          autoComplete="false"
          dafaultvalue={password}
          onChange={handleInput}
          required
        />
        {validPasswordCheck && <p className="input-helper">영문/숫자/특수문자 조합 4글자 이상</p>}
        <input type={isHidden ? "password" : "text"} placeholder="비밀번호 확인" className="input" autoComplete="false" required />
        <button className="btn-primary mx-auto my-4">회원 가입</button>
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
