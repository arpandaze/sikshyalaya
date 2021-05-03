import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import colorscheme from "../utils/colors";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Image from "./Image";
import profile from "../assets/pp.jpg";

const styleSheet = {
  root: { flexGrow: "1" },
  container: {
    margin: "0px auto",
    width: "85%",
    height: "62vh",
    maxHeight: "610px",
    borderRadius: "25px",
    background: colorscheme.white,
    boxShadow: "2px 2px 10px -3px rgba(0,0,0,0.2)",
  },
  courseTextTitle: {
    fontSize: "2em",
    fontWeight: "bold",
    position: "relative",
    top: "25px",
    left: "40px",
  },
  courseDetailBoxContainer: {
    position: "relative",
    top: "40px",
  },
  courseDetailBox: {},
  courseTextCode: {
    fontSize: "1.4em",
    fontWeight: "bold",
    lineHeight: "0.95em",
    listStyleType: "none",
  },
  courseTextCodeSelected: {
    fontSize: "1.4em",
    fontWeight: "bold",
    lineHeight: "0.95em",
    listStyleType: "none",
    color: colorscheme.red4,
  },
  courseTextName: {
    fontSize: "0.6em",
    fontWeight: "600",
    position: "relative",
    listStyleType: "none",
    color: colorscheme.grey1,
  },
  courseTextCredit: {
    fontSize: "0.8em",
    fontWeight: "400",
    listStyleType: "none",
    color: colorscheme.grey1,
  },
};
const CourseBox = ({ courseList, selected, ...rest }) => {
  return (
    <div style={styleSheet.root}>
      <Grid
        container
        direction="row"
        justify="center"
        style={styleSheet.container}
      >
        <p style={styleSheet.courseTextTitle}>Your Courses</p>
        {courseList.map((course) => (
          <div style={styleSheet.courseDetailBoxContainer}>
            <div style={styleSheet.courseDetailBox}>
              <li
                key={course.sn}
                style={
                  selected == course.sn
                    ? styleSheet.courseTextCodeSelected
                    : styleSheet.courseTextCode
                }
              >
                {course.code} <br></br>
                <a style={styleSheet.courseTextName}>{course.name}</a>
                <a style={styleSheet.courseTextCredit}>{course.credit}</a>
              </li>
            </div>
          </div>
        ))}
      </Grid>
    </div>
  );
};

export default CourseBox;
