import React from "react";
import Grid from "@material-ui/core/Grid";
import colorscheme from "../utils/colors";

const styleSheet = {
  root: {
    width: "20vw",
    height: "55vh",
    flexGrow: "1",
    float: "right",
    position: "relative",
    zIndex: "1",
    background: colorscheme.red6,
    boxShadow: "2px 2px 10px -3px rgba(0,0,0,0.2)",
  },
  titleBox: {
    background: colorscheme.red5,
    position: "relative",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: "1.8em",
  },
};

const notifications = [
  {
    id: "1",
    question: "Toilet break 10 min please!?",
    student: "Aatish Shrestha  ",
  },
  {
    id: "2",
    question: "Toilet break 10 min please!?",
    student: "Aatish Shrestha  ",
  },
];

const NotificationBox = () => {
  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
      style={styleSheet.root}
      wrap="nowrap"
      spacing={2}
    >
      <Grid item xs={12} style={styleSheet.titleBox}>
        <p style={styleSheet.titleText}>Notifications</p>
      </Grid>
    </Grid>
  );
};

export default NotificationBox;
