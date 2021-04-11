import React from "react";

const Button = ({ name, colorClass, ...rest }) => {
  return (
    <div>
      <button {...rest} id={name} className={"button_primary " + colorClass}>
        {name}
      </button>
    </div>
  );
};

export default Button;
