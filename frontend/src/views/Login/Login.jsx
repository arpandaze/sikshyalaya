import React, { useState, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import logoLarge from "../../assets/logo-large.svg";
import Image from "../../components/Image";
import "./statics/css/login.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../utils/Contexts/UserContext";
import { Redirect } from "react-router-dom";
import configs from "../../utils/configs";

const Login = (props) => {
  const { user, setUser } = useContext(UserContext);
  return (
    <div className="login_root">
      {user == null || !configs.AUTO_REDIRECT ? (
        <Grid container direction="column">
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
          <Grid item className="login_loginBoxContainer">
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
            >
              <Grid item>{props.children}</Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : user.id ? (
        <Redirect
          to={{
            pathname: "/landing",
          }}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Login;
