import React, { useState } from "react";
import colorscheme from "../utils/colors";
import Grid from "@material-ui/core/Grid";
import { Tooltip } from "@material-ui/core";

const styleSheet = {
  iconStyle: {
    display: "flex",
    marginTop: "30px",
    cursor: "pointer",
  },
  verticalLine: {
    display: "flex",
    width: "5px",
    height: "10px",
    backgroundColor: colorscheme.red3,
    margin: "0px",
  },
};

const NavIcons = ({ name, title, icon, iconHovered, ...rest }) => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const tooltip = false;

  return (
    <Tooltip title={title} disableHoverListener={tooltip} placement="right">
      <Grid item>
        <div
          {...rest}
          onMouseEnter={() => {
            setHovered(true);
          }}
          onMouseLeave={() => {
            setHovered(false);
          }}
          onClick={() => {
            setClicked(true);
          }}
          style={styleSheet.iconStyle}
        >
          {hovered ? iconHovered : icon}
        </div>
      </Grid>
    </Tooltip>
  );
};

export default NavIcons;
