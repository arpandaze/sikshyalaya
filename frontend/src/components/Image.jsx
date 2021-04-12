import React, { useState } from "react";

const styleSheet = {
  image: {
    width: "100%",
    height: "100%",
  },
};

const Image = ({ src, alt, ...rest }) => {
  return <img {...rest} src={src} alt={alt} style={styleSheet.image} />;
};

export default Image;
