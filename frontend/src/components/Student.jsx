import React from "react";
import Grid from "@material-ui/core/Grid";
import colorscheme from "../utils/colors";
import { IconContext } from "react-icons";
import { FaUserEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./statics/css/student.css";

const Students = ({ name, onEdit, ...rest }) => {
  return (
    <Grid
      container
      direction="row"
      className="adminStudentBox_root"
      alignItems="center"
    >
      <Grid item xs={12} className="adminStudentBox_innerContainer">
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="center"
          wrap="nowrap"
        >
          <Grid item className="adminStudentBox_studentName">
            <p className="adminStudentBox_studentNameText">{name}</p>
          </Grid>
          <Grid item>
            <IconContext.Provider
              value={{ className: "adminStudentBox_editIcon" }}
            >
              <FaUserEdit color={colorscheme.red4} onClick={onEdit} />
            </IconContext.Provider>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Students;
