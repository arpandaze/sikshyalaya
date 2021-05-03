import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import colorscheme from "../utils/colors";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Image from "./Image";
import CourseBox from "./CourseBox";
import profile from "../assets/pp.jpg";
import ProfileBox from "./ProfileBox";

const styleSheet = {
  root: { flexGrow: "1" },
  profileBar: {},
  profileBox: {},
  courseBox: {},
  courseTextTitle: {
    fontSize: "2em",
    fontWeight: "bold",
    border: "1px solid black",
  },
  courseDetailBoxContainer: {
    border: "1px solid black",
  },
  courseDetailBox: {
    height: "3.4vw",
    padding: "2px",
    border: "1px solid black",
  },
  courseTextCode: {
    fontSize: "1.5em",
    fontWeight: "bold",
    lineHeight: "0.95em",
    listStyleType: "none",
    border: "1px solid black",
  },
  courseTextCodeSelected: {
    fontSize: "1.5em",
    fontWeight: "bold",
    lineHeight: "0.95em",
    listStyleType: "none",
    color: colorscheme.red4,
    border: "1px solid black",
  },
  courseTextName: {
    fontSize: "0.6em",
    fontWeight: "600",
    position: "relative",
    listStyleType: "none",
    color: colorscheme.grey1,
    border: "1px solid black",
  },
  courseTextCredit: {
    fontSize: "0.8em",
    fontWeight: "400",
    listStyleType: "none",
    color: colorscheme.grey1,
    border: "1px solid black",
  },
};
const user = [
  {
    name: "Yugesh Upadhyaya Luitel",
    department: "Computer Science",
    year: "II",
    semester: "I",
    image: profile,
  },
];
const courses = [
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
const ProfileBar = ({ selected }) => {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      style={styleSheet.root}
    >
      <Grid xs={12} item style={styleSheet.profileBox}>
        <ProfileBox user={user} />
      </Grid>
      <Grid xs={12} item style={styleSheet.courseBox}>
        <CourseBox courseList={courses} selected={1} />
      </Grid>
    </Grid>
  );
};

export default ProfileBar;
