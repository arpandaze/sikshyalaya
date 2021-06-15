import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import "./statics/css/quiz.css";
import { BsCalendar } from "react-icons/bs";
import colorscheme from "../../utils/colors";
import CustomQuizCard from "./components/CustomQuizCard";
import boxes from "../../assets/boxes.png";
import circles from "../../assets/circles.png";
import cycle from "../../assets/cycle.png";
import stripes from "../../assets/stripes.png";
import sun from "../../assets/sun.png";
import useAPI from "../../utils/useAPI";
import callAPI from "../../utils/API";

const imageList = [boxes, cycle, circles, sun, stripes];

const datas = [];

const onClick = () => {};
const Quiz = () => {
  const defaultQuizvalue = [];
  const quizFormatter = (response) => {
    if (response.data.length === 0) {
      return [];
    }

    let responseData = [];
    responseData = response.data.map((quiz) => {
      let formattedResponseData = {
        id: quiz.id,
        date: quiz.date,
        end_time: quiz.end_time,
        start_time: quiz.start_time,
        title: quiz.title,
        description: quiz.description,
        is_randomized: quiz.is_randomized,
        display_individual: quiz.display_individual,
        course_id: quiz.course_id,
      };

      return formattedResponseData;
    });

    return responseData.reverse();
  };
  let [allQuiz, allQuizComplete] = useAPI(
    { endpoint: "/api/v1/quiz/" },
    quizFormatter,
    defaultQuizvalue
  );

  return (
    <DashboardLayout>
      <Grid container direction="column" className="quiz_root" wrap="nowrap">
        <Grid item className="quiz_row">
          <div className="quiz_smallRedBox"></div>
          <h1 className="quiz_activeTitle">Active Quiz</h1>
          <div className="quiz_currentContainer">{/* asds */}</div>
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
            {allQuizComplete && allQuiz.length ? (
              allQuiz.map((data, index) => (
                <Grid item className="quiz_pastInside">
                  <CustomQuizCard
                    quiz={data}
                    image={imageList[index % 5]}
                    onClick={onClick}
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
