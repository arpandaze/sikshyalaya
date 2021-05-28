import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import "./statics/css/quizCard.css";
import { MdKeyboardArrowRight } from "react-icons/md";
const QuizCard = ({ qData, color, ...rest }) => {
  return (
    <Grid container direction="row" className="quizCard_root">
      <Grid xs={6} item className={"quizCard_row1_inside " + color}>
        <Grid
          container
          direction="column"
          className="quizCard_row1_col1_container"
        >
          <Grid item className="quizCard_row1_col1">
            <p>{qData.quiz_title}</p>
          </Grid>
          <Grid item className="quizCard_row1_col2">
            <p>
              Duration: {qData.start_time} {qData.end_time}
            </p>
          </Grid>
          <Grid item className="quizCard_row1_col3">
            <p>50 Marks</p>
          </Grid>
          <Grid item className="quizCard_row1_col4">
            <p>{qData.quiz_course}</p>
          </Grid>
          <Grid item className="quizCard_row1_col5">
            <p>{qData.quiz_instructor}</p>
          </Grid>
        </Grid>
      </Grid>
      <Grid xs={6} item className="quizCard_row2">
        <div className="quizCard_button">
          <MdKeyboardArrowRight
            color="#42c7ca"
            className="quizCard_buttonIcon"
          />
        </div>
        <p>{qData.quiz_description}</p>
      </Grid>
    </Grid>
  );
};

export default QuizCard;
