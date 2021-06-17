import React from "react";
import Grid from "@material-ui/core/Grid";
import "./statics/css/questionView.css";
import "../../../components/CustomCheckboxComponent";
import { Formik, Form } from "formik";
import Checkbox from "../../../components/Checkbox";

const QuestionView = ({ data, position, length, ...rest }) => {
  const onSubmit = async (values) => {};
  return (
    <Grid container direction="column" className="questionView_root">
      <Grid item className="questionView_top">
        <Grid
          container
          direction="column"
          justify="center"
          className="questionView_topInside"
        >
          <Grid item className="questionView_titleLabel">
            Question {position + 1} of {length}{" "}
          </Grid>
          <Grid item className="questionView_questionTitle">
            {data.question_text}
          </Grid>
        </Grid>
      </Grid>
      <Grid item className="questionView_bot">
        <Grid container direction="column">
          <Formik
            initialValues={{
              email: "",
              password: "",
              remember_me: false,
            }}
            onSubmit={onSubmit}
          >
            <Form>
              <Grid container direction="column" alignItems="flex-start">
                {data.options.map((option, index) => (
                  <Grid item>
                    <Checkbox name={index} label={option.text} value={index} />
                  </Grid>
                ))}
              </Grid>
            </Form>
          </Formik>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default QuestionView;
