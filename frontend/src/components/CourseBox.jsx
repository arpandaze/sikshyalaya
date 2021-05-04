import React from "react";
import colorscheme from "../utils/colors";
import Grid from "@material-ui/core/Grid";

const styleSheet = {
  container: {
    width: "85%",
    borderRadius: "25px",
    height: "63vh",
    maxHeight: "630px",
    position: "relative",
    top: "50px",
    margin: "0px auto",
    background: colorscheme.white,
    boxShadow: "2px 2px 10px -3px rgba(0,0,0,0.2)",
  },
  courseTextTitle: {
    fontSize: "2em",
    height: "2em",
    fontWeight: "bold",
    position: "relative",
    top: "15px",
    left: "30px",
  },
  courseDetailBoxContainer: {
    width: "100%",
    height: "10%",
    position: "relative",
  },
  courseDetailBox: {
    height: "3.4vw",
    padding: "2px",
  },
  courseTextCode: {
    width: "85%",
    fontSize: "1.4em",
    fontWeight: "bold",
    position: "relative",
    top: "10px",
    left: "30px",
    lineHeight: "0.95em",
    listStyleType: "none",
  },
  courseTextCodeSelected: {
    width: "85%",
    fontSize: "1.4em",
    fontWeight: "bold",
    position: "relative",
    top: "10px",
    left: "30px",
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
    position: "absolute",
    top: "15px",
    right: "10px",
    listStyleType: "none",
    color: colorscheme.grey1,
  },
};
const CourseBox = ({ courseList, selected, ...rest }) => {
  return (
    <div style={styleSheet.root}>
      <Grid container style={styleSheet.container}>
        <a style={styleSheet.courseTextTitle}>Your Courses</a>
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
                <p style={styleSheet.courseTextName}>{course.name}</p>
                <p style={styleSheet.courseTextCredit}>{course.credit}</p>
              </li>
            </div>
          </div>
        ))}
      </Grid>
    </div>
  );
};

export default CourseBox;
