import React from "react";
import "./statics/css/image.css";

const Image = ({ src, alt, addStyles, onClick, ...rest }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={"main_image " + addStyles}
      {...rest}
      onClick={onClick}
    />
  );
};

export default Image;
