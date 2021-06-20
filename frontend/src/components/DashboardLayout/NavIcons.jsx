import React, { useState } from "react";
import colorscheme from "../../utils/colors";
import Grid from "@material-ui/core/Grid";
import { IconContext } from "react-icons";
import "./statics/css/navIcons.css";

const NavIcons = ({ title, path, icon, ...rest }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Grid
      container
      direction="row"
      className="navIcons_container"
      alignItems="center"
    >
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
      <Grid item className="navIcons_navTextContainer">
        <p
          style={
            window.location.pathname === path
              ? { color: colorscheme.red3 }
              : { color: colorscheme.black }
          }
          className="navIcons_navText"
        >
          {title}
        </p>
      </Grid>
    </Grid>
  );
};

export default NavIcons;
