import React from "react";
import { Formik, Field, Form } from "formik";
import Button from "../../components/Button";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import "./statics/css/loginCommon.css";
import Login from "./Login";

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
    return (
        <Login>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                className="loginCommon_loginBoxContainer"
            >
                <Grid item>
                    <Formik
                        initialValues={{
                            email: "",
                            password: "",
                        }}
                        validationSchema={validationSchema}
                        //   onSubmit={async (values) => {
                        //     await new Promise((r) => setTimeout(r, 500));
                        //     alert(JSON.stringify(values, null, 2));
                        //   }}
                    >
                        <Form>
                            <Grid
                                container
                                spacing={5}
                                direction="column"
                                alignItems="flex-start"
                            >
                                <Grid item spacing={10}>
                                    <Field
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                        className="loginCommon_inputButton"
                                    />
                                </Grid>

                                <Grid item spacing={10}>
                                    <Field
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="Password"
                                        className="loginCommon_inputButton"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <input
                                        type="checkbox"
                                        value="lsRememberMe"
                                        id="rememberMe"
                                    />
                                    <label for="rememberMe">Remember me</label>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                spacing={5}
                                direction="column"
                                justify="center"
                                alignItems="center"
                            >
                                <Grid item spacing={10}>
                                    <Button
                                        name="Login"
                                        className="loginCommon_loginButton"
                                    />
                                </Grid>
                                <Grid item spacing={10}>
                                    <Grid
                                        container
                                        spacing={2}
                                        direction="row"
                                        justify="center"
                                        alignItems="center"
                                    >
                                        <Grid item>
                                            <div className="loginCommon_line"></div>
                                        </Grid>
                                        <Grid item>
                                            <p style={{ fontSize: "1.2em" }}>
                                                or
                                            </p>
                                        </Grid>
                                        <Grid item>
                                            <div className="loginCommon_line"></div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item spacing={10}>
                                    <Button
                                        name="Conitnue as Guest"
                                        className="loginCommon_guestButton"
                                    />
                                </Grid>
                            </Grid>
                        </Form>
                    </Formik>
                </Grid>
            </Grid>
        </Login>
    );
};

export default StudentLoginBox;
