import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import Button from "../../components/Button";
import theme from "../../utils/colors";
import * as yup from "yup";
import Tab from "../../components/Tab";
import StudentLoginBox from "./StudentLoginBox";
import TeacherLoginBox from "./TeacherLoginBox";
import Grid from "@material-ui/core/Grid";
import logo from "../../assets/logo.png";
import Image from "../../components/Image";

const styleSheet = {
  root: {
    flexGrow: "1",
  },
  logoBox: {
    width: "200px",
    position: "absolute",
    top: "50px",
    left: "150px",
  },
  copyrightText: {
    width: "250px",
    position: "absolute",
    left: "150px",
    bottom: "20px",
    fontSize: "0.8em",
  },
  loginBoxContainer: {
    minHeight: "100vh",
  },
  loginBox: {
    width: "450px",
    height: "600px",
  },
  loginLabel: {
    fontWeight: "normal",
    fontSize: "2.2em",
  },
  tabs: {
    display: "flex",
  },
  loginButton: {
    width: "400px",
    height: "65px",
    backgroundColor: theme.red4,
    color: theme.white,
    borderRadius: "15px",
    fontSize: "1.2em",
  },
  guestButton: {
    width: "400px",
    height: "65px",
    backgroundColor: theme.black,
    color: theme.white,
    borderRadius: "15px",
    fontSize: "1.2em",
  },
  inputButton: {
    outline: "none",
    border: "none",
    borderBottom: "2px solid " + theme.grey1,
    fontSize: "1.2em",
    background: "transparent",
  },
  inputLabel: { fontSize: "1.2em" },
  lineVertical: {
    width: "1px",
    height: "30px",
    backgroundColor: theme.grey2,
    margin: "0px auto",
  },
};

const Login = () => {
  const [active, setActive] = useState(0);
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      style={styleSheet.root}
    >
      <Grid item sm={4}>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
          spacing={0}
        >
          <Grid item style={styleSheet.logoBox}>
            <Image src={logo} alt={{ logo }} />
          </Grid>
          <Grid container item style={styleSheet.copyrightText}>
            <a>©2021 Sikshyalaya</a>
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm={4}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          style={styleSheet.loginBoxContainer}
        >
          <Grid item style={styleSheet.loginBox}>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              <Grid item>
                <Tab
                  name="Student"
                  active={active ? 0 : 1}
                  onButtonClick={() => {
                    setActive(active ? 0 : 0);
                  }}
                />
              </Grid>

              <Grid item>
                <div style={styleSheet.lineVertical}></div>
              </Grid>
              <Grid item>
                <Tab
                  name="Teacher"
                  active={active ? 1 : 0}
                  onButtonClick={() => {
                    setActive(active ? 1 : 1);
                  }}
                />
              </Grid>
            </Grid>
            <Grid
              container
              spacing={4}
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <h1 style={styleSheet.loginLabel}>Login</h1>
              </Grid>
            </Grid>

            {active ? <TeacherLoginBox /> : <StudentLoginBox />}
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm={4}></Grid>
    </Grid>
  );
};

export default Login;
