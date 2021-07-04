import React from "react";
import { Formik, Field, Form } from "formik";
import CustomButton from "../../components/CustomButton";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import colorscheme from "../../utils/colors";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import "./statics/css/adminForm.css";

const styleSheet = {
  saveButton: {
    width: "200px",
    height: "50px",
    backgroundColor: colorscheme.red4,
    color: colorscheme.white,
    marginTop: "60px",
    position: "relative",
    fontSize: "1.2em",
    borderRadius: "15px",
  },
};

const studentName = "Yugesh Luitel CS 2019";

const program = [
  {
    id: 1,
    name: "Department of Computer Science and Engineering",
  },
  {
    id: 2,
    name: "Department of Mechanical Engineering",
  },
];

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
  address: yup.string("Enter your address").required("Address is required"),
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
        className="root"
      >
        <Grid item className="titleContainer">
          <h1 className="activeTitle">{studentName}</h1>
        </Grid>
        <Grid item className="profileBoxContainer">
          <Grid
            container
            direction="row"
            alignItems="center"
            wrap="nowrap"
            className="profileBox"
          >
            <Grid item className="formBoxContainer">
              <Formik
                initialValues={{
                  firstName: "",
                  middleName: "",
                  lastName: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                  address: "",
                }}
                validationSchema={validationSchema}
              >
                <Form>
                  <Grid
                    container
                    direction="row"
                    alignItems="flex-start"
                    className="formBox"
                    spacing={4}
                  >
                    <Grid item xs={6}>
                      <Field
                        id="firstname"
                        name="firstname"
                        placeholder="First Name"
                        className="inputButton"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        id="middlename"
                        name="middlename"
                        placeholder="Middle Name"
                        className="inputButton"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        id="lastname"
                        name="lastname"
                        placeholder="Last Name"
                        className="inputButton"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        id="email"
                        name="email"
                        placeholder="Email Address"
                        className="inputButton"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="inputButton"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        id="confirmpassword"
                        type="password"
                        name="confirmpassword"
                        placeholder="Confirm Password"
                        className="inputButton"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        id="address"
                        name="address"
                        placeholder="Address"
                        className="inputButton"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        as="select"
                        name="department"
                        className="optionBox"
                      >
                        {program.map((item) => (
                          <option value={item.name} className="optionList">
                            {item.name}
                          </option>
                        ))}
                      </Field>
                    </Grid>
                    <Grid item className="buttonContainer">
                      <CustomButton
                        name="Save"
                        colorStyles={styleSheet.saveButton}
                      />
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
