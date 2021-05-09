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
        className="teacherDash_root"
      >
        <Grid item className="teacherDash_topBar">
          <p className="teacherDash_classQuestionText">Class Questions</p>
          <NotificationButton />
        </Grid>
        <Grid item className="teacherDash_botBar">
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item className="teacherDash_leftContainer" xs={4}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid item className="teacherDash_activeContainer">
                  <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignitems="center"
                    wrap="nowrap"
                  >
                    <Grid item xs={12}>
                      <div className="teacherDash_smallRedBox"></div>
                      <p className="teacherDash_activeclassText">
                        Active class
                      </p>
                    </Grid>
                    <Grid item xs={12}>
                      <p className="teacherDash_classText">
                        {activeClass[0].classCode}
                      </p>
                    </Grid>
                    <Grid item xs={12}>
                      <p className="teacherDash_classTextInner">
                        {activeClass[0].className}
                      </p>
                    </Grid>
                    <Grid item xs={12}>
                      <p className="teacherDash_batchText">
                        {activeClass[0].batch}
                      </p>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item className="teacherDash_quizBoxContainer">
                  <Grid item>
                    <RiQuestionAnswerLine
                      size={25}
                      color={colorscheme.grey1}
                      className="teacherDash_sideBoxIcons"
                    />
                    <p className="teacherDash_quizText">Quizzes</p>
                  </Grid>
                </Grid>
                <Grid item className="teacherDash_classResourceContainer">
                  <Grid item>
                    <GiBookshelf
                      size={25}
                      color={colorscheme.grey1}
                      className="teacherDash_sideBoxIcons"
                    />
                    <p className="teacherDash_rescourcesText">Resources</p>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item className="teacherDash_questionsContainer" xs={8}>
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
