import React from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import InputEmail from "./InputEmail";
import InputPassword from "./InputPassword";

function CertificationModal({ modalHandler, category }) {
  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="fixed inset-0 w-full h-full bg-black opacity-40"></div>
        <div className="flex items-center min-h-screen px-4 py-8">
          <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
            <div className="mt-2 ">
              <CloseOutlinedIcon className="cursor-pointer" onClick={() => modalHandler()} />
              <div className="mt-1 text-center">{category === "회원탈퇴" ? <InputPassword /> : <InputEmail />}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CertificationModal;
