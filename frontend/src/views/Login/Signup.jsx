import React, { useEffect, useContext, useState } from "react";
import { Formik, Form } from "formik";
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
import { UserContext } from "../../utils/Contexts/UserContext";
import { Redirect, useHistory } from "react-router-dom";
import { getReq, postReq } from "../../utils/API";
import { Link } from "react-router-dom";
import colorscheme from "../../utils/colors";
import CustomTextField from "./../../components/CustomTextField";

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
    .email("Enter a valid email!")
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
  const history = useHistory();
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
                  <CustomTextField
                    name="first_name"
                    type="text"
                    placeHolder="First Name"
                    id="first_name"
                    addStyles="signup_inputButton"
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomTextField
                    name="middle_name"
                    type="text"
                    placeHolder="Middle Name"
                    id="middle_name"
                    addStyles="signup_inputButton"
                  />
                </Grid>
                <Grid item xs={6} style={{ padding: "0px 20px 0px 0px" }}>
                  <CustomTextField
                    name="last_name"
                    type="text"
                    placeHolder="Last Name"
                    id="last_name"
                    addStyles="signup_inputButton"
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomTextField
                    name="address"
                    type="text"
                    placeHolder="Address"
                    id="address"
                    addStyles="signup_inputButton"
                  />
                </Grid>
                <Grid item xs={6} style={{ padding: "0px 20px 0px 0px" }}>
                  <CustomTextField
                    name="program"
                    type="text"
                    placeHolder="Program"
                    id="program"
                    addStyles="signup_inputButton"
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomTextField
                    name="semester"
                    type="text"
                    placeHolder="Semester"
                    id="semester"
                    addStyles="signup_inputButton"
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
                  <CustomTextField
                    name="email"
                    type="text"
                    placeHolder="Email"
                    id="email"
                    addStyles="signup_inputButton"
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    name="password"
                    type="password"
                    placeHolder="Password"
                    id="password"
                    addStyles="signup_inputButton"
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    name="confirm_password"
                    type="password"
                    placeHolder="Confirm Password"
                    id="confirm_password"
                    addStyles="signup_inputButton"
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
          justify="center"
          alignItems="center"
        >
          <p>Already have an account?</p>
          <p
            onClick={() => {
              history.push("/login");
            }}
            style={{
              cursor: "pointer",
              textDecoration: "none",
              color: colorscheme.red4,
              margin: "1em 1em 1em 0.1em",
            }}
          >
            Login
          </p>
        </Grid>
      </Grid>
    </Login>
  );
};

export default Signup;
