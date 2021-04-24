import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import { Route, Switch, Redirect } from "react-router-dom";
import Button from "../../components/Button";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import Image from "../../components/Image";
import profile from "../../assets/pp.jpg";
import colorscheme from "../../utils/colors";
import DashboardLayout from "../../components/DashboardLayout";

const styleSheet = {
  root: {
    width: "95%",
    height: "100vh",
    margin: "0px auto",
    position: "relative",
    left: "-20px",
    flexGrow: "1",
  },
  inputButton: {
    outline: "none",
    width: "340px",
    height: "50px",
    border: "1px solid " + colorscheme.grey2,
    fontSize: "1.3em",
    background: colorscheme.white,
  },
  imageContainer: {
    position: "relative",
    height: "800px",
  },
  image: {
    borderRadius: "50%",
    width: "200px",
    height: "200px",
    position: "relative",
    top: "60px",
    left: "30px",
  },
  titleContainer: {
    width: "1300px",
    margin: "0px auto",
    position: "relative",
    top: "50px",
  },
  activeTitle: {
    display: "inline-block",
    marginBottom: "20px",
  },
  formBoxContainer: {
    height: "800px",
    border: "1px solid black",
  },
  formBox: {
    width: "100%",
    margin: "0px",
  },
  profileBoxContainer: {
    width: "1300px",
    height: "800px",
    margin: "0px auto",
    position: "relative",
    top: "50px",
  },
  profileBox: {
    borderRadius: "25px",
    background: colorscheme.white,
    boxShadow: "2px 2px 10px -3px rgba(0,0,0,0.2)",
  },
  saveButton: {
    width: "300px",
    height: "50px",
    backgroundColor: colorscheme.red4,
    color: colorscheme.white,
    borderRadius: "15px",
    fontSize: "1.2em",
  },
};

const validationSchema = yup.object({
  firstName: yup.string("Enter your name").required("First Name is required"),
  lastName: yup
    .string("Enter your Last Name")
    .required("Last Name is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Minimum 8 characters")
    .required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match")
    .required("Password confirmation is required!"),
});

const Profile = () => {
  return (
    <DashboardLayout>
      <Grid
        container
        direction="column"
        alignItems="flex-start"
        justify="flex-start"
        wrap="nowrap"
        style={styleSheet.root}
      >
        <Grid item style={styleSheet.titleContainer}>
          <h1 style={styleSheet.activeTitle}>Edit your Profile</h1>
        </Grid>
        <Grid item style={styleSheet.profileBoxContainer}>
          <Grid
            container
            direction="row"
            alignItems="flex-start"
            wrap="nowrap"
            style={styleSheet.profileBox}
          >
            <Grid item xs={3} style={styleSheet.imageContainer}>
              <Image
                src={profile}
                alt={profile}
                addStyles={styleSheet.image}
              ></Image>
            </Grid>
            <Grid item xs={9} style={styleSheet.formBoxContainer}>
              <Formik
                initialValues={{
                  firstName: "",
                  middleName: "",
                  lastName: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                }}
                validationSchema={validationSchema}
              >
                <Form>
                  <Grid
                    container
                    direction="row"
                    alignItems="flex-start"
                    style={styleSheet.formBox}
                    spacing={5}
                  >
                    <Grid item>
                      <Field
                        id="firstname"
                        name="firstname"
                        placeholder="First Name"
                        style={styleSheet.inputButton}
                      />
                    </Grid>
                    <Grid item>
                      <Field
                        id="middlename"
                        name="middlename"
                        placeholder="Middle Name"
                        style={styleSheet.inputButton}
                      />
                    </Grid>
                    <Grid item>
                      <Field
                        id="lastname"
                        name="lastname"
                        placeholder="Last Name"
                        style={styleSheet.inputButton}
                      />
                    </Grid>
                    <Grid item>
                      <Field
                        id="email"
                        name="email"
                        placeholder="Email Address"
                        style={styleSheet.inputButton}
                      />
                    </Grid>
                    <Grid item>
                      <Field
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        style={styleSheet.inputButton}
                      />
                    </Grid>
                    <Grid item>
                      <Field
                        id="confirmpassword"
                        type="password"
                        name="confirmpassword"
                        placeholder="Confirm Password"
                        style={styleSheet.inputButton}
                      />
                    </Grid>
                    <Grid item>
                      <Button name="Save" colorStyles={styleSheet.saveButton} />
                    </Grid>
                  </Grid>
                </Form>
              </Formik>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default Profile;
