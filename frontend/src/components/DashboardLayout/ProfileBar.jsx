import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import CourseBox from "./CourseBox";
import OnlineBox from "./OnlineBox";
import ProfileBox from "./ProfileBox";
import "./statics/css/profileBar.css";
import AlertMessage from "../AlertMessage";
import { UserContext } from "../../utils/Contexts/UserContext";
import { AlertContext } from "./AlertContext";

const ProfileBar = ({ selected, mode = false }) => {
  const { user } = useContext(UserContext);
  const { alert, setAlert } = useContext(AlertContext);
  const renderAlert = () => {
    return <AlertMessage severity={alert.severity} message={alert.message} />;
  };
  const courseList = (userContext) => {
    try {
      let courseList = userContext.group.course.map((item, index) => {
        return {
          sn: item.id,
          code: item.course_code,
          name: item.course_name,
          credit: item.course_credit,
        };
      });
      return courseList;
    } catch (e) {
      return [];
    }
  };
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className="profileBar_root"
    >
      <Grid xs={12} item className="profileBar_profileBox">
        <ProfileBox />
      </Grid>
      <Grid xs={12} item className="profileBar_courseBox">
        {mode === 1 ? (
          <CourseBox courseList={courseList(user)} selected={"1"} />
        ) : mode === 2 ? (
          <OnlineBox />
        ) : mode === 3 ? (
          <></> //attendance
        ) : (
          <></>
        )}
      </Grid>
      <Grid item className="profileBar_GlobalAlertBox">
        {alert && alert.message && alert.severity ? renderAlert() : <></>}
      </Grid>
    </Grid>
  );
};

export default ProfileBar;
