import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userInfoAPIs } from "../../api/api";
import { getCode } from "../../utils/getCode";

function ResetPasswordForm() {
  const [newPassword, setNewPassword] = useState();
  const [checkPassword, setCheckPassword] = useState();

  //check
  const [isNewPasswrord, setIsNewPassword] = useState();
  const [isCheckPassword, setIsCheckPassword] = useState();

  //message
  const [passwordMessage, setPasswordMessage] = useState();
  const [checkPasswordMessage, setCheckPasswordMessage] = useState();

  const code = getCode();
  const navigation = useNavigate();

  useEffect(() => {}, []);

  const onChangeNewPassword = useCallback(e => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
    const passwordValue = e.target.value;
    setNewPassword(passwordValue);

    if (!passwordRegex.test(passwordValue)) {
      setPasswordMessage("숫자+영문자 조합으로 8자리 이상 입력하세요");
      setIsNewPassword(false);
    } else {
      setPasswordMessage("");
      setIsNewPassword(true);
    }
  }, []);

  const onChangeCheckPassword = e => {
    const passwordCheckValue = e.target.value;
    setCheckPassword(passwordCheckValue);
    if (newPassword === passwordCheckValue) {
      setCheckPasswordMessage("비밀번호가 일치해요");
      setIsCheckPassword(true);
    } else {
      setCheckPasswordMessage("비밀번호가 달라요");
      setIsCheckPassword(false);
    }
  };

  const onSubmit = () => {
    // 비밀번호 & 비밀번호 확인을 다 입력한 경우 -> 비밀번호와 비밀번호 확인이 같은지
    // 비밀번호만 입력했을 경우
    // 비밀번호 확인만 입력했을 경우
    if (isNewPasswrord && isCheckPassword) {
      let data = {
        password: newPassword,
        code
      };
      userInfoAPIs
        .resetPassword(data)
        .then(res => {
          if (res.data.isSuccess) {
            alert("비밀번호 재설정이 완료되었습니다.");
            navigation(`/login`);
          } else {
            alert(res.data.message);
          }
        })
        .catch(err => console.log("err", err.response));
    } else if (isNewPasswrord && !isCheckPassword) {
      alert("비밀번호를 확인하세요");
    } else if (!isNewPasswrord) {
      alert("새로운 비밀번호를 입력하세요");
    }
  };

  return (
    <div className="w-full md:w-[600px] mx-auto">
      <div className="flex flex-col">
        <p className="mt-10 mx-auto text-xl text-black2 font-medium">비밀번호 재설정</p>
        <img className="w-[284px] mt-10 mb-10 mx-auto" src={`${process.env.PUBLIC_URL}/assets/Logo.png`} />
        <div className="relative w-full md:w-[500px] mx-auto">
          <input
            className="input mt-2"
            placeholder="새 비밀번호"
            name="newpassword"
            value={newPassword || ""}
            onChange={onChangeNewPassword}
            type="password"
          />
          <p className="input-helper ml-4">{isNewPasswrord ? passwordMessage : passwordMessage}</p>
          <input
            className="input mt-2"
            placeholder="비밀번호 확인"
            name="checkpassword"
            value={checkPassword || ""}
            onChange={onChangeCheckPassword}
            type="password"
          />
          <p className="input-helper ml-4">{isCheckPassword ? checkPasswordMessage : checkPasswordMessage}</p>
          <div className="ml-3 mt-3">
            <button className="btn-primary mt-3 mb-3" onClick={() => onSubmit()}>
              <p>변경 완료</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordForm;
