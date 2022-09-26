import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socialLoginAPIs } from "../../api/api";

const KakaoLogin = props => {
  const href = window.location.href;
  let params = new URL(document.URL).searchParams;
  let code = params.get("code");

  const navigate = useNavigate();

  useEffect(() => {
    socialLoginAPIs.kakaoLogin(code).then(res => {
      if (res.data.isSuccess) {
        localStorage.setItem("authorization", res.headers.authorization);
        localStorage.setItem("refresh-token", res.headers["refresh-token"]);
        alert("카카오 로그인이 완료되었습니다!");
        navigate(`/`);
      }
    });
  }, []);

  return (
    <>
      <div>로그인 처리중입니다! 잠시만 기다려주세요</div>
    </>
  );
};

export default KakaoLogin;
