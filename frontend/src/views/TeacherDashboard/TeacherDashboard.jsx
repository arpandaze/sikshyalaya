import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import { Route, Switch, Redirect } from "react-router-dom";
import Button from "../../components/Button";
import * as yup from "yup";
import Tab from "../../components/Tab";
import Grid from "@material-ui/core/Grid";
import Image from "../../components/Image";
import profile from "../../assets/pp.jpg";
import SideBar from "../../components/SideBar";
import Questions from "../../components/Questions";
import colorscheme from "../../utils/colors";
import ProfileBar from "../../components/ProfileBar";
import DashboardLayout from "../../components/DashboardLayout";
import { IoMdNotificationsOutline } from "react-icons/io";
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
          <a className="classQuestionText">Class Questions</a>
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
                      <a className="activeclassText">Active class</a>
                    </Grid>
                    <Grid item xs={12}>
                      <a className="classText">{activeClass[0].classCode}</a>
                    </Grid>
                    <Grid item xs={12}>
                      <a className="classTextInner">
                        {activeClass[0].className}
                      </a>
                    </Grid>
                    <Grid item xs={12}>
                      <a className="batchText">{activeClass[0].batch}</a>
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
                    <a className="quizText">Quizzes</a>
                  </Grid>
                </Grid>
                <Grid item className="classResourceContainer">
                  <Grid item>
                    <GiBookshelf
                      size={25}
                      color={colorscheme.grey1}
                      className="sideBoxIcons"
                    />
                    <a className="rescourcesText">Resources</a>
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
