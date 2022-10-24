import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userInfoAPIs } from "../../api/api";
import useInput from "../../hooks/useInput";
import { logout } from "../../utils/logout";

function InputPassword() {
  const [password, setPassword, onChangePassword] = useInput();
  const navigate = useNavigate();

  const onDeleteUser = () => {
    let data = {
      password
    };
    userInfoAPIs
      .deleteUser(data)
      .then(res => {
        if (res.data.code === "NULL") {
          alert("회원 탈퇴가 완료되었습니다.");
          logout();
          navigate(`/`);
        }
      })
      .catch(err => alert(err.response.data.message));
  };
  return (
    <>
      <h4 className="text-lg font-semibold text-black2 text-lg">회원 확인</h4>
      <div className="m-7">
        <input
          className="w-full input mt-2"
          placeholder="비밀번호를 입력하세요"
          type="password"
          name="password"
          value={password}
          onChange={onChangePassword}
        />
        <button className="btn-primary w-full mt-5" onClick={() => onDeleteUser()}>
          회원 탈퇴
        </button>
      </div>
    </>
  );
}

export default InputPassword;
