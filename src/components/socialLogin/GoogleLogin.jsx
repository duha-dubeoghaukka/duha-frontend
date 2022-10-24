import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socialLoginAPIs } from "../../api/api";
import { setCookie } from "../../shared/Cookie";

const GoogleLogin = () => {
  let params = new URL(document.URL).searchParams;
  let code = params.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    socialLoginAPIs
      .googleLogin(code)
      .then(res => {
        if (res.data.code === "NULL") {
          setCookie("authorization", res.headers.authorization);
          setCookie("refresh-token", res.headers["refresh-token"]);
          alert("구글 로그인이 완료되었습니다!");
          navigate(`/`);
        }
      })
      .catch(err => alert(err.response.data.message));
  }, []);

  return (
    <>
      <>
        <div className="grid place-items-center h-screen">
          <div className="box-border h-96  w-3/5	p-4 border-2 rounded-md">
            <div className="grid place-items-center">
              <div className="flex flex-row mt-20">
                <img className="w-14 h-14 " src={`${process.env.PUBLIC_URL}/assets/GoogleLogo.png`} alt={"Google Logo"} />
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
    </>
  );
};

export default GoogleLogin;
