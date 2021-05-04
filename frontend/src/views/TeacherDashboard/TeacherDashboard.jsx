import React from "react";
import Grid from "@material-ui/core/Grid";
import Questions from "../../components/Questions";
import colorscheme from "../../utils/colors";
import DashboardLayout from "../../components/DashboardLayout";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { GiBookshelf } from "react-icons/gi";
import NotificationButton from "../../components/NotificationButton";
import "./statics/css/teacherDashboard.css";

const activeClass = [
  {
    id: "1",
    classCode: "MCSC401",
    className: "Discrete Mathematics",
    batch: "CS2019",
  },
];
const questions = [
  {
    id: "1",
    question: "Please explain group theory?",
    student: "Aatish Shrestha  ",
  },
  {
    id: "2",
    question: "If You Had Three Wishes, What Would You Wish For?",
    student: "Daisy Hinton ",
  },
  {
    id: "3",
    question: "What weird food combinations do you really enjoy?",
    student: "Ema Macias",
  },
  {
    id: "4",
    question: "What food have you never eaten but would really like to try?",
    student: "Aatish Shrestha  ",
  },
  {
    id: "5",
    question: "Do you think that aliens exist?",
    student: "Anabia Brown",
  },
  {
    id: "6",
    question:
      "When you are old, what do you think children will ask you to tell stories about?",
    student: "Aviana Dudley",
  },
  {
    id: "7",
    question:
      "If you could switch two movie characters, what switch would lead to the most inappropriate movies?",
    student: "Eleri Amin",
  },
  {
    id: "8",
    question:
      "How would your country change if everyone, regardless of age, could vote?",
    student: "Clarence Xiong",
  },
  {
    id: "9",
    question:
      "If you couldn’t be convicted of any one type of crime, what criminal charge would you like to be immune to?",
    student: "Rueben Levine",
  },
];

const TeacherDashboard = () => {
  return (
    <DashboardLayout>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
        wrap="nowrap"
        className="root"
      >
        <Grid item className="topBar">
          <p className="classQuestionText">Class Questions</p>
          <NotificationButton />
        </Grid>
        <Grid item className="botBar">
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item className="leftContainer" xs={4}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid item className="activeContainer">
                  <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignitems="center"
                    wrap="nowrap"
                  >
                    <Grid item xs={12}>
                      <div className="smallRedBox"></div>
                      <p className="activeclassText">Active class</p>
                    </Grid>
                    <Grid item xs={12}>
                      <p className="classText">{activeClass[0].classCode}</p>
                    </Grid>
                    <Grid item xs={12}>
                      <p className="classTextInner">
                        {activeClass[0].className}
                      </p>
                    </Grid>
                    <Grid item xs={12}>
                      <p className="batchText">{activeClass[0].batch}</p>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item className="quizBoxContainer">
                  <Grid item>
                    <RiQuestionAnswerLine
                      size={25}
                      color={colorscheme.grey1}
                      className="sideBoxIcons"
                    />
                    <p className="quizText">Quizzes</p>
                  </Grid>
                </Grid>
                <Grid item className="classResourceContainer">
                  <Grid item>
                    <GiBookshelf
                      size={25}
                      color={colorscheme.grey1}
                      className="sideBoxIcons"
                    />
                    <p className="rescourcesText">Resources</p>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item className="questionsContainer" xs={8}>
              <Grid container direction="column" justify="flex-start">
                {questions.map((quest) => (
                  <Grid>
                    <Questions
                      question={quest.question}
                      student={quest.student}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default TeacherDashboard;
