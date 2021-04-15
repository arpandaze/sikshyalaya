import React, { useState } from "react";

const styleSheet = {
  image: {
    width: "100%",
    height: "100%",
  },
};

const Image = ({ src, alt, addStyles, ...rest }) => {
  const finalStyles = { ...styleSheet.image, ...addStyles };
  return <img {...rest} src={src} alt={alt} style={finalStyles} />;
};

export default Image;
