import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import DashboardLayout from "../../../components/DashboardLayout/DashboardLayout";
import {
  Redirect,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import useAPI from "../../../utils/useAPI";
import "./statics/css/quizView.css";
import CustomTabComponent from "../../../components/CustomTabComponent";
import QuestionView from "./QuestionView";

const QuizView = ({ location }) => {
  const history = useHistory();
  const defaultQuestionvalue = [];
  const questionFormatter = (response) => {
    if (response.data.length === 0) {
      return [];
    }
    let responseData = [];
    responseData = response.data.map((question) => {
      let formattedResponseData = {
        id: question.id,
        question_text: question.question_text,
        question_image: question.question_image,
        options: question.options,
        quiz_id: question.quiz_id,
      };
      return formattedResponseData;
    });
    console.log(responseData);
    return responseData;
  };
  let [allQuestion, allQuestionComplete] = useAPI(
    { endpoint: `/api/v1/quiz/${location.state.quiz.id}/question` },
    questionFormatter,
    defaultQuestionvalue
  );
  useEffect(() => {
    console.log(location.state);
    if (!location.state) {
      history.replace({
        pathname: "/quiz",
      });
    }
  }, [location]);
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
            {allQuestionComplete && allQuestion.length ? (
              allQuestion.map((question, index) => (
                <Grid item className="quizView_questionContainer">
                  <QuestionView
                    data={question}
                    position={index}
                    length={allQuestion.length}
                  />
                </Grid>
              ))
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default QuizView;
