import React from "react";
import Grid from "@material-ui/core/Grid";
import colorscheme from "../utils/colors";
import { IconContext } from "react-icons";
import { VscEdit } from "react-icons/vsc";
import { Link } from "react-router-dom";
import "./statics/css/student.css";

const Students = ({ name, ...rest }) => {
  return (
    <Grid container direction="column" className="adminStudentBox_root">
      <Grid item className="adminStudentBox_innerContainer">
        <Grid container direction="row" alignItems="flex-start" wrap="nowrap">
          <Grid item className="adminStudentBox_studentName">
            <p className="adminStudentBox_studentNameText">{name}</p>
          </Grid>
          <Grid item />
          <Link to="/profile">
            <IconContext.Provider
              value={{ className: "adminStudentBox_editIcon" }}
            >
              <VscEdit color={colorscheme.red4} />
            </IconContext.Provider>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Students;
