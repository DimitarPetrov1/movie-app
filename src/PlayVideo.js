import React from "react";
import "./css/modal.css";

function PlayVideo({ isVideoPlaying, modalVideo }) {
  return (
    <div
      className={
        isVideoPlaying
          ? "modal-wrap modal-open modal-open-playvideo"
          : "modal-wrap"
      }
    >
      <iframe
        className="modal-video-playvideo"
        title="short video"
        src={`https://www.youtube.com/embed/${modalVideo}`}
        allowFullScreen={true}
      ></iframe>
    </div>
  );
}

export default PlayVideo;
