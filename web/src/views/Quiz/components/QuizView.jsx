import React, { useState, useEffect, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import DashboardLayout from "../../../components/DashboardLayout/DashboardLayout";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useAPI from "../../../utils/useAPI";
import callAPI from "../../../utils/API";
import "./statics/css/quizView.css";
import QuestionView from "./QuestionView";
import CustomButton from "../../../components/CustomButton";
import { Formik, Form } from "formik";
import { AlertContext } from "../../../components/DashboardLayout/AlertContext";

const QuizView = ({ location }) => {
  const { setAlert } = useContext(AlertContext);
  const [exist, setExist] = useState(true);
  const [quizDefaultValue, setQuizDefaultValue] = useState({});
  const history = useHistory();
  const defaultQuestionvalue = [];
  const questionFormatter = (response) => {
    if (response.data.length === 0) {
      return [];
    }
    let quizDefaults = {};
    let flag = false;
    if (!location.state.quizDefaults) {
      setExist(false);
      flag = true;
    }
    let responseData = [];
    responseData = response.data.map((question, index) => {
      let formattedResponseData = {
        id: question.id,
        question_text: question.question_text,
        question_image: question.question_image,
        options: question.options,
        quiz_id: question.quiz_id,
        marks: question.marks,
        is_multiple: question.multiple,
      };
      if (flag) {
        const dataToAdd = question.multiple ? [] : "";
        quizDefaults[question.id] = dataToAdd;
      }
      return formattedResponseData;
    });
    if (!flag) {
      let tempDefaults = {};
      let tempAnswerList = Object.entries(location.state.quizDefaults);
      tempAnswerList.map((v) => {
        tempDefaults[v[0]] = Array.isArray(v[1]) ? v[1] : v[1].toString();
      });
      setQuizDefaultValue({ ...tempDefaults });
    } else {
      setQuizDefaultValue({ ...quizDefaults });
    }
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
    console.log(values);
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
      value[1].map((v) => {
        if (v !== undefined && v.length) {
          temp.push(v[0]);
        }
      });
      data[value[0]] = temp;
    });
    console.log(data);
    const submitResponse = await callAPI({
      endpoint: `/api/v1/quizanswer/${location.state.quiz.id}/`,
      method: "POST",
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (submitResponse.status === 200) {
      setAlert({
        severity: "success",
        message: "Quiz Submitted successfully!",
      });
      history.replace({
        pathname: "/quiz",
      });
      setTimeout(() => {
        setAlert(null);
      }, 2000);
    } else {
      setAlert({
        severity: "error",
        message: "Quiz has already been submitted",
      });
      history.replace({
        pathname: "/quiz",
      });
      setTimeout(() => {
        setAlert(null);
      }, 2000);
    }
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
            {location.state.marks_obtained !== undefined ? (
              <p className="quizView_quizMarksObtained">
                Marks Obtained: {location.state.marks_obtained} Marks
              </p>
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
        <Grid item className="quizView_botBar">
          <Grid container direction="column">
            <Formik
              enableReinitialize={true}
              initialValues={{
                questions: { ...quizDefaultValue },
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
                        completed={
                          location.state.marks_obtained !== undefined
                            ? true
                            : false
                        }
                      />
                    </Grid>
                  ))
                ) : (
                  <></>
                )}
                {allQuestionComplete && allQuestion.length && !exist ? (
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
