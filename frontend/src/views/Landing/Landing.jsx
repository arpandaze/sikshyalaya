import React from "react";
import Grid from "@material-ui/core/Grid";
import colorscheme from "../../utils/colors";
import DashboardLayout from "../../components/DashboardLayout";
import SmallCards from "../../components/SmallCards";
import { BsCalendar } from "react-icons/bs";
import "./statics/css/Landing.css";

const styleSheet = {
  activeCourseBar: {
    position: "relative",
  },
  upCommingCourseBar: {
    position: "relative",
    marginLeft: "30px",
    marginBottom: "30px",
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
      <Grid container direction="column" className="root" wrap="nowrap">
        <Grid item className="row">
          <div className="smallRedBox"></div>
          <h1 className="activeTitle">Active Course in Network</h1>
          <br />
          <br />
          <div className="currentContainer">
            <SmallCards
              cardData={card1}
              addStyles={styleSheet.activeCourseBar}
            />
          </div>
        </Grid>
        <Grid item className="row2">
          <BsCalendar
            size={35}
            color={colorscheme.black}
            className="upcomingIcon"
          />
          <h1 className="upcomingText">Upcoming Classes</h1>
          <br />
          <br />
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            className="upCommingContainer"
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
