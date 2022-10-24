import React, { useEffect, useState } from "react";
import { userInfoAPIs } from "../../api/api";
import useInput from "../../hooks/useInput";

function InputEmail({ category }) {
  const [email, _, onChangeEmail] = useInput();
  const [message, setMessage] = useState();

  useEffect(() => {}, [category]);

  const onEmailLink = () => {
    let data = {
      email
    };
    if (category === "email") {
      if (email === "") {
        setMessage("이메일을 입력하세요");
      } else {
        userInfoAPIs
          .emailLink(data)
          .then(res => {
            if (res.data.code === "NULL") {
              setMessage("회원가입 링크가 이메일로 전송되었습니다.");
            } else {
              setMessage(res.data.message);
            }
          })
          .catch(err => {
            setMessage(err.response.data.message);
          });
      }
    } else if (category === "findPassword") {
      if (email === "") {
        setMessage("이메일을 입력하세요");
      } else {
        userInfoAPIs
          .findPassword(data)
          .then(res => {
            if (res.data.code === "NULL") {
              setMessage("비밀번호 재설정 링크가 이메일로 전송되었습니다.");
            } else {
              setMessage(res.data.message);
            }
          })
          .catch(err => alert(err.response.data.message));
      }
    }
  };
  return (
    <>
      <h4 className="text-lg font-semibold text-black1 text-lg">이메일 인증</h4>
      <div className="border border-green1 h-14 mt-5 mb-8">
        <div className="flex flex-row justify-between  h-full">
          <input
            className="ml-2 w-4/5 focus:outline-none"
            placeholder="이메일을 입력하세요"
            name="email"
            value={email}
            onChange={onChangeEmail}
          />
          <button className="p-1 w-20 bg-green1 text-white1 font-semibold text-sm md:text-base" onClick={() => onEmailLink()}>
            인증하기
          </button>
        </div>
        <p className="input-helper">{message}</p>
      </div>
    </>
  );
}

export default InputEmail;
