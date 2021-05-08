import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import logo from "../../assets/logo.png";
import Image from "../../components/Image";
import "./statics/css/login.css";

const Login = (props) => {
  const [active, setActive] = useState(0);
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className="login_root"
    >
      <Grid item xs={4}>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
          spacing={0}
        >
          <Grid item className="login_logoBox">
            <Image src={logo} alt={{ logo }} />
          </Grid>
          <Grid container item className="login_copyrightContainer">
            <p className="login_copyrightText">©2021 Sikshyalaya</p>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          className="login_loginBoxContainer"
        >
          <Grid item className="login_loginBox">
            <Grid
              container
              spacing={4}
              direction="row"
              justify="center"
              alignItems="center"
            >
              {props.children}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4}></Grid>
    </Grid>
  );
};

export default Login;
