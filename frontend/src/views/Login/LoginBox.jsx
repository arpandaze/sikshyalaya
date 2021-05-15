import React, { useEffect, useContext } from "react";
import { Formik, Field, Form } from "formik";
import Button from "../../components/Button";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import Login from "./Login";
import "./statics/css/loginCommon.css";
import axios from "axios";
import Checkbox from "../../components/Checkbox";
import configs from "../../utils/configs";
import { get, set } from "idb-keyval";
import { UserContext } from "../../utils/UserContext";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { getReq, postReq } from "../../utils/API";

const validationSchema = yup.object({
    email: yup
        .string("Enter your email")
        .email("Enter a valid email")
        .required("Email is required"),
    password: yup
        .string("Enter your password")
        .min(4, "Minimum 4 characters")
        .required("Password is required"),
});
const StudentLoginBox = () => {
    const { user, setUser } = useContext(UserContext);
    const onSubmit = async (values) => {
        let data = {
            username: values.email,
            password: values.password,
            remember_me: values.remember_me,
        };

        let resp = await postReq("/api/v1/auth/web", data);
        if (resp.status === 200) {
            setUser(resp.data);
        } else {
            throw "Login failed!";
        }
    };
    return (
        <div>
            {!user || !configs.AUTO_REDIRECT ? (
                <Login>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                        className="loginCommon_loginBoxContainer"
                    >
                        <Grid item>
                            <h1 className="loginCommon_label">Login</h1>
                        </Grid>
                        <Grid item>
                            <Formik
                                initialValues={{
                                    email: "",
                                    password: "",
                                    remember_me: false,
                                }}
                                validationSchema={validationSchema}
                                onSubmit={onSubmit}
                            >
                                <Form>
                                    <Grid
                                        container
                                        spacing={3}
                                        direction="column"
                                        alignItems="flex-start"
                                    >
                                        <Grid item>
                                            <Field
                                                id="email"
                                                name="email"
                                                placeholder="Email"
                                                className="loginCommon_inputButton"
                                            />
                                        </Grid>

                                        <Grid item>
                                            <Field
                                                type="password"
                                                id="password"
                                                name="password"
                                                placeholder="Password"
                                                className="loginCommon_inputButton"
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            className="loginCommon_rememberMeCheckContainer"
                                        >
                                            <Checkbox
                                                name="remember_me"
                                                value="remember_me"
                                            />
                                            <label htmlFor="remember_me">
                                                Remember me
                                            </label>
                                        </Grid>
                                    </Grid>
                                    <Grid
                                        container
                                        spacing={3}
                                        direction="column"
                                        justify="center"
                                        alignItems="center"
                                    >
                                        <Grid item>
                                            <Button
                                                type="submit"
                                                name="Login"
                                                addStyles="loginCommon_loginButton"
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Grid
                                                container
                                                direction="row"
                                                justify="center"
                                                alignItems="center"
                                            >
                                                <Grid item>
                                                    <div className="loginCommon_line"></div>
                                                </Grid>
                                                <Grid item>
                                                    <p
                                                        style={{
                                                            fontSize: "1.2em",
                                                            margin: "0px",
                                                            padding: "0px",
                                                        }}
                                                    >
                                                        or
                                                    </p>
                                                </Grid>
                                                <Grid item>
                                                    <div className="loginCommon_line"></div>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <Button
                                                type="button"
                                                name="Continue as Guest"
                                                addStyles="loginCommon_guestButton"
                                            />
                                        </Grid>
                                    </Grid>
                                </Form>
                            </Formik>
                        </Grid>
                    </Grid>
                </Login>
            ) : (
                <Redirect
                    to={{
                        pathname: "/landing",
                    }}
                />
            )}
        </div>
    );
};

export default StudentLoginBox;
