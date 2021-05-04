import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import { Route, Switch, Redirect } from "react-router-dom";
import Button from "../components/Button";
import * as yup from "yup";
import Tab from "../components/Tab";
import Grid from "@material-ui/core/Grid";
import Image from "../components/Image";
import profile from "../assets/pp.jpg";
import SideBar from "../components/SideBar";
import colorscheme from "../utils/colors";
import ProfileBar from "../components/ProfileBar";
import DashboardLayout from "../components/DashboardLayout";
import { ImCross } from "react-icons/im";
import { VscEdit } from "react-icons/vsc";
import { Link } from "react-router-dom";

const styleSheet = {
  root: {
    flexGrow: "1",
    width: "560px",
    height: "70px",
    background: colorscheme.white,
    borderRadius: "10px",
    boxShadow: "2px 2px 10px -3px rgba(0,0,0,0.2)",
    cursor: "pointer",
    color: colorscheme.black,
  },
  innerContainer: {
    overflow: "hidden",
    height: "80%",
    position: "relative",
    top: "8%",
  },
  studentName: {
    fontWeight: "500",
    fontSize: "1.3em",
    position: "relative",
    top: "15px",
    left: "5%",
    width: "75%",
    maxHeight: "30%",
  },

  editIcon: {
    position: "relative",
    top: "15px",
    left: "90px",
  },
};

const Students = ({ name, ...rest }) => {
  return (
    <Grid container direction="column" style={styleSheet.root}>
      <Grid item style={styleSheet.innerContainer}>
        <Grid container direction="row" alignItems="flex-start" wrap="nowrap">
          <Grid item style={styleSheet.studentName}>
            <a>{name}</a>
          </Grid>
          <Grid item />
          <Link to="/profile">
            <VscEdit
              size={25}
              color={colorscheme.red4}
              style={styleSheet.editIcon}
            />
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Students;
