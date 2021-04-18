import React from "react";
import Button from "./Button";
import colorscheme from "../utils/colors";
import { BsArrowRightShort } from "react-icons/bs";

const styleSheet = {
  buttonStyles: { outline: "none", border: "none", cursor: "pointer" },
  button: {
    width: "35px",
    height: "35px",
    borderRadius: "50%",
  },
  buttonIcon: {
    position: "absolute",
  },
};

const FancyButton = ({ name, colorStyles, children, ...rest }) => {
  const finalStyles = { ...styleSheet.buttonStyles, ...colorStyles };
  return (
    <div>
      <BsArrowRightShort
        size={35}
        color={colorscheme.purple}
        style={styleSheet.buttonIcon}
      />
      <Button colorStyles={styleSheet.button} />
    </div>
  );
};

export default FancyButton;
