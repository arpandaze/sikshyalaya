import React from "react";
import Grid from "@material-ui/core/Grid";
import "./statics/css/questions.css";
import { StylesProvider } from "@material-ui/core/styles";

const Questions = ({ question, student, ...rest }) => {
  return (
    <StylesProvider injectFirst>
      <Grid container direction="column" className="questions_root">
        <Grid item className="questions_innerContainer">
          <Grid
            container
            direction="column"
            alignItems="flex-start"
            wrap="nowrap"
          >
            <Grid item className="questions_questionContainer">
              <p className="questions_titleText">{question}</p>
            </Grid>
            <Grid item className="questions_studentContainer">
              <p className="questions_contentText">{student}</p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </StylesProvider>
  );
};

export default Questions;
