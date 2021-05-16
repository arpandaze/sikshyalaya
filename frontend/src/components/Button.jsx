import React from "react";
import "./statics/css/button.css";

const Button = ({ children, name, addStyles, ...rest }) => {
  return (
    <div>
      <button id={name} className={"main_button " + addStyles} {...rest}>
        {name}
      </button>
    </div>
  );
};

export default Button;
