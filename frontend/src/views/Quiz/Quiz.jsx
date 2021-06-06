import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import QuizCard from "./components/QuizCard";
import "./statics/css/quiz.css";

const colorPattern = [
  "quizCard_red",
  "quizCard_yellow",
  "quizCard_green",
  "quizCard_purple",
];
const datas = [
  {
    quiz_title: "First Internal Test",
    quiz_description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet sem sodales, sagittis sapien sit amet, sagittis nunc. Cras commodo sapien a magna vehicula congue. 1.Pellentesque sodales vel nibh sed condimentum. 2.In pulvinar posuere lacus imperdiet gravida.3. Donec eget scelerisque orci, eget tempus mi. 4. Fusce iaculis ligula a interdum euismod. Sed velit quam, placerat sed ultricies id, porta vel lorem. ",
    quiz_course: "COMP 102",
    quiz_instructor: "Dr. Dil Bahadur Gurung",
    start_time: "12:00 am",
    end_time: "2:00 am",
    isRandomized: "True",
    questions: [
      {
        question_text: "Rushab k ramro nai ho ta?",
        question_type: "1",
        options: ["True", "False"],
        answer: "1",
        marks: "10",
      },
    ],
  },
  {
    quiz_title: "First Internal Test",
    quiz_description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet sem sodales, sagittis sapien sit amet, sagittis nunc. Cras commodo sapien a magna vehicula congue. 1.Pellentesque sodales vel nibh sed condimentum. 2.In pulvinar posuere lacus imperdiet gravida.3. Donec eget scelerisque orci, eget tempus mi. 4. Fusce iaculis ligula a interdum euismod. Sed velit quam, placerat sed ultricies id, porta vel lorem. ",
    quiz_course: "COMP 102",
    quiz_instructor: "Dr. Dil Bahadur Gurung",
    start_time: "12:00 am",
    end_time: "2:00 am",
    isRandomized: "True",
    questions: [
      {
        question_text: "Rushab k ramro nai ho ta?",
        question_type: "1",
        options: ["True", "False"],
        answer: "1",
        marks: "10",
      },
    ],
  },
  {
    quiz_title: "First Internal Test",
    quiz_description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet sem sodales, sagittis sapien sit amet, sagittis nunc. Cras commodo sapien a magna vehicula congue. 1.Pellentesque sodales vel nibh sed condimentum. 2.In pulvinar posuere lacus imperdiet gravida.3. Donec eget scelerisque orci, eget tempus mi. 4. Fusce iaculis ligula a interdum euismod. Sed velit quam, placerat sed ultricies id, porta vel lorem. ",
    quiz_course: "COMP 102",
    quiz_instructor: "Dr. Dil Bahadur Gurung",
    start_time: "12:00 am",
    end_time: "2:00 am",
    isRandomized: "True",
    questions: [
      {
        question_text: "Rushab k ramro nai ho ta?",
        question_type: "1",
        options: ["True", "False"],
        answer: "1",
        marks: "10",
      },
    ],
  },
  {
    quiz_title: "First Internal Test",
    quiz_description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet sem sodales, sagittis sapien sit amet, sagittis nunc. Cras commodo sapien a magna vehicula congue. 1.Pellentesque sodales vel nibh sed condimentum. 2.In pulvinar posuere lacus imperdiet gravida.3. Donec eget scelerisque orci, eget tempus mi. 4. Fusce iaculis ligula a interdum euismod. Sed velit quam, placerat sed ultricies id, porta vel lorem. ",
    quiz_course: "COMP 102",
    quiz_instructor: "Dr. Dil Bahadur Gurung",
    start_time: "12:00 am",
    end_time: "2:00 am",
    isRandomized: "True",
    questions: [
      {
        question_text: "Rushab k ramro nai ho ta?",
        question_type: "1",
        options: ["True", "False"],
        answer: "1",
        marks: "10",
      },
    ],
  },
];

const Quiz = () => {
  return (
    <DashboardLayout>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
        className="quiz_root"
      >
        <Grid item className="quiz_quizCardContainer">
          <Grid container>
            {datas.map((data, index) => (
              <Grid item className="quiz_quizCardContainer">
                <QuizCard qData={data} color={colorPattern[index % 4]} />
              </Grid>
            ))}
          </Grid>
          <br />
          <br />
          <br />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default Quiz;
