import React from "react";
import Grid from "@material-ui/core/Grid";
import colorscheme from "../utils/colors";

const styleSheet = {
  root: {
    flexGrow: "1",
    width: "90%",
    height: "15vh",
    margin: "20px auto",
    background: colorscheme.white,
    borderRadius: "20px",
    boxShadow: "2px 2px 10px -3px rgba(0,0,0,0.2)",
    cursor: "pointer",
    color: colorscheme.black,
  },
  innerContainer: {
    overflow: "hidden",
    height: "80%",
    position: "relative",
    top: "8%",
  },
  questionContainer: {
    fontWeight: "bold",
    fontSize: "1.2em",
    position: "relative",
    top: "12%",
    left: "5%",
    width: "75%",
    maxHeight: "30%",
  },
  studentContainer: {
    width: "90%",
    position: "absolute",
    bottom: "8px",
    left: "7%",
    textAlign: "right",
    wordWrap: "normal",
    color: colorscheme.grey2,
    lineHeight: "1.7em",
  },
};

const Questions = ({ question, student, ...rest }) => {
  return (
    <Grid container direction="column" style={styleSheet.root}>
      <Grid item style={styleSheet.innerContainer}>
        <Grid
          container
          direction="column"
          alignItems="flex-start"
          wrap="nowrap"
        >
          <Grid item style={styleSheet.questionContainer}>
            <p style={styleSheet.titleText}>{question}</p>
          </Grid>
          <Grid item style={styleSheet.studentContainer}>
            <p style={styleSheet.contentText}>{student}</p>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Questions;
