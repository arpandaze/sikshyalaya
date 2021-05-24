import React from "react";
import { AiOutlineTags } from "react-icons/ai";

const IconProvider = ({ iconType, addStyles, ...rest }) => {
  const iconList = {
    tags: <AiOutlineTags className={addStyles} />,
  };
  return <div>{iconList[iconType]}</div>;
};

export default IconProvider;
