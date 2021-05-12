import React from "react";
import "./statics/css/image.css";

const Image = ({ src, alt, addStyles, ...rest }) => {
  return (
    <img src={src} alt={alt} className={"main_image " + addStyles} {...rest} />
  );
};

export default Image;
