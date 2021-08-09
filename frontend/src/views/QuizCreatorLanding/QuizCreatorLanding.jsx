import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import "./statics/css/quizLanding.css";
import { BsCalendar } from "react-icons/bs";
import colorscheme from "../../utils/colors";
import CustomQuizCard from "./components/CustomQuizCard";
import boxes from "../../assets/boxes.png";
import circles from "../../assets/circles.png";
import cycle from "../../assets/cycle.png";
import stripes from "../../assets/stripes.png";
import sun from "../../assets/sun.png";
import useAPI from "../../utils/useAPI";
import Button from "@material-ui/core/Button";
import callAPI from "../../utils/API";
import { GoPlus } from "react-icons/go";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const imageList = [boxes, cycle, circles, sun, stripes];
const Quiz = () => {
  const history = useHistory();
  const [buttonType, setButtonType] = useState(true);
  const defaultQuizvalue = [];
  const quizFormatter = (response) => {
    if (response.data.length === 0) {
      return [];
    }

    let responseData = {
      active: [],
      past: [],
    };
    const currentDateTime = new Date();

    let tempResponse = response.data.map((quiz) => {
      const startTime = new Date(quiz.start_time);
      const endTime = new Date(quiz.end_time);
      let formattedResponseData = {
        id: quiz.id,
        date: new Date(
          startTime.toLocaleDateString() + " UTC"
        ).toLocaleDateString(),
        end_time: new Date(endTime.toLocaleString() + " UTC"),
        start_time: new Date(startTime.toLocaleString() + " UTC"),
        title: quiz.title,
        description: quiz.description,
        is_randomized: quiz.is_randomized,
        display_individual: quiz.display_individual,
        course_code: quiz.course.course_code,
        instructor: quiz.instructor,
        total_marks: quiz.total_marks,
      };
      return formattedResponseData;
    });

    tempResponse.filter((response) => {
      response.totalTime = new Date(response.end_time - response.start_time)
        .toISOString()
        .substr(11, 8)
        .split(":");
      currentDateTime >= response.start_time &&
      currentDateTime <= response.end_time
        ? responseData.active.push(response)
        : responseData.past.push(response);
    });
    return responseData;
  };
  let [allQuiz, allQuizComplete] = useAPI(
    { endpoint: "/api/v1/quiz/" },
    quizFormatter,
    defaultQuizvalue
  );

  return (
    <DashboardLayout mode={4}>
      <Grid container direction="column" className="quiz_root" wrap="nowrap">
        <Grid item className="quiz_row">
          <Grid container direction="column">
            <Grid item>
              <Grid
                container
                direction="row"
                alignItems="center"
                className="quizLanding_titlContainer"
              >
                <Grid item>
                  <div className="quiz_smallRedBox"></div>
                  <h1 className="quiz_activeTitle">Active Quiz</h1>
                </Grid>
                <Grid item className="quizLanding_addquizButtoncontainer">
                  <Button
                    onMouseOver={() => {
                      setButtonType(false);
                    }}
                    onMouseOut={() => {
                      setButtonType(true);
                    }}
                    variant={buttonType ? "outlined" : "contained"}
                    color="primary"
                    startIcon={<GoPlus />}
                    onClick={() => {
                      history.push({
                        pathname: "/quiz-creator",
                      });
                    }}
                    className="quizLanding_addquizButton"
                  >
                    Add quiz
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="row">
                {allQuizComplete && allQuiz.active.length ? (
                  allQuiz.active.map((data, index) => (
                    <Grid key={data.id} item className="quiz_cardInside">
                      <CustomQuizCard
                        key={data.id}
                        quiz={data}
                        image={[...imageList].reverse()[index % 5]}
                        onClick={() => {
                          history.push({
                            pathname: "/quiz/questions",
                            state: { quiz: data },
                          });
                        }}
                      />
                    </Grid>
                  ))
                ) : (
                  <p className="quiz_noQuiz">No active Quiz Available</p>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item className="quiz_row2">
          <Grid container direction="row" alignItems="center">
            <BsCalendar
              size={35}
              color={colorscheme.black}
              className="quiz_pastIcon"
            />
            <h1 className="quiz_pastText">Past Quizzes</h1>
          </Grid>
          <br />
          <br />
          <Grid container direction="row" className="quiz_pastContainer">
            {allQuizComplete && allQuiz.past.length ? (
              allQuiz.past.map((data, index) => (
                <Grid key={data.id} item className="quiz_cardInside">
                  <CustomQuizCard
                    key={data.id}
                    quiz={data}
                    image={imageList[index % 5]}
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
    // <DashboardLayout>
    //   <Grid
    //     container
    //     direction="column"
    //     justify="flex-start"
    //     alignItems="center"
    //     className="quiz_root"
    //   >
    //     <Grid item className="quiz_quizCardContainer">
    //       <Grid container>
    //         {datas.map((data, index) => (
    //           <Grid item className="quiz_quizCardContainer">
    //             <QuizCard qData={data} color={colorPattern[index % 4]} />
    //           </Grid>
    //         ))}
    //       </Grid>
    //       <br />
    //       <br />
    //       <br />
    //     </Grid>
    //   </Grid>
    // </DashboardLayout>
  );
};

export default Quiz;
