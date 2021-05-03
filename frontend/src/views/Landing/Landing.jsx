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
import colorscheme from "../../utils/colors";
import ProfileBar from "../../components/ProfileBar";
import DashboardLayout from "../../components/DashboardLayout";
import SmallCards from "../../components/SmallCards";
import { BsCalendar } from "react-icons/bs";

const styleSheet = {
  root: {
    flexGrow: "1",
    height: "100vh",
    margin: "0px auto",
    position: "relative",
  },
  activeCourseBar: {
    position: "relative",
  },
  row: { position: "relative", top: "20px" },
  row2: { position: "relative", top: "50px" },
  smallRedBox: {
    display: "inline-block",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    background: colorscheme.red4,
    position: "relative",
    marginLeft: "30px",
  },
  currentContainer: {
    width: "95%",
    margin: "0px auto",
  },
  activeTitle: {
    display: "inline-block",
    position: "relative",
    left: "15px",
  },
  upCommingCourseBar: {
    position: "relative",
    marginLeft: "30px",
    marginBottom: "30px",
  },
  upcomingIcon: {
    display: "inline-block",
    position: "relative",
    marginLeft: "30px",
  },
  upcomingText: {
    display: "inline-block",
    position: "relative",
    left: "15px",
  },
  upCommingContainer: {
    width: "98%",
    height: "500px",
    margin: "0px auto",
  },
};

const Landing = () => {
  const card1 = {
    title: "MATH 208",
    titleDescription: "Statistic and Probability",
    title2: "Today's Topic",
    title2Description: "Permutation and Combination",
    bottomText: "Dr. Rabindranath Kayastha",
    button: true,
  };
  const upCommingClasses = [
    {
      id: 1,
      title: "MCSC 201",
      titleDescription: "Discrete Mathematics/Structure",
      title2: "Today's Topic",
      title2Description: "Prime Numbers",
      bottomText: "Dr. DilBahadur Gurung",
      button: false,
      time: "9:00 am",
    },
    {
      id: 2,
      title: "EEEG 202",
      titleDescription: "Digital Logic",
      title2: "Today's Topic",
      title2Description: "Floating Point Binary Numbers",
      bottomText: "Prof. Anand Gacchadar",
      button: false,
      time: "9:00 am",
    },
    {
      id: 2,
      title: "EEEG 202",
      titleDescription: "Digital Logic",
      title2: "Today's Topic",
      title2Description: "Floating Point Binary Numbers",
      bottomText: "Prof. Anand Gacchadar",
      button: false,
      time: "9:00 am",
    },
    {
      id: 2,
      title: "EEEG 202",
      titleDescription: "Digital Logic",
      title2: "Today's Topic",
      title2Description: "Floating Point Binary Numbers",
      bottomText: "Prof. Anand Gacchadar",
      button: false,
      time: "9:00 am",
    },
    {
      id: 2,
      title: "EEEG 202",
      titleDescription: "Digital Logic",
      title2: "Today's Topic",
      title2Description: "Floating Point Binary Numbers",
      bottomText: "Prof. Anand Gacchadar",
      button: false,
      time: "9:00 am",
    },
    {
      id: 2,
      title: "EEEG 202",
      titleDescription: "Digital Logic",
      title2: "Today's Topic",
      title2Description: "Floating Point Binary Numbers",
      bottomText: "Prof. Anand Gacchadar",
      button: false,
      time: "9:00 am",
    },
    {
      id: 2,
      title: "EEEG 202",
      titleDescription: "Digital Logic",
      title2: "Today's Topic",
      title2Description: "Floating Point Binary Numbers",
      bottomText: "Prof. Anand Gacchadar",
      button: false,
      time: "9:00 am",
    },
    {
      id: 2,
      title: "EEEG 202",
      titleDescription: "Digital Logic",
      title2: "Today's Topic",
      title2Description: "Floating Point Binary Numbers",
      bottomText: "Prof. Anand Gacchadar",
      button: false,
      time: "9:00 am",
    },
    {
      id: 2,
      title: "EEEG 202",
      titleDescription: "Digital Logic",
      title2: "Today's Topic",
      title2Description: "Floating Point Binary Numbers",
      bottomText: "Prof. Anand Gacchadar",
      button: false,
      time: "9:00 am",
    },
    {
      id: 2,
      title: "EEEG 202",
      titleDescription: "Digital Logic",
      title2: "Today's Topic",
      title2Description: "Floating Point Binary Numbers",
      bottomText: "Prof. Anand Gacchadar",
      button: false,
      time: "9:00 am",
    },
    {
      id: 2,
      title: "EEEG 202",
      titleDescription: "Digital Logic",
      title2: "Today's Topic",
      title2Description: "Floating Point Binary Numbers",
      bottomText: "Prof. Anand Gacchadar",
      button: false,
      time: "9:00 am",
    },
    {
      id: 2,
      title: "EEEG 202",
      titleDescription: "Digital Logic",
      title2: "Today's Topic",
      title2Description: "Floating Point Binary Numbers",
      bottomText: "Prof. Anand Gacchadar",
      button: false,
      time: "9:00 am",
    },
    {
      id: 2,
      title: "EEEG 202",
      titleDescription: "Digital Logic",
      title2: "Today's Topic",
      title2Description: "Floating Point Binary Numbers",
      bottomText: "Prof. Anand Gacchadar",
      button: false,
      time: "9:00 am",
    },
    {
      id: 2,
      title: "EEEG 202",
      titleDescription: "Digital Logic",
      title2: "Today's Topic",
      title2Description: "Floating Point Binary Numbers",
      bottomText: "Prof. Anand Gacchadar",
      button: false,
      time: "9:00 am",
    },
    {
      id: 2,
      title: "EEEG 202",
      titleDescription: "Digital Logic",
      title2: "Today's Topic",
      title2Description: "Floating Point Binary Numbers",
      bottomText: "Prof. Anand Gacchadar",
      button: false,
      time: "9:00 am",
    },
    {
      id: 2,
      title: "EEEG 202",
      titleDescription: "Digital Logic",
      title2: "Today's Topic",
      title2Description: "Floating Point Binary Numbers",
      bottomText: "Prof. Anand Gacchadar",
      button: false,
      time: "9:00 am",
    },
  ];
  return (
    <DashboardLayout>
      <Grid container direction="column" style={styleSheet.root} wrap="nowrap">
        <Grid item style={styleSheet.row}>
          <div style={styleSheet.smallRedBox}></div>
          <h1 style={styleSheet.activeTitle}>Active Course in Network</h1>
          <br />
          <br />
          <div style={styleSheet.currentContainer}>
            <SmallCards
              cardData={card1}
              addStyles={styleSheet.activeCourseBar}
            />
          </div>
        </Grid>
        <Grid item style={styleSheet.row2}>
          <BsCalendar
            size={35}
            color={colorscheme.black}
            style={styleSheet.upcomingIcon}
          />
          <h1 style={styleSheet.upcomingText}>Upcoming Classes</h1>
          <br />
          <br />
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            style={styleSheet.upCommingContainer}
          >
            {upCommingClasses.map((course) => (
              <Grid item key={course.id}>
                <SmallCards
                  cardData={course}
                  addStyles={styleSheet.upCommingCourseBar}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default Landing;
