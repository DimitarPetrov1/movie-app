import React, { useState, useEffect } from "react";
import "./css/modal.css";

function Modal({
  openModalConponent,
  modalHeader,
  modalBody,
  modalImage,
  modalImageAlt,
  modalVideo
}) {
  const [size, setSize] = useState(1080);
  // make it on resize with event listener
  let windowSize = window.innerWidth;

  useEffect(() => {
    setSize(windowSize);
  }, [windowSize]);

  return (
    <div
      className={openModalConponent ? "modal-wrap modal-open" : "modal-wrap"}
    >
      <div className="modal_component">
        <img
          className="modal-img"
          src={size > 480 ? modalImage : modalImageAlt}
          alt={modalHeader}
        />
        <div className="modal-info">
          <p className="modal-header">{modalHeader}</p>
          <p className="modal-body">{modalBody}</p>
          <div className="modal-video">
            <iframe
              className="modal-video-video"
              title="short video"
              src={`https://www.youtube.com/embed/${modalVideo}`}
              allowFullScreen={true}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
