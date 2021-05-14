import React, { useState, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import logo from "../../assets/logo.png";
import Image from "../../components/Image";
import "./statics/css/login.css";
import { UserContext } from "../../utils/UserContext";
import { Redirect } from "react-router-dom";
import configs from "../../utils/configs";

const Login = (props) => {
    const [active, setActive] = useState(0);
    return (
        <Grid
            container
            direction="column"
            alignItems="center"
            alignContent="center"
            className="login_root"
        >
            <Grid item className="login_logoBox">
                <Grid container direction="row" alignItems="flex-start">
                    <Grid item className="login_logo">
                        <Image
                            src={logo}
                            alt="Sikshyalaya"
                            addStyles="login_image"
                        />
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
            <Grid item>
                <p className="login_copyrightText">©2021 Sikshyalaya</p>
            </Grid>
        </Grid>
    );
};

export default Login;
