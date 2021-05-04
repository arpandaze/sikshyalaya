import React, { useState } from "react";
import Tab from "../../components/Tab";
import StudentLoginBox from "./StudentLoginBox";
import TeacherLoginBox from "./TeacherLoginBox";
import Grid from "@material-ui/core/Grid";
import logo from "../../assets/logo.png";
import Image from "../../components/Image";
import "./statics/css/login.css";

const Login = () => {
  const [active, setActive] = useState(0);
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className="root"
    >
      <Grid item sm={4}>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
          spacing={0}
        >
          <Grid item className="logoBox">
            <Image src={logo} alt={{ logo }} />
          </Grid>
          <Grid container item className="copyrightText">
            <p>©2021 Sikshyalaya</p>
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm={4}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          className="loginBoxContainer"
        >
          <Grid item className="loginBox">
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
                <div className="lineVertical"></div>
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
                <h1 className="loginLabel">Login</h1>
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
