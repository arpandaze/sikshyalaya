import React from "react";
import { Formik, Field, Form } from "formik";
import Button from "../../components/Button";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import Image from "../../components/Image";
import profile from "../../assets/pp.jpg";
import DashboardLayout from "../../components/DashboardLayout";
import "./statics/css/profile.css";

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
        className="profile_root"
      >
        <Grid item className="profile_titleContainer">
          <h1 className="profile_activeTitle">Edit your Profile</h1>
        </Grid>
        <Grid item className="profile_profileBoxContainer">
          <Grid
            container
            direction="row"
            alignItems="flex-start"
            wrap="nowrap"
            className="profile_profileBox"
          >
            <Grid item xs={3} className="profile_imageContainer">
              <div className="profile_imageContainerOverlay"></div>
              <Image
                src={profile}
                alt={profile}
                addStyles="profile_image"
              ></Image>
            </Grid>
            <Grid item xs={9} className="profile_formBoxContainer">
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
                    className="profile_formBox"
                  >
                    <Grid item id="profile-box" className="profile_inputButton">
                      <Field
                        id="firstname"
                        name="firstname"
                        placeholder="First Name"
                      />
                    </Grid>
                    <Grid
                      item
                      id="profile-box"
                      className="profile_middleInputButton"
                    >
                      <Field
                        id="middlename"
                        name="middlename"
                        placeholder="Middle Name"
                      />
                    </Grid>
                    <Grid item id="profile-box" className="profile_inputButton">
                      <Field
                        id="lastname"
                        name="lastname"
                        placeholder="Last Name"
                      />
                    </Grid>
                    <Grid
                      item
                      id="profile-box"
                      className="profile_longInputButton"
                    >
                      <Field
                        id="email"
                        name="email"
                        placeholder="Email Address"
                      />
                    </Grid>
                    <Grid
                      item
                      id="profile-box"
                      className="profile_longInputButton"
                    >
                      <Field
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Password"
                      />
                    </Grid>
                    <Grid
                      item
                      id="profile-box"
                      className="profile_longInputButton"
                    >
                      <Field
                        id="confirmpassword"
                        type="password"
                        name="confirmpassword"
                        placeholder="Confirm Password"
                      />
                    </Grid>
                    <Grid item className="profileBox_saveButtonContainer">
                      <Button name="Save" addStyles="profileBox_saveButton" />
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
