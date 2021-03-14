import React from "react";
import "./css/modal.css";

function Modal({ openModalConponent, modalHeader, modalBody, modalImage }) {
  return (
    <div
      className={openModalConponent ? "modal-wrap modal-open" : "modal-wrap"}
    >
      <div className="modal_component">
        <img className="modal-img" src={modalImage} alt={modalHeader} />
        <div className="modal-info">
          <p className="modal-header">{modalHeader}</p>
          <p className="modal-body">{modalBody}</p>
        </div>
      </div>
    </div>
  );
}

export default Modal;
