import React from "react";
import EmailModal from "./CertificationModal";

function ShowEmailModal({ show, modalHandler, category }) {
  return <>{show ? <EmailModal modalHandler={modalHandler} category={category} /> : null}</>;
}

export default ShowEmailModal;
