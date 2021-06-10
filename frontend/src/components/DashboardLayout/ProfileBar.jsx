import React, { useContext, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import CourseBox from "./CourseBox";
import OnlineBox from "./OnlineBox";
import ProfileBox from "./ProfileBox";
import "./statics/css/profileBar.css";
import { UserContext } from "../../utils/Contexts/UserContext";

const courses_temp = [
  {
    sn: "1",
    code: "MATH 208",
    name: "Statistics and Probability",
    credit: "3",
  },
  {
    sn: "2",
    code: "MCSC 201",
    name: "Discrete Mathematics/Structure",
    credit: "3",
  },
  { sn: "3", code: "EEEG 202", name: "Digital Logic", credit: "3" },
  {
    sn: "4",
    code: "EEEG 211",
    name: "Electronics Engineering",
    credit: "3",
  },
  {
    sn: "5",
    code: "COMP 202",
    name: "Data Structure and Algorithm",
    credit: "3",
  },
  { sn: "6", code: "COMP 206", name: "Computer Project I", credit: "2" },
  { sn: "7", code: "COMP 208", name: "Laboratory Work", credit: "1" },
];
const ProfileBar = ({ selected, landing=false }) => {
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
        {
          landing ?
            <CourseBox courseList={courseList(user)} selected={"1"} /> :
            <OnlineBox />
        }
				
			</Grid>
		</Grid>
	);
};

export default ProfileBar;
