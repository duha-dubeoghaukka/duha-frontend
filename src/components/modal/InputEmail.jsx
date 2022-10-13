import React from "react";

function InputEmail() {
  return (
    <>
      <h4 className="text-lg font-semibold text-black1 text-lg">이메일 인증</h4>
      <div className="border border-green1 h-14 w-full mt-5 mb-5">
        <div className="flex flex-row justify-between h-full">
          <input className="ml-2 focus:outline-none" placeholder="이메일을 입력하세요" />
          <button className="p-1 bg-green1">이메일 인증</button>
        </div>
      </div>
    </>
  );
}

export default InputEmail;
