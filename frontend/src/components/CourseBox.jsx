import React from "react";
import colorscheme from "../utils/colors";
import Grid from "@material-ui/core/Grid";
import "./statics/css/courseBox.css";

const CourseBox = ({ courseList, selected, ...rest }) => {
  return (
    <div className="courseBox_root">
      <Grid container className="courseBox_container">
        <a className="courseBox_courseTextTitle">Your Courses</a>
        {courseList.map((course) => (
          <div className="courseBox_courseDetailBoxContainer">
            <div className="courseBox_courseDetailBox">
              <li
                key={course.sn}
                className={
                  selected == course.sn
                    ? "courseBox_courseTextCodeSelected"
                    : "courseBox_courseTextCode"
                }
              >
                {course.code} <br></br>
                <p className="courseBox_courseTextName">{course.name}</p>
                <p className="courseBox_courseTextCredit">{course.credit}</p>
              </li>
            </div>
          </div>
        ))}
      </Grid>
    </div>
  );
};

export default CourseBox;
