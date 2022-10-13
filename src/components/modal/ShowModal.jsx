import React from "react";
import LinkModal from "./LinkModal";

function ShowModal({ show, modalHandler, route, title }) {
  return <>{show ? <LinkModal modalHandler={modalHandler} route={route} title={title} /> : null}</>;
}

export default ShowModal;
