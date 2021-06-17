import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
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
