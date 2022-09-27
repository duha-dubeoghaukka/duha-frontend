import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socialLoginAPIs } from "../../api/api";

const GoogleLogin = props => {
  const href = window.location.href;
  let params = new URL(document.URL).searchParams;
  let code = params.get("code");
  console.log("code", code);
  const navigate = useNavigate();

  useEffect(() => {
    socialLoginAPIs.googleLogin(code).then(res => {
      console.log("res", res);
      if (res.data.isSuccess) {
        localStorage.setItem("authorization", res.headers.authorization);
        localStorage.setItem("refresh-token", res.headers["refresh-token"]);
        alert("구글 로그인이 완료되었습니다!");
        navigate(`/`);
      }
    });
  }, []);

  return (
    <>
      return (
      <>
        <div className="grid place-items-center h-screen">
          <div className="box-border h-96  w-3/5	p-4 border-2 rounded-md">
            <div className="grid place-items-center">
              <div className="flex flex-row mt-20">
                <img className="w-14 h-14 " src={`${process.env.PUBLIC_URL}/assets/GoogleLogo.png`} />
                <div className="h-12 ml-5 mt-3">
                  <span className="font-semibold	text-xl">Google Login</span>
                </div>
              </div>
            </div>
            <div className="flex w-4/5	border-b-2 mt-3 ml-10"></div>
            <div className="grid place-items-center ">
              <span className="mt-14 font-normal text-lg">로그인 처리중입니다!</span>
              <span className="mt-2 font-normal	text-lg ">잠시만 기다려주세요</span>
            </div>
          </div>
        </div>
      </>
      );{" "}
    </>
  );
};

export default GoogleLogin;
