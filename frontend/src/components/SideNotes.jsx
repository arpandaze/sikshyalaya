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
  root: {
    flexGrow: "1",
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
    position: "relative",
    top: "10px",
    left: "20px",
  },
  contentText: {
    width: "90%",
    height: "38%",
    cursor: "text",
    wordWrap: "normal",
    textAlign: "justify",
    overflow: "hidden",
    position: "relative",
    top: "16px",
    left: "20px",
  },
};

const SideNotes = ({ title, content, ...rest }) => {
  return (
    <Grid
      container
      direction="column"
      alignItems="flex-start"
      style={styleSheet.root}
      wrap="nowrap"
    >
      <Grid item>
        <div style={styleSheet.titleText}>{title}</div>
      </Grid>
      <Grid item>
        <div style={styleSheet.contentText}>{content}</div>
      </Grid>
    </Grid>
  );
};

export default SideNotes;
