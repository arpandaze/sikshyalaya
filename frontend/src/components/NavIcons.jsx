import React, { useState } from "react";
import colorscheme from "../utils/colors";
import Grid from "@material-ui/core/Grid";
import { Tooltip } from "@material-ui/core";
import { IconContext } from "react-icons";

const styleSheet = {
  iconStyle: {
    cursor: "pointer",
  },
  container: {
    width: "85%",
    margin: "0px auto",
    position: "relative",
  },
  verticalLine: {
    width: "5px",
    height: "10px",
    backgroundColor: colorscheme.red3,
  },
  navText: {
    textDecoration: "none",
    fontSize: "1.2em",
    lineHeight: "1.4em",
    position: "relative",
    left: "10px",
    color: colorscheme.black,
  },
};

const NavIcons = ({ title, path, icon, ...rest }) => {
  const [hovered, setHovered] = useState(false);
  const tooltip = false;

  return (
    <Tooltip title={title} disableHoverListener={tooltip} placement="right">
      <Grid container direction="row" style={styleSheet.container}>
        <Grid item>
          <div
            {...rest}
            onMouseEnter={() => {
              setHovered(true);
            }}
            onMouseLeave={() => {
              setHovered(false);
            }}
            style={styleSheet.iconStyle}
          >
            <IconContext.Provider
              value={{
                color:
                  window.location.pathname === path
                    ? colorscheme.red3
                    : hovered
                    ? colorscheme.grey2
                    : colorscheme.grey1,
              }}
            >
              {icon}
            </IconContext.Provider>
          </div>
        </Grid>
        <Grid item>
          <span style={styleSheet.navText}>{title}</span>
        </Grid>
      </Grid>
    </Tooltip>
  );
};

export default NavIcons;
