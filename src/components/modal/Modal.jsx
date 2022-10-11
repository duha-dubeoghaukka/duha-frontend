import React, { useEffect, useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import { CopyToClipboard } from "react-copy-to-clipboard";
import useChange from "../../hooks/useChange";
import { shareKakao } from "../../utils/shareKakaoLink";

function Modal({ modalHandler, route, title }) {
  const [isCopied, changeCopied] = useChange();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="fixed inset-0 w-full h-full bg-black opacity-40"></div>
        <div className="flex items-center min-h-screen px-4 py-8">
          <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
            <div className="mt-2 ">
              <CloseOutlinedIcon className="cursor-pointer" onClick={() => modalHandler()} />
              <div className="mt-1 text-center ">
                <h4 className="text-lg font-semibold text-black1 text-lg">공유하기</h4>
                {isCopied ? <p className="mt-2 text-black1">링크 복사가 완료되었습니다.</p> : null}
                <div className="flex flex-row m-7 place-content-center space-x-11">
                  <button onClick={() => shareKakao(route, title)}>
                    <img className="w-12 h-12" src={`${process.env.PUBLIC_URL}/assets/KakaoLogo.png`} alt={"Kakao Logo"} />
                  </button>
                  <CopyToClipboard text={route} onCopy={() => changeCopied()}>
                    <button className="w-12 h-12 rounded-full bg-[#454545]">
                      <InsertLinkOutlinedIcon className="m-3" sx={{ color: "#F6F6F6" }} />
                    </button>
                  </CopyToClipboard>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
