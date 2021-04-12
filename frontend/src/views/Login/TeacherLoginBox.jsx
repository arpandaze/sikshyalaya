import { Formik, Field, Form } from "formik";
import Button from "../../components/Button";
import theme from "../../utils/colors";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";

import React from "react";

const styleSheet = {
  loginButton: {
    width: "300px",
    height: "50px",
    backgroundColor: theme.red4,
    color: theme.white,
    borderRadius: "15px",
    fontSize: "1.2em",
  },
  guestButton: {
    width: "300px",
    height: "50px",
    backgroundColor: theme.black,
    color: theme.white,
    borderRadius: "15px",
    fontSize: "1.2em",
  },
  inputButton: {
    outline: "none",
    border: "none",
    width: "300px",
    height: "50px",
    borderBottom: "1px solid " + theme.grey2,
    fontSize: "1.3em",
    background: "transparent",
  },
  line: {
    width: "130px",
    height: "1px",
    backgroundColor: theme.grey1,
    margin: "0px auto",
  },
  inputLabel: { fontSize: "1.2em" },
};
const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(4, "Minimum 4 characters")
    .required("Password is required"),
  classCode: yup
    .string("Enter the Class Code")
    .min(6, "Minimum 6 characters")
    .required("Class Code is required"),
});
const TeacherLoginBox = () => {
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={styleSheet.loginBoxContainer}
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
              justify="center"
              alignItems="center"
            >
              <Grid item spacing={10}>
                <Field
                  id="email"
                  name="email"
                  placeholder="Email"
                  style={styleSheet.inputButton}
                />
              </Grid>

              <Grid item spacing={10}>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  style={styleSheet.inputButton}
                />
              </Grid>

              <Grid item spacing={10}>
                <Field
                  type="classCode"
                  id="classCode"
                  name="classCode"
                  placeholder="Class Code"
                  style={styleSheet.inputButton}
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
                <Button name="Login" colorStyles={styleSheet.loginButton} />
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
                    <div style={styleSheet.line}></div>
                  </Grid>
                  <Grid item>
                    <a style={{ fontSize: "1.2em" }}>or</a>
                  </Grid>
                  <Grid item>
                    <div style={styleSheet.line}></div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item spacing={10}>
                <Button
                  name="Conitnue as Guest"
                  colorStyles={styleSheet.guestButton}
                />
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </Grid>
    </Grid>
  );
};

export default TeacherLoginBox;
