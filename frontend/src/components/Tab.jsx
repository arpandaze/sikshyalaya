import React from "react";
import theme from "../utils/colors";

const styleSheet = {
  line: {
    width: "50px",
    height: "3px",
    backgroundColor: theme.red4,
  },
};

const Tab = ({ name, active, onClick, ...rest }) => {
  return (
    <div>
      <a>{name}</a>
      {active ? <div style={styleSheet.line}></div> : <div></div>}
    </div>
  );
};

export default Tab;
