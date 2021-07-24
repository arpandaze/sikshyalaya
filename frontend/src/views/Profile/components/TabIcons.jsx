import React, { useState, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import { IconContext } from "react-icons";
import colorscheme from "../../../utils/colors";
import "./css/tabIcons.css";
import { ProfileContext } from "../ProfileContext";

const TabIcons = ({ name, icon, id }) => {
  const [hovered, setHovered] = useState(false);
  const { tabId, setTabId } = useContext(ProfileContext);
  return (
    <div>
      <Grid
        container
        direction="row"
        alignItems="center"
        className="tabIcons_root"
        onMouseEnter={() => {
          setHovered(true);
        }}
        onMouseLeave={() => {
          setHovered(false);
        }}
        onClick={() => setTabId(id)}
      >
        <Grid item className="tabIcons_iconContainer">
          <IconContext.Provider
            value={{
              color: hovered ? colorscheme.red3 : "#4e4e4e",
            }}
          >
            {icon}
          </IconContext.Provider>
        </Grid>

        <Grid item className="tabIcons_nameContainer">
          <p className="tabIcons_nameText">{name}</p>
        </Grid>
      </Grid>
    </div>
  );
};

export default TabIcons;
