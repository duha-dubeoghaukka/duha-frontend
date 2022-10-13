import React from "react";

function InputPassword() {
  return (
    <>
      <h4 className="text-lg font-semibold text-black2 text-lg">회원 확인</h4>
      <div className="m-7">
        <input className="w-full input mt-2" placeholder="이메일을 입력하세요" />
        <input className="w-full input mt-2" placeholder="비밀번호를 입력하세요" />
        <button className="btn-primary w-full mt-5">회원 탈퇴</button>
      </div>
    </>
  );
}

export default InputPassword;
