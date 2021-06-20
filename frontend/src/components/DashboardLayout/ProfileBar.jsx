import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import CourseBox from "./CourseBox";
import OnlineBox from "./OnlineBox";
import ProfileBox from "./ProfileBox";
import "./statics/css/profileBar.css";
import { UserContext } from "../../utils/Contexts/UserContext";

const ProfileBar = ({ selected, landing = false }) => {
  const { user } = useContext(UserContext);
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
        {landing ? (
          <CourseBox courseList={courseList(user)} selected={"1"} />
        ) : (
          <OnlineBox />
        )}
      </Grid>
    </Grid>
  );
};

export default ProfileBar;
