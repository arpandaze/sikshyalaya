import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import colorscheme from "../../utils/colors";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import SmallCards from "./components/SmallCards";
import { BsCalendar } from "react-icons/bs";
import { StylesProvider } from "@material-ui/core/styles";
import "./statics/css/teacherlanding.css";
import useAPI from "../../utils/useAPI";
import Button from "@material-ui/core/Button";
import { GoPlus } from "react-icons/go";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { format } from "date-fns";

const Landing = () => {
  const [buttonType, setButtonType] = useState(true);
  const classSessionFormatter = (value) => {
    if (!value.data.length) {
      return { active: [], other: [] };
    }
    let active_class_session = [];
    let class_session = [];

    const currentDateTime = new Date();
    value.data.map((item) => {
      let start_time = new Date(
        new Date(item.start_time).toLocaleString() + " UTC"
      );
      let end_time = new Date(
        new Date(item.end_time).toLocaleString() + " UTC"
      );

      let instructors_name = item.instructor
        .map((instructor) => {
          return instructor.full_name;
        })
        .join(" and ");
      if (
        end_time.getTime() > currentDateTime &&
        start_time.getTime() < currentDateTime
      ) {
        active_class_session.push({
          id: item.id,
          title: item.course.course_code,
          titleDescription: item.course.course_name,
          title2: "Today's Topic",
          title2Description: item.description,
          bottomText: instructors_name,
          button: true,
        });
      } else {
        class_session.push({
          id: item.id,
          title: item.course.course_code,
          titleDescription: item.course.course_name,
          title2: "Today's Topic",
          title2Description: item.description,
          bottomText: instructors_name,
          button: false,
          time: format(start_time, "HH:mm aaa"),
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
  const history = useHistory();

  return (
    <StylesProvider injectFirst>
      <DashboardLayout landing={true}>
        <Grid
          container
          direction="column"
          className="landing_root"
          wrap="nowrap"
        >
          <Grid item className="landing_row">
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
              className="teacherLanding_header"
            >
              <Grid item>
                <div className="landing_smallRedBox"></div>
                <h1 className="landing_activeTitle">Active Class</h1>
              </Grid>
              <Grid item>
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
                      pathname: "/class-session-create",
                    });
                  }}
                  className="landing_addsessionButton"
                >
                  Add Session
                </Button>
              </Grid>
            </Grid>

            <br />
            <br />
            <div className="landing_currentContainer">
              {classSession && classSession.active.length ? (
                classSession.active.map((details) => (
                  <SmallCards cardData={details} />
                ))
              ) : (
                <p className="quiz_noActiveClass">No active Class Available</p>
              )}
            </div>
          </Grid>
          <Grid item className="landing_row2">
            <Grid container direction="row" alignItems="center">
              <BsCalendar
                size={35}
                color={colorscheme.black}
                className="landing_upcomingIcon"
              />
              <h1 className="landing_upcomingText">Upcoming Classes</h1>
            </Grid>
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
