import React from "react";
import Grid from "@material-ui/core/Grid";
import colorscheme from "../utils/colors";
import "./statics/css/sideNotes.css";

const SideNotes = ({ title, content, onClick, ...rest }) => {
  return (
    <Grid
      container
      direction="column"
      className="sideNotes_root"
      onClick={onClick}
    >
      <Grid item className="sideNotes_innerContainer">
        <Grid
          container
          direction="column"
          alignItems="flex-start"
          wrap="nowrap"
        >
          <Grid item className="sideNotes_titleTextContainer">
            <p className="sideNotes_titleText">{title}</p>
          </Grid>
          <Grid item className="sideNotes_contentTextContainer">
            <p className="sideNotes_contentText">{content}</p>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SideNotes;
