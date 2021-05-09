import React from "react";
import "./statics/css/image.css";

const Image = ({ src, alt, addStyles, ...rest }) => {
  return (
    <img {...rest} src={src} alt={alt} className={"main_image " + addStyles} />
  );
};

export default Image;
