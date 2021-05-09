import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import Button from "../../components/Button";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import logo from "../../assets/logo.png";
import Image from "../../components/Image";
import Login from "./Login";
import "./statics/css/reset.css";

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
const ResetPassword = () => {
  return (
    <Login>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className="resetCommon_resetBoxContainer"
      >
        <Grid item>
          <h1 className="resetCommon_label">Reset Password</h1>
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
                    id="password"
                    name="password"
                    placeholder="Password"
                    className="resetCommon_inputButton"
                  />
                </Grid>

                <Grid item spacing={10}>
                  <Field
                    type="password"
                    id="confirm_password"
                    name="confirm_password"
                    placeholder="Confirm Password"
                    className="resetCommon_inputButton"
                  />
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
                  <Button name="Reset" addStyles="resetCommon_resetButton" />
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
                      <div className="resetCommon_line"></div>
                    </Grid>
                    <Grid item>
                      <p
                        style={{
                          fontSize: "1.2em",
                        }}
                      >
                        or
                      </p>
                    </Grid>
                    <Grid item>
                      <div className="resetCommon_line"></div>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item spacing={10}>
                  <Button
                    name="Back to Login"
                    addStyles="resetCommon_guestButton"
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

export default ResetPassword;
