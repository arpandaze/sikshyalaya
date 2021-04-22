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
import { FiTrash } from "react-icons/fi";

const styleSheet = {
  container: {
    width: "400px",
    height: "220px",
    background: colorscheme.white,
    borderRadius: "20px",
    boxShadow: "2px 2px 10px -3px rgba(0,0,0,0.2)",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: "1.7em",
    cursor: "text",
  },
  contentText: {
    width: "100%",
    cursor: "text",
    wordWrap: "normal",
  },
  root: {
    flexGrow: "1",
  },
};

const SideNotes = ({ title, content, ...rest }) => {
  return (
    <div style={styleSheet.container}>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        style={styleSheet.root}
      >
        <Grid item xs={7}>
          <div style={styleSheet.titleText}>{title}</div>
        </Grid>
        <Grid item>
          <div style={styleSheet.contentText}>{content}</div>
        </Grid>
      </Grid>
    </div>
  );
};

export default SideNotes;
