import React from "react";
import config from "../../../config";

function VideoElement({ previewSource = "" }) {
  return (
    <>
      <video autoPlay muted loop src={`${previewSource}`} type="video/mp4" />
    </>
  );
}

export default VideoElement;
