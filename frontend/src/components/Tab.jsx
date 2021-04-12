import React from "react";
import theme from "../utils/colors";
import Button from "./Button";

const styleSheet = {
  container: {
    width: "100px",
    height: "60px",
  },
  button: {
    width: "100px",
    height: "60px",
    outline: "none",
    border: "none",
    fontSize: "1.1em",
    cursor: "pointer",
    backgroundColor: "transparent",
  },
  line: {
    width: "40px",
    height: "3px",
    backgroundColor: theme.red4,
    margin: "-10px auto",
  },
};

const Tab = ({ name, active, onButtonClick, ...rest }) => {
  return (
    <div style={styleSheet.container}>
      <button
        {...rest}
        id={name}
        onClick={onButtonClick}
        style={styleSheet.button}
      >
        {name}
      </button>
      {active ? <div style={styleSheet.line}></div> : <></>}
    </div>
  );
};

export default Tab;
