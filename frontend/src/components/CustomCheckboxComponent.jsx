import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const CustomCheckboxComponent = ({ label, name, handleChange }) => {
  return (
    <FormControlLabel
      control={<Checkbox onChange={handleChange} name={name} />}
      label={label}
    />
  );
};

export default CustomCheckboxComponent;
