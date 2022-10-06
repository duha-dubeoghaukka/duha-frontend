import React, { useCallback, useEffect, useState } from "react";
import Button from "../button/Button";
import useInput from "../../hooks/useInput";
import decodeToken from "../../utils/decodeToken";
import { userInfo, userInfoAPIs } from "../../api/api";
import { useNavigate } from "react-router-dom";

function EditUserInfoForm() {
  const token = localStorage.getItem("authorization");
  const userNickName = decodeToken(token);
  const navigate = useNavigate();

  const [nickName, setNickName, onChangeNickName] = useInput();
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [checkPassword, setCheckPassword] = useState();

  //check
  const [isNickName, setIsNickName] = useState(false);
  const [isCurrentPassword, setIsCurrentPassword] = useState(false);
  const [isNewPasswrord, setIsNewPassword] = useState();
  const [isCheckPassword, setIsCheckPassword] = useState();

  //message
  const [passwordMessage, setPasswordMessage] = useState();
  const [checkPasswordMessage, setCheckPasswordMessage] = useState();

  const onChangeCurrentPassword = e => {
    const currentPasswordValue = e.target.value;
    setCurrentPassword(currentPasswordValue);
    setIsCurrentPassword(true);
  };

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
    // 닉네임만 변경
    if (nickName && !isCurrentPassword) {
      console.log("닉네임 변경");
      let data = {
        nickname: nickName
      };
      userInfoAPIs
        .editUserInfo(data)
        .then(res => {
          if (!res.data.isSuccess) {
            alert(res.data.message);
          } else {
            alert("닉네임 변경이 완료되었습니다.");
          }
        })
        .catch(err => console.log(err));
    }
    // 비밀번호만 변경
    // else if (!nickName && currentPassword) {
    //   console.log("비밀번호만 변경");
    //   let data = {
    //     currentPassword,
    //     newPassword
    //   };
    //   userInfoAPIs
    //     .editUserInfo(data)
    //     .then(res => {
    //       if (!res.data.isSuccess) {
    //         alert(res.data.message);
    //       } else {
    //         alert("비밀번호 변경이 완료되었습니다.");
    //       }
    //     })
    //     .catch(err => console.log(err.response));
    // }
    // 둘 다 변경
    else if (nickName && currentPassword) {
      let data = {
        nickname: nickName,
        currentPassword,
        newPassword
      };
      userInfoAPIs
        .editUserInfo(data)
        .then(res => {
          console.log("res", res.data);
          if (!res.data.isSuccess) {
            alert(res.data.message);
            console.log("aaa", res.data);
          } else {
            alert("회원 정보 수정이 완료되었습니다.");
            localStorage.removeItem("authorization");
            localStorage.setItem("authorization", res.headers.authorization);
            // navigate(-1);
          }
        })
        .catch(err => console.log(err));
    }
  };

  useEffect(() => {
    setNickName(userNickName);
  }, []);

  return (
    <div className="w-full h-full">
      <div className="flex flex-col">
        <p className="mt-5 mb-3 mx-auto text-xl text-black2 font-semibold">회원 정보 변경</p>
        <img className="w-56 mt-10 mb-10 mx-auto" src={`${process.env.PUBLIC_URL}/assets/Logo.png`} />
        <div className="w-[345px] md:w-[500px] mx-auto">
          <input className="input m-3" placeholder="닉네임" name="nickname" value={nickName} onChange={onChangeNickName} />
          <input
            className="input m-3"
            placeholder="기존 비밀번호"
            name="currentpassword"
            value={currentPassword || ""}
            onChange={onChangeCurrentPassword}
            type="password"
          />
          <input
            className="input m-3"
            placeholder="새 비밀번호"
            name="newpassword"
            value={newPassword || ""}
            onChange={onChangeNewPassword}
            type="password"
          />
          <p className="input-helper ml-4">{isNewPasswrord ? passwordMessage : passwordMessage}</p>
          <input
            className="input m-3"
            placeholder="비밀번호 확인"
            name="checkpassword"
            value={checkPassword || ""}
            onChange={onChangeCheckPassword}
            type="password"
          />
          <p className="input-helper ml-4">{isCheckPassword ? checkPasswordMessage : checkPasswordMessage}</p>

          <div className="ml-3 mt-3">
            {/* <Button
              text="등록하기"
              type="button"
              buttonStyle={"disabled"}
              width="w-[385px] md:w-[500px]"
              height="h-14"
              margin="mb-3"
              // onClick={}
            /> */}
            <button className="btn-primary mb-3" onClick={() => onSubmit()}>
              <p>변경 완료</p>
            </button>
            <button className="btn-white">
              <p>회원탈퇴</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditUserInfoForm;
