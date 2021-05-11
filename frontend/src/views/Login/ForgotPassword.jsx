import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import Button from "../../components/Button";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import Login from "./Login";
import "./statics/css/forgotPassword.css";

const validationSchema = yup.object({
    email: yup
        .string("Enter your email")
        .email("Enter a valid email")
        .required("Email is required"),
});
const ForgotPassword = () => {
    return (
        <Login>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                className="forgotPassword_BoxContainer"
            >
                <Grid item>
                    <h1 className="forgotPassword_label">Confirm Email</h1>
                </Grid>
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
                                        id="text"
                                        name="text"
                                        placeholder="Enter your Email"
                                        className="forgotPassword_inputButton"
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                direction="column"
                                justify="center"
                                alignItems="center"
                            >
                                <Grid item xs={12}>
                                    <Button
                                        name="Confirm your Email"
                                        addStyles="forgotPassword_Button"
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

export default ForgotPassword;
