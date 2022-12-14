import React, { useCallback, useEffect, useState } from "react";
import decodeToken from "../../utils/decodeToken";
import { userInfoAPIs } from "../../api/api";
import useChange from "../../hooks/useChange";
import ShowEmailModal from "../modal/ShowEmailModal";
import { routingLoginPage } from "../../utils/routingLoginPage";
import { useNavigate } from "react-router-dom";
import checkLoginPlatform from "../../utils/checkLoginPlatform";
import EditInfoSocialLogin from "./EditInfoSocialLogin";
import { deleteCookie, getCookie, setCookie } from "../../shared/Cookie";

function EditUserInfoForm() {
  const token = getCookie("authorization");
  const userNickName = decodeToken(token);
  const navigate = useNavigate();
  const loginPlatform = checkLoginPlatform(token);

  const [isModal, modalHandler] = useChange();

  const [nickName, setNickName] = useState();
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [checkPassword, setCheckPassword] = useState();

  //check
  const [isNickName, setIsNickName] = useState(false);
  const [isCurrentPassword, setIsCurrentPassword] = useState(false);
  const [isNewPassword, setIsNewPassword] = useState();
  const [isCheckPassword, setIsCheckPassword] = useState();
  const [isDisabled, setIsDisabled] = useState(false);
  const [isKorean, setIsKorean] = useState(false);
  const [isEnglish, setIsEnglish] = useState(false);

  //message
  const [passwordMessage, setPasswordMessage] = useState();
  const [checkPasswordMessage, setCheckPasswordMessage] = useState();
  const [checkKoreanMessage, setCheckKoreanMessage] = useState();
  const [checkEnglishMessage, setCheckEnglishMessage] = useState();

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
    checkIsKorean(e.target.value);
  };

  const checkIsKorean = data => {
    const regKorExp = /[???-??????-??????-???]/g;
    const regEngExp = /[a-zA-Z]/g;
    if (regKorExp.test(data)) {
      if (0 < data.length <= 5) {
        setIsNickName(true);
        setIsDisabled(false);
        setIsKorean(true);
        setCheckKoreanMessage("");
      }
      if (data.length > 5) {
        setIsNickName(false);
        setIsDisabled(true);
        setIsKorean(false);
        setCheckKoreanMessage("?????????(??????) 5?????? ???????????? ??????????????????");
      }
    } else if (regEngExp.test(data)) {
      if (0 < data.length <= 15) {
        setIsNickName(true);
        setIsDisabled(false);
        setIsEnglish(true);
        setCheckEnglishMessage("");
      }
      if (data.length > 15) {
        setIsNickName(false);
        setIsDisabled(true);
        setIsEnglish(false);
        setCheckEnglishMessage("?????????(??????) 16?????? ???????????? ??????????????????");
      }
    }
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
      setPasswordMessage("??????+????????? ???????????? 8?????? ?????? ???????????????");
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
        setCheckPasswordMessage("??????????????? ????????????");
        setIsCheckPassword(true);
        if (isCurrentPassword) {
          setIsDisabled(false);
        } else {
          setIsDisabled(true);
        }
      } else {
        setCheckPasswordMessage("??????????????? ?????????");
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
        if (res.data.code !== "NULL") {
          alert(res.data.message);
        } else {
          alert(message);
          deleteCookie("authorization");
          setCookie("authorization", res.headers.authorization);
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
      .catch(err => alert(err.response.data.message));
  };

  const onSubmit = () => {
    // ???????????? ??????
    if (isNickName && !isCurrentPassword) {
      let data = {
        nickname: nickName
      };
      editInfo(data, "????????? ????????? ?????????????????????.");
      setIsNickName(false);
      setIsDisabled(true);
    }

    // ??? ??? ?????? or ??????????????? ??????
    if (nickName && currentPassword) {
      if (isNewPassword && isCheckPassword) {
        let data = {
          nickname: nickName,
          currentPassword,
          newPassword
        };
        editInfo(data, "?????? ?????? ????????? ?????????????????????.");
      } else if (isNewPassword && !isCheckPassword) {
        alert("??????????????? ??????????????????");
      } else if (!isNewPassword && isCheckPassword) {
        alert("??? ??????????????? ?????? ??????????????????");
      } else {
        alert("??? ???????????? ?????? ??? ??????????????? ???????????????");
        setIsDisabled(true);
      }
    }

    // ??? ???????????? & ???????????? ????????? ?????? -> ?????? ???????????? ??????x
    if (isNewPassword && isCheckPassword) {
      if (!isCurrentPassword) {
        alert("?????? ??????????????? ???????????????");
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
        <img className="w-[284px] mt-10 mb-10 mx-auto" src={`${process.env.PUBLIC_URL}/assets/Logo.png`} alt="Logo" />
        {loginPlatform === "KAKAO" || loginPlatform === "GOOGLE" ? (
          <EditInfoSocialLogin
            nickName={nickName}
            isNickName={isNickName}
            onSubmit={onSubmit}
            onChangeNickName={onChangeNickName}
            isModal={isModal}
            modalHandler={modalHandler}
          />
        ) : (
          <div className="relative w-full md:w-[500px] mx-auto">
            <input
              className="input mt-2 font-bold"
              placeholder="?????????"
              name="nickname"
              value={nickName || ""}
              onChange={onChangeNickName}
            />
            <p className="input-helper ml-4">{isKorean ? checkKoreanMessage : checkKoreanMessage}</p>
            <p className="input-helper ml-4">{isEnglish ? checkEnglishMessage : checkEnglishMessage}</p>
            <input
              className="input mt-2"
              placeholder="?????? ????????????"
              name="currentpassword"
              value={currentPassword || ""}
              onChange={onChangeCurrentPassword}
              type="password"
            />
            <input
              className="input mt-2"
              placeholder="??? ????????????"
              name="newpassword"
              value={newPassword || ""}
              onChange={onChangeNewPassword}
              type="password"
            />
            <p className="input-helper ml-4">{isNewPassword ? passwordMessage : passwordMessage}</p>
            <input
              className="input mt-2"
              placeholder="???????????? ??????"
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
                disabled={isDisabled && !(isNewPassword && isCheckPassword)}
              >
                <p>?????? ??????</p>
              </button>
              <button className="btn-white" onClick={() => modalHandler()}>
                <p>????????????</p>
              </button>
              <ShowEmailModal show={isModal} modalHandler={modalHandler} category={"????????????"} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditUserInfoForm;
