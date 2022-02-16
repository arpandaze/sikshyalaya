import React from "react";
import Grid from "@material-ui/core/Grid";
import "./statics/css/sideNotes.css";

const SideNotes = ({ id, title, noteTime, content, onClick, ...rest }) => {
  return (
    <Grid
      container
      direction="column"
      className="sideNotes_root"
      onClick={onClick}
    >
      <Grid item className="sideNotes_innerContainer">
        <Grid container direction="column" alignItems="center">
          <Grid item className="sideNotes_titleTextContainer">
            <p className="sideNotes_titleText">{title}</p>
          </Grid>

          <Grid item className="sideNotes_contentTextContainer">
            <p className="sideNotes_contentText">{content}</p>
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction="column" alignItems="flex-end">
        <Grid item xs={12} className="sideNotes_dateTimeContainer">
          <p className="sideNotes_dateTime">{noteTime}</p>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SideNotes;
