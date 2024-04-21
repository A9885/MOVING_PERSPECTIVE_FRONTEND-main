import React from "react";
import config from "../../../config";

function ImageElement({
  previewSource = "",
  source,
  imageFor = "user",
  alt = "image",
  ...rest
}) {
    // console.log(config.IMAGE_URL);
  return (
    <>
      <img src={`${config.IMAGE_URL}/${source}`} alt={alt} {...rest} />
    </>
  );
}

export default ImageElement;
