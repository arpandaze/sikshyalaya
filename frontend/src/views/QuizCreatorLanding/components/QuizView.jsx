import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import DashboardLayout from "../../../components/DashboardLayout/DashboardLayout";
import {
  Redirect,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import useAPI from "../../../utils/useAPI";
import callAPI from "../../../utils/API";
import "./statics/css/quizView.css";
import QuestionView from "./QuestionView";
import CustomButton from "../../../components/CustomButton";
import { Formik, Form } from "formik";

const QuizView = ({ location }) => {
  const history = useHistory();
  const defaultQuestionvalue = [];
  let quizDefaultValue = {};
  const questionFormatter = (response) => {
    if (response.data.length === 0) {
      return [];
    }
    let responseData = [];
    responseData = response.data.map((question, index) => {
      let formattedResponseData = {
        id: question.id,
        question_text: question.question_text,
        question_image: question.question_image,
        options: question.options,
        quiz_id: question.quiz_id,
        is_multiple: question.multiple,
      };
      const temp = question.multiple ? question.options.map(() => false) : "";
      quizDefaultValue[question.id] = temp;
      return formattedResponseData;
    });
    return responseData;
  };
  let [allQuestion, allQuestionComplete] = useAPI(
    { endpoint: `/api/v1/quiz/${location.state.quiz.id}/question` },
    questionFormatter,
    defaultQuestionvalue
  );
  useEffect(() => {
    if (!location.state) {
      history.replace({
        pathname: "/quiz",
      });
    }
  }, [location]);
  const onSubmit = async (values) => {
    let temp = Object.entries(values.questions);
    let single = [];
    let multiple = [];
    temp.map((data, index) => {
      Array.isArray(data[1]) ? multiple.push(data) : single.push(data);
    });
    let data = {};
    single.map((value) => {
      data[value[0]] = parseInt(value[1]);
    });
    multiple.map((value) => {
      let temp = [];
      value[1].map((v, i) => {
        if (v) {
          temp.push(i);
        }
      });
      data[value[0]] = temp;
    });
    await callAPI({
      endpoint: `/api/v1/quizanswer/${location.state.quiz.id}/`,
      method: "POST",
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    });
  };
  return (
    <DashboardLayout>
      <Grid container direction="column" className="quizView_root">
        <Grid item>
          <Grid
            container
            direction="row"
            alignItems="center"
            className="quizView_topBar"
          >
            <p className="quizView_quizTitle">
              {location.state && location.state.quiz.title}
            </p>
          </Grid>
        </Grid>
        <Grid item className="quizView_botBar">
          <Grid container direction="column">
            <Formik
              initialValues={{
                questions: quizDefaultValue,
              }}
              onSubmit={onSubmit}
            >
              <Form>
                {allQuestionComplete && allQuestion.length ? (
                  allQuestion.map((question, index) => (
                    <Grid
                      item
                      key={index}
                      className="quizView_questionContainer"
                    >
                      <QuestionView
                        data={question}
                        position={index}
                        length={allQuestion.length}
                        multiple={question.is_multiple}
                      />
                    </Grid>
                  ))
                ) : (
                  <></>
                )}
                {allQuestionComplete && allQuestion.length ? (
                  <Grid item className="quizView_buttonContainer">
                    <CustomButton
                      name="Submit"
                      type="submit"
                      addStyles="quizView_button"
                    />
                  </Grid>
                ) : (
                  <></>
                )}
              </Form>
            </Formik>
          </Grid>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default QuizView;
