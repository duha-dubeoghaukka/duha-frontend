import React, { useEffect } from "react";
import { userInfoAPIs } from "../../api/api";
import useInput from "../../hooks/useInput";

function InputEmail({ category }) {
  const [email, setEmail, onChangeEmail] = useInput();

  useEffect(() => {}, [category]);

  const onEmailLink = () => {
    let data = {
      email
    };
    if (category === "email") {
      userInfoAPIs
        .emailLink(data)
        .then(res => {
          if (res.data.isSuccess) {
            alert("회원가입 링크가 해당 이메일로 전송되었습니다.");
          } else {
            alert(res.data.message);
          }
        })
        .catch(err => console.log("err", err.response));
    } else if (category === "findPassword") {
      userInfoAPIs
        .findPassword(data)
        .then(res => {
          if (res.data.isSuccess) {
            alert("비밀번호 재설정 링크가 해당 이메일로 전송되었습니다.");
          } else {
            alert(res.data.message);
          }
        })
        .catch(err => console.log("err", err.response));
    }
  };
  return (
    <>
      <h4 className="text-lg font-semibold text-black1 text-lg">이메일 인증</h4>
      <div className="border border-green1 h-14 w-full mt-5 mb-5">
        <div className="flex flex-row justify-between h-full">
          <input
            className="ml-2 w-4/5 focus:outline-none"
            placeholder="이메일을 입력하세요"
            name="email"
            value={email}
            onChange={onChangeEmail}
          />
          <button className="p-1 bg-green1 text-white1 font-semibold" onClick={() => onEmailLink()}>
            인증하기
          </button>
        </div>
      </div>
    </>
  );
}

export default InputEmail;
