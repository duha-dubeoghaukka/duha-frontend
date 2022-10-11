import React from "react";
import Modal from "./Modal";

function ShowModal({ show, modalHandler, route, title }) {
  return <>{show ? <Modal modalHandler={modalHandler} route={route} title={title} /> : null}</>;
}

export default ShowModal;
