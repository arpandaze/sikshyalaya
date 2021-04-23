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
    position: "relative",
    left: "0%",
    top: "20%",
  },

  line: {
    backgroundColor: colorscheme.grey1,
    opacity: "30%",
    position: "relative",
    left: "40px",
    top: "-65px",
    width: "550px",
    height: "2px",
  },
  notepad: {
    width: "750px",
    height: "800px",
    left: "10vh",
    background: colorscheme.white,
    borderRadius: "20px",
    boxShadow: "2px 2px 10px -3px rgba(0,0,0,0.2)",
  },
  contentTextContainer: {
    width: "85%",
    textAlign: "justify",
  },
  titleText: {
    position: "relative",
    left: "20%",
    fontWeight: "bold",
    fontSize: "1.7em",
    cursor: "text",
  },
  contentText: {
    position: "relative",
    left: "7%",
    top: "-40px",
    width: "100%",
    cursor: "text",
    wordWrap: "normal",
  },
  closeButton: {
    position: "absolute",
    top: "20%",
    left: "650px",
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    color: colorscheme.red4,
    cursor: "pointer",
  },
  trashButton: {
    position: "absolute",
    top: "93%",
    left: "700px",
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    color: colorscheme.red4,
    cursor: "pointer",
  },
};

const Note = ({ title, content, state, ...rest }) => {
  return (
    <div>
      <Grid
        container
        direction="row"
        justify="flex-end"
        align="flex-end"
        style={styleSheet.root}
      >
        <div style={styleSheet.notepad}>
          <Grid
            item
            xs={4}
            direction="row"
            justify="flex-end"
            alignItems="flex-end"
          >
            <a style={styleSheet.titleText}>
              <br />
              {title}
              <Grid
                xs={2}
                direction="column"
                justify="flex-end"
                alignItems="flex-end"
              >
                <div style={styleSheet.closeButton}>
                  <ImCross size={20} color={colorscheme.red4} />
                </div>
              </Grid>
              <br />
              <br />
            </a>
            <Grid item direction="row" justify="center" alignItems="flex-start">
              <div style={styleSheet.line}></div>
            </Grid>
          </Grid>
          <Grid item style={styleSheet.contentTextContainer}>
            <a style={styleSheet.contentText}>{content}</a>
          </Grid>
          <Grid
            xs={8}
            direction="column"
            justify="flex-center"
            alignItems="flex-center"
          >
            <div style={styleSheet.trashButton}>
              <FiTrash size={20} color={colorscheme.red4} />
            </div>
          </Grid>
        </div>
      </Grid>
    </div>
  );
};

export default Note;
