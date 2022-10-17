import React, { useState } from "react";
import ShowEmailModal from "../modal/ShowEmailModal";

function EditInfoSocialLogin({ nickName, isNickName, onSubmit, onChangeNickName }) {
  return (
    <div className="relative w-full md:w-[500px] mx-auto">
      <input className="input mt-2 font-bold" placeholder="닉네임" name="nickname" value={nickName || ""} onChange={onChangeNickName} />
      <div className="ml-3 mt-3">
        <button className="btn-primary mt-3 mb-3 disabled:bg-[#B1D7B4]" onClick={() => onSubmit()} disabled={!isNickName}>
          <p>변경 완료</p>
        </button>
      </div>
    </div>
  );
}

export default EditInfoSocialLogin;
