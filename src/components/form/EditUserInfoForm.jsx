import React, { useCallback, useEffect, useState } from "react";
import decodeToken from "../../utils/decodeToken";
import { userInfoAPIs } from "../../api/api";
import useChange from "../../hooks/useChange";
import ShowEmailModal from "../modal/ShowEmailModal";
import { routingLoginPage } from "../../utils/routingLoginPage";
import { useNavigate } from "react-router-dom";
import { current } from "@reduxjs/toolkit";

function EditUserInfoForm() {
  const token = localStorage.getItem("authorization");
  const userNickName = decodeToken(token);
  const navigate = useNavigate();

  const [isModal, modalHandler] = useChange();

  const [nickName, setNickName] = useState();
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [checkPassword, setCheckPassword] = useState();

  //check
  const [isNickName, setIsNickName] = useState(false);
  const [isCurrentPassword, setIsCurrentPassword] = useState(false);
  const [isNewPasswrord, setIsNewPassword] = useState();
  const [isCheckPassword, setIsCheckPassword] = useState();
  const [isDisabled, setIsDisabled] = useState(false);

  //message
  const [passwordMessage, setPasswordMessage] = useState();
  const [checkPasswordMessage, setCheckPasswordMessage] = useState();

  useEffect(() => {
    routingLoginPage(navigate);
    noneChange();
  }, []);

  const noneChange = () => {
    if (!isNickName && !currentPassword && !newPassword && !checkPassword) {
      setIsDisabled(true);
    }
  };

  const onChangeNickName = e => {
    setNickName(e.target.value);
    setIsNickName(true);
    // 수정해야할 부분, 비
    if (e.target.value) {
      console.log("zz", isCheckPassword, isCurrentPassword);
    }
    setIsDisabled(false);
  };

  const onChangeCurrentPassword = e => {
    const currentPasswordValue = e.target.value;
    setCurrentPassword(currentPasswordValue);
    setIsCurrentPassword(true);
    if (e.target.value === "") {
      setIsDisabled(true);
    }
  };

  const onChangeNewPassword = useCallback(e => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
    const passwordValue = e.target.value;
    setNewPassword(passwordValue);
    if (e.target.value === "") {
      setIsDisabled(true);
    } else {
      // setIsDisabled(false);
    }
    if (!passwordRegex.test(passwordValue)) {
      setPasswordMessage("숫자+영문자 조합으로 8자리 이상 입력하세요");
      setIsNewPassword(false);
      setIsDisabled(true);
    } else {
      setPasswordMessage("");
      setIsNewPassword(true);
      // setIsDisabled(false);
    }
  }, []);

  const onChangeCheckPassword = useCallback(
    e => {
      const passwordCheckValue = e.target.value;
      setCheckPassword(passwordCheckValue);
      setIsDisabled(false);
      if (e.target.value === "") {
        setIsDisabled(true);
      }
      if (newPassword === passwordCheckValue) {
        setCheckPasswordMessage("비밀번호가 일치해요");
        setIsCheckPassword(true);
        if (isCurrentPassword) {
          setIsDisabled(false);
        } else {
          setIsDisabled(true);
        }
      } else {
        setCheckPasswordMessage("비밀번호가 달라요");
        setIsCheckPassword(false);
        setIsDisabled(true);
      }
    },
    [newPassword]
  );

  const editInfo = (data, message) => {
    userInfoAPIs
      .editUserInfo(data)
      .then(res => {
        if (!res.data.isSuccess) {
          alert(res.data.message);
        } else {
          alert(message);
          localStorage.removeItem("authorization");
          localStorage.setItem("authorization", res.headers.authorization);
          setCurrentPassword("");
          setNewPassword("");
          setCheckPassword("");
          setCheckPasswordMessage("");
          setIsCurrentPassword(false);
          setIsNewPassword(false);
          setIsCheckPassword(false);
          setIsDisabled(true);
        }
      })
      .catch(err => console.log(err));
  };

  const onSubmit = () => {
    // 닉네임만 변경
    if (isNickName && !isCurrentPassword) {
      let data = {
        nickname: nickName
      };
      editInfo(data, "닉네임 변경이 완료되었습니다.");
      setIsNickName(false);
      setIsDisabled(true);
    }

    // 둘 다 변경 or 비밀번호만 변경
    if (nickName && currentPassword) {
      if (isNewPasswrord && isCheckPassword) {
        let data = {
          nickname: nickName,
          currentPassword,
          newPassword
        };
        editInfo(data, "회원 정보 수정이 완료되었습니다.");
      } else if (isNewPasswrord && !isCheckPassword) {
        alert("비밀번호를 확인해주세요");
      } else if (!isNewPasswrord && isCheckPassword) {
        alert("새 비밀번호를 다시 입력해주세요");
      } else {
        alert("새 비밀번호 입력 및 비밀번호를 확인하세요");
        setIsDisabled(true);
      }
    }

    // 새 비밀번호 & 비밀번호 확인을 입력 -> 기존 비밀번호 입력x
    if (isNewPasswrord && isCheckPassword) {
      if (!isCurrentPassword) {
        alert("기존 비밀번호를 입력하세요");
        setIsDisabled(true);
      }
    }
  };

  useEffect(() => {
    setNickName(userNickName);
  }, []);

  return (
    <div className="w-full md:w-[600px] mx-auto">
      <div className="flex flex-col">
        <img className="w-[284px] mt-10 mb-10 mx-auto" src={`${process.env.PUBLIC_URL}/assets/Logo.png`} />
        <div className="relative w-full md:w-[500px] mx-auto">
          <input className="input mt-2 font-bold" placeholder="닉네임" name="nickname" value={nickName || ""} onChange={onChangeNickName} />
          <input
            className="input mt-2"
            placeholder="기존 비밀번호"
            name="currentpassword"
            value={currentPassword || ""}
            onChange={onChangeCurrentPassword}
            type="password"
          />
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
          <p className="input-helper ml-4">{checkPasswordMessage}</p>
          <div className="ml-3 mt-3">
            <button
              className="btn-primary mt-3 mb-3 disabled:bg-[#B1D7B4]"
              onClick={() => onSubmit()}
              disabled={isDisabled && !(isNewPasswrord && isCheckPassword)}
            >
              <p>변경 완료</p>
            </button>
            <button className="btn-white" onClick={() => modalHandler()}>
              <p>회원탈퇴</p>
            </button>
            <ShowEmailModal show={isModal} modalHandler={modalHandler} category={"회원탈퇴"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditUserInfoForm;
