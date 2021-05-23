import React, { useContext, useState } from "react";
import Grid from "@material-ui/core/Grid";
import colorscheme from "../../utils/colors";
import DashboardLayout from "../../components/DashboardLayout";
import SmallCards from "../../components/SmallCards";
import { BsCalendar } from "react-icons/bs";
import { StylesProvider } from "@material-ui/core/styles";
import "./statics/css/landing.css";
import { useAPI } from "../../utils/useAPI";

const Landing = () => {
  const classSessionFormatter = (value) => {
    if (!value.data.length) {
      return [];
    }
    let active_class_session = [];
    let class_session = [];
    value.data.map((item) => {
      let start_time = new Date(item.datetime + "+05:45");
      let duration = item.duration * 60 * 1000;
      let instructors_name = item.instructor
        .map((instructor) => {
          return instructor.full_name;
        })
        .join(" and ");
      if (
        start_time.getTime() + duration > Date.now() &&
        start_time.getTime() < Date.now()
      ) {
        active_class_session.push({
          title: item.course.course_code,
          titleDescription: item.course.course_name,
          title2: "Today's Topic",
          title2Description: item.description,
          bottomText: instructors_name,
          button: true,
        });
      } else {
        class_session.push({
          title: item.course.course_code,
          titleDescription: item.course.course_name,
          title2: "Today's Topic",
          title2Description: item.description,
          bottomText: instructors_name,
          id: 1,
          button: false,
          time: start_time.toLocaleTimeString().replace(":00",""),
        });
      }
    });
    return { active: active_class_session, other: class_session };
  };

  const classSessionDefaults = {
    active: [],
    other: [],
  };

  const [classSession, classSessionReqStat] = useAPI(
    { endpoint: "/api/v1/class_session/" },
    classSessionFormatter,
    classSessionDefaults
  );

  // const card1 = {
  //   title: "MATH 208",
  //   titleDescription: "Statistic and Probability",
  //   title2: "Today's Topic",
  //   title2Description: "Permutation and Combination",
  //   bottomText: "Dr. Rabindranath Kayastha",
  //   button: true,
  // };
  // const upCommingClasses = [
  //   {
  //     id: 1,
  //     title: "MCSC 201",
  //     titleDescription: "Discrete Mathematics/Structure",
  //     title2: "Today's Topic",
  //     title2Description: "Prime Numbers",
  //     bottomText: "Dr. DilBahadur Gurung",
  //     button: false,
  //     time: "9:00 am",
  //   },
  //   {
  //     id: 2,
  //     title: "EEEG 202",
  //     titleDescription: "Digital Logic",
  //     title2: "Today's Topic",
  //     title2Description: "Floating Point Binary Numbers",
  //     bottomText: "Prof. Anand Gacchadar",
  //     button: false,
  //     time: "9:00 am",
  //   },
  //   {
  //     id: 2,
  //     title: "EEEG 202",
  //     titleDescription: "Digital Logic",
  //     title2: "Today's Topic",
  //     title2Description: "Floating Point Binary Numbers",
  //     bottomText: "Prof. Anand Gacchadar",
  //     button: false,
  //     time: "9:00 am",
  //   },
  //   {
  //     id: 2,
  //     title: "EEEG 202",
  //     titleDescription: "Digital Logic",
  //     title2: "Today's Topic",
  //     title2Description: "Floating Point Binary Numbers",
  //     bottomText: "Prof. Anand Gacchadar",
  //     button: false,
  //     time: "9:00 am",
  //   },
  //   {
  //     id: 2,
  //     title: "EEEG 202",
  //     titleDescription: "Digital Logic",
  //     title2: "Today's Topic",
  //     title2Description: "Floating Point Binary Numbers",
  //     bottomText: "Prof. Anand Gacchadar",
  //     button: false,
  //     time: "9:00 am",
  //   },
  //   {
  //     id: 2,
  //     title: "EEEG 202",
  //     titleDescription: "Digital Logic",
  //     title2: "Today's Topic",
  //     title2Description: "Floating Point Binary Numbers",
  //     bottomText: "Prof. Anand Gacchadar",
  //     button: false,
  //     time: "9:00 am",
  //   },
  //   {
  //     id: 2,
  //     title: "EEEG 202",
  //     titleDescription: "Digital Logic",
  //     title2: "Today's Topic",
  //     title2Description: "Floating Point Binary Numbers",
  //     bottomText: "Prof. Anand Gacchadar",
  //     button: false,
  //     time: "9:00 am",
  //   },
  //   {
  //     id: 2,
  //     title: "EEEG 202",
  //     titleDescription: "Digital Logic",
  //     title2: "Today's Topic",
  //     title2Description: "Floating Point Binary Numbers",
  //     bottomText: "Prof. Anand Gacchadar",
  //     button: false,
  //     time: "9:00 am",
  //   },
  //   {
  //     id: 2,
  //     title: "EEEG 202",
  //     titleDescription: "Digital Logic",
  //     title2: "Today's Topic",
  //     title2Description: "Floating Point Binary Numbers",
  //     bottomText: "Prof. Anand Gacchadar",
  //     button: false,
  //     time: "9:00 am",
  //   },
  //   {
  //     id: 2,
  //     title: "EEEG 202",
  //     titleDescription: "Digital Logic",
  //     title2: "Today's Topic",
  //     title2Description: "Floating Point Binary Numbers",
  //     bottomText: "Prof. Anand Gacchadar",
  //     button: false,
  //     time: "9:00 am",
  //   },
  //   {
  //     id: 2,
  //     title: "EEEG 202",
  //     titleDescription: "Digital Logic",
  //     title2: "Today's Topic",
  //     title2Description: "Floating Point Binary Numbers",
  //     bottomText: "Prof. Anand Gacchadar",
  //     button: false,
  //     time: "9:00 am",
  //   },
  //   {
  //     id: 2,
  //     title: "EEEG 202",
  //     titleDescription: "Digital Logic",
  //     title2: "Today's Topic",
  //     title2Description: "Floating Point Binary Numbers",
  //     bottomText: "Prof. Anand Gacchadar",
  //     button: false,
  //     time: "9:00 am",
  //   },
  //   {
  //     id: 2,
  //     title: "EEEG 202",
  //     titleDescription: "Digital Logic",
  //     title2: "Today's Topic",
  //     title2Description: "Floating Point Binary Numbers",
  //     bottomText: "Prof. Anand Gacchadar",
  //     button: false,
  //     time: "9:00 am",
  //   },
  //   {
  //     id: 2,
  //     title: "EEEG 202",
  //     titleDescription: "Digital Logic",
  //     title2: "Today's Topic",
  //     title2Description: "Floating Point Binary Numbers",
  //     bottomText: "Prof. Anand Gacchadar",
  //     button: false,
  //     time: "9:00 am",
  //   },
  //   {
  //     id: 2,
  //     title: "EEEG 202",
  //     titleDescription: "Digital Logic",
  //     title2: "Today's Topic",
  //     title2Description: "Floating Point Binary Numbers",
  //     bottomText: "Prof. Anand Gacchadar",
  //     button: false,
  //     time: "9:00 am",
  //   },
  //   {
  //     id: 2,
  //     title: "EEEG 202",
  //     titleDescription: "Digital Logic",
  //     title2: "Today's Topic",
  //     title2Description: "Floating Point Binary Numbers",
  //     bottomText: "Prof. Anand Gacchadar",
  //     button: false,
  //     time: "9:00 am",
  //   },
  // ];

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
              { console.log(classSession.active) }
              {classSession.active.map((details) => (
                <SmallCards cardData={details} />
              ))}
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
              {classSession.other.map((course) => (
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
