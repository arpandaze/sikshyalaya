import React from "react";
import Button from "./Button";
import colorscheme from "../utils/colors";
import { BsArrowRightShort } from "react-icons/bs";
import "./statics/css/fancyButton.css";
import { IconContext } from "react-icons";

const FancyButton = ({ name, color, children, ...rest }) => {
  return (
    <div>
      <IconContext.Provider value={{ color: color, className: "buttonIcon" }}>
        <BsArrowRightShort />
      </IconContext.Provider>
      <Button addStyles="button" />
    </div>
  );
};

export default FancyButton;
