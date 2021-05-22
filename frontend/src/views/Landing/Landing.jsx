import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import colorscheme from "../../utils/colors";
import DashboardLayout from "../../components/DashboardLayout";
import SmallCards from "../../components/SmallCards";
import { BsCalendar } from "react-icons/bs";
import { StylesProvider } from "@material-ui/core/styles";
import "./statics/css/landing.css";

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
    <StylesProvider injectFirst>
      <DashboardLayout>
        <Grid
          container
          direction="column"
          className="landing_root"
          wrap="nowrap"
        >
          <Grid item className="landing_row">
            <div className="landing_smallRedBox"></div>
            <h1 className="landing_activeTitle">Active Course in Network</h1>
            <br />
            <br />
            <div className="landing_currentContainer">
              <SmallCards cardData={card1} />
            </div>
          </Grid>
          <Grid item className="landing_row2">
            <BsCalendar
              size={35}
              color={colorscheme.black}
              className="landing_upcomingIcon"
            />
            <h1 className="landing_upcomingText">Upcoming Classes</h1>
            <br />
            <br />
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
              className="landing_upCommingContainer"
            >
              {upCommingClasses.map((course) => (
                <Grid
                  item
                  key={course.id}
                  className="landing_upCommingContainerBox"
                >
                  <div className="landing_upCommingCourseBar">
                    <SmallCards cardData={course} />
                  </div>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </DashboardLayout>
    </StylesProvider>
  );
};

export default Landing;
