import React from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";

function Modal({ modalHandler }) {
  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="fixed inset-0 w-full h-full bg-black opacity-40"></div>
        <div className="flex items-center min-h-screen px-4 py-8">
          <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
            <div className="mt-2 ">
              <CloseOutlinedIcon className="cursor-pointer" onClick={() => modalHandler()} />
              <div className="mt-1 text-center sm:ml-4 sm:text-left">
                <h4 className="text-lg font-semibold text-gray-800">공유하기</h4>
                <div className="flex flex-row m-7 place-content-center space-x-11">
                  <button>
                    <img className="w-12 h-12" src={`${process.env.PUBLIC_URL}/assets/KakaoLogo.png`} alt={"Kakao Logo"} />
                  </button>
                  <div className="w-12 h-12 rounded-full bg-[#454545]">
                    <InsertLinkOutlinedIcon className="m-3" sx={{ color: "#F6F6F6" }} />
                  </div>
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
