import React from "react";
import Modal from "./Modal";

function ShowModal({ show, modalHandler }) {
  return <>{show ? <Modal modalHandler={modalHandler} /> : null}</>;
}

export default ShowModal;
