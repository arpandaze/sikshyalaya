import React, { useState, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import logoLarge from "../../assets/logo-large.svg";
import Image from "../../components/Image";
import "./statics/css/login.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../utils/UserContext";
import { Redirect } from "react-router-dom";
import configs from "../../utils/configs";
import reactJoiValidation from "react-joi-validation";

const Login = (props) => {
  const [active, setActive] = useState(0);
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      alignContent="center"
      className="login_root"
      wrap="nowrap"
    >
      <Grid item className="login_logoBox">
        <Grid container direction="row" alignItems="flex-start">
          <Grid item className="login_logo">
            <Link to="/login">
              <Image
                src={logoLarge}
                alt="Sikshyalaya"
                addStyles="login_image"
              />
            </Link>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="center"
          className="login_loginBoxContainer"
        >
          <Grid item>{props.children}</Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
