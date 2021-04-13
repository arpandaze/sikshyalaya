import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import { Route, Switch, Redirect } from "react-router-dom";
import Button from "../../components/Button";
import theme from "../../utils/colors";
import * as yup from "yup";
import Tab from "../../components/Tab";
import Grid from "@material-ui/core/Grid";
import Image from "../../components/Image";
import SideBar from "../../components/SideBar";

const styleSheet = {
  sideBar: {
    height: "100vh",
    boxShadow: "2px 2px 13px -3px rgba(0,0,0,0.32)",
  },
  mainArea: { height: "100vh" },
  notification: {
    height: "100vh",
    border: "1px solid black",
  },
};

const Dashboard = () => {
  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="center"
      style={styleSheet.root}
    >
      <Grid item xs={1} style={styleSheet.sideBar}>
        <SideBar style={styleSheet.sideBar} />
      </Grid>
      <Grid item xs={9} style={styleSheet.mainArea}></Grid>
      <Grid item xs={2} style={styleSheet.notification}></Grid>
    </Grid>
  );
};

export default Dashboard;
