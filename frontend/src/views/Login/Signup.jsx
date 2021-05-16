import React, { useEffect, useContext, useState } from "react";
import { Formik, Field, Form } from "formik";
import Button from "../../components/Button";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import Login from "./Login";
import "./statics/css/signup.css";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import Checkbox from "../../components/Checkbox";
import configs from "../../utils/configs";
import { get, set } from "idb-keyval";
import { UserContext } from "../../utils/UserContext";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { getReq, postReq } from "../../utils/API";
import { Link } from "react-router-dom";
import colorscheme from "../../utils/colors";

const validationSchema = yup.object({
  first_name: yup.string("Enter your name").required("First Name is required"),
  middle_name: yup.string("Enter your Middle Name"),
  last_name: yup
    .string("Enter your Last Name")
    .required("Last Name is required"),
  join_year: yup.string("Enter Joined Year").required("Join year is required"),
  dob: yup.string("Enter Date of Birth").required("Date of Birth is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Minimum 8 characters")
    .required("Password is required"),
  confirm_password: yup.string().when("password", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: yup
      .string()
      .oneOf([yup.ref("password")], "Both password need to be the same"),
  }),
});
const Signup = () => {
  return (
    <Login>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className="signup_container"
      >
        <Grid item>
          <h1 className="signup_label">Signup</h1>
        </Grid>
        <Grid item>
          <Formik
            initialValues={{
              first_name: "",
              middle_name: "",
              last_name: "",
              join_year: "",
              dob: "",
              email: "",
              password: "",
              confirm_password: "",
            }}
            validationSchema={validationSchema}
          >
            <Form>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                className="signup_formContainer"
              >
                <Grid item xs={6} style={{ padding: "0px 20px 0px 0px" }}>
                  <Field
                    type="text"
                    id="first_name"
                    name="name"
                    placeholder="First Name"
                    className="signup_inputButton"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    type="text"
                    id="middle_name"
                    name="middle_name"
                    placeholder="Middle Name"
                    className="signup_inputButton"
                  />
                </Grid>
                <Grid item xs={6} style={{ padding: "0px 20px 0px 0px" }}>
                  <Field
                    type="text"
                    id="last_name"
                    name="last_name"
                    placeholder="Last Name"
                    className="signup_inputButton"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Address"
                    className="signup_inputButton"
                  />
                </Grid>
                <Grid item xs={6} style={{ padding: "0px 20px 0px 0px" }}>
                  <Field
                    type="text"
                    id="program"
                    name="program"
                    placeholder="Program Name"
                    className="signup_inputButton"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    type="text"
                    id="semester"
                    name="semester"
                    placeholder="Semester(I/II)"
                    className="signup_inputButton"
                  />
                </Grid>
                <Grid item xs={6} style={{ padding: "0px 20px 0px 0px" }}>
                  <TextField
                    id="join_year"
                    label="Join year"
                    type="date"
                    defaultValue=""
                    className="signup_inputButton"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="dob"
                    label="Birth Date"
                    type="date"
                    defaultValue=""
                    className="signup_inputButton"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Email"
                    className="signup_inputButton"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    className="signup_inputButton"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    type="password"
                    id="confirm_password"
                    name="confirm_password"
                    placeholder="Confirm Password"
                    className="signup_inputButton"
                  />
                </Grid>
                <Grid item>
                  <Button
                    type="button"
                    name="Signup"
                    addStyles="signup_button"
                  />
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Grid>
        <Grid
          container
          item
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          <p>Already have an account?</p>
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              color: colorscheme.red4,
              margin: "1em 1em 1em 0.1em",
            }}
          >
            Login
          </Link>
        </Grid>
      </Grid>
    </Login>
  );
};

export default Signup;
