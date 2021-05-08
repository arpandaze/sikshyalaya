import React, { useState } from "react";
import colorscheme from "../utils/colors";
import Grid from "@material-ui/core/Grid";
import { Tooltip } from "@material-ui/core";
import { IconContext } from "react-icons";
import "./statics/css/navIcons.css";

const styleSheet = {};

const NavIcons = ({ title, path, icon, ...rest }) => {
  const [hovered, setHovered] = useState(false);
  const tooltip = false;

  return (
    <Tooltip title={title} disableHoverListener={tooltip} placement="right">
      <Grid container direction="row" className="navIcons_container">
        <Grid item className="navIcons_icons">
          <div
            {...rest}
            onMouseEnter={() => {
              setHovered(true);
            }}
            onMouseLeave={() => {
              setHovered(false);
            }}
            className="navIcons_iconStyle"
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
          <span className="navIcons_navText">{title}</span>
        </Grid>
      </Grid>
    </Tooltip>
  );
};

export default NavIcons;
