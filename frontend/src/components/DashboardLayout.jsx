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
import Dashboard from "../views/Dashboard/Dashboard";

const styleSheet = {
  root: {
    flexGrow: "1",
    width: "100vw",
    maxWidth: "1920px",
    margin: "0px auto",
    border: "1px solid black",
  },
  sideBar: {
    height: "100vh",
    border: "1px solid black",
  },
  mainArea: {
    height: "100vh",
    position: "relative",
    border: "1px solid black",
  },
  profileBar: {
    height: "100vh",
    cursor: "pointer",
    border: "1px solid black",
  },
};

const DashboardLayout = ({ children }) => {
  return (
    <Grid container direction="row" style={styleSheet.root}>
      <Grid xs={1} item style={styleSheet.sideBar}>
        <SideBar />
      </Grid>
      <Grid xs={8} item style={styleSheet.mainArea}>
        {/* {children} */}
      </Grid>
      <Grid xs={3} item style={styleSheet.profileBar}>
        <ProfileBar />
      </Grid>
    </Grid>
  );
};

export default DashboardLayout;
