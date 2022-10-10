import React from "react";
import Modal from "./Modal";

function ShowModal({ show, modalHandler, route }) {
  return <>{show ? <Modal modalHandler={modalHandler} route={route} /> : null}</>;
}

export default ShowModal;
