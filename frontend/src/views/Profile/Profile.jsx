import React from "react";
import { Formik, Field, Form } from "formik";
import Button from "../../components/Button";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import Image from "../../components/Image";
import profile from "../../assets/pp.jpg";
import colorscheme from "../../utils/colors";
import DashboardLayout from "../../components/DashboardLayout";
import "./statics/css/profile.css";

const styleSheet = {
  saveButton: {
    width: "200px",
    height: "50px",
    backgroundColor: colorscheme.red4,
    color: colorscheme.white,
    marginTop: "20px",
    position: "relative",
    left: "125%",
    fontSize: "1.2em",
    borderRadius: "15px",
  },
  image: {
    borderRadius: "50%",
    width: "200px",
    height: "200px",
    position: "relative",
    top: "60px",
    left: "30px",
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
              <Image
                src={profile}
                alt={profile}
                addStyles={styleSheet.image}
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
                    spacing={5}
                  >
                    <Grid item>
                      <Field
                        id="firstname"
                        name="firstname"
                        placeholder="First Name"
                        className="profile_inputButton"
                      />
                    </Grid>
                    <Grid item>
                      <Field
                        id="middlename"
                        name="middlename"
                        placeholder="Middle Name"
                        className="profile_middleInputButton"
                      />
                    </Grid>
                    <Grid item>
                      <Field
                        id="lastname"
                        name="lastname"
                        placeholder="Last Name"
                        className="profile_inputButton"
                      />
                    </Grid>
                    <Grid item>
                      <Field
                        id="email"
                        name="email"
                        placeholder="Email Address"
                        className="profile_longInputButton"
                      />
                    </Grid>
                    <Grid item>
                      <Field
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="profile_longInputButton"
                      />
                    </Grid>
                    <Grid item>
                      <Field
                        id="confirmpassword"
                        type="password"
                        name="confirmpassword"
                        placeholder="Confirm Password"
                        className="profile_longInputButton"
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
