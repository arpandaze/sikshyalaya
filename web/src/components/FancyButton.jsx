import React from "react";
import CustomButton from "./CustomButton";
import { BsArrowRightShort } from "react-icons/bs";
import "./statics/css/fancyButton.css";
import { IconContext } from "react-icons";

const FancyButton = ({ name, color, children, onSubmit, ...rest }) => {
  return (
    <div onClick={onSubmit}>
      <IconContext.Provider value={{ color: color, className: "buttonIcon" }}>
        <BsArrowRightShort />
      </IconContext.Provider>
      <CustomButton addStyles="button" />
    </div>
  );
};

export default FancyButton;
