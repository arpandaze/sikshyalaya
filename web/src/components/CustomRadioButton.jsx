import React from "react";
import Grid from "@material-ui/core/Grid";
import "./statics/css/customRadioButton.css";
import { Switch as MaterialSwitch } from "@material-ui/core";

const CustomRadioButton = ({ toggle, handleToggle, label }) => {
  return (
    <Grid container direction="row" alignItems="center">
      <div className="customRadio_labelText">{label} :</div>
      <MaterialSwitch
        onChange={handleToggle}
        checked={toggle}
        color="primary"
      />
    </Grid>
  );
};

export default CustomRadioButton;
