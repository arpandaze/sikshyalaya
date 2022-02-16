import React from "react";
import { Formik, Field, Form } from "formik";
import CustomButton from "../../components/CustomButton";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import "./statics/css/forgotPassword.css";
import { useHistory } from "react-router-dom";
import callAPI from "../../utils/API";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
});

const ForgotPassword = ({ setResetState }) => {
  const history = useHistory();
  const onSubmit = async (values) => {
    let data = {
      email: values.email,
    };
    let resp = await callAPI({
      endpoint: "/api/v1/auth/password-recovery",
      method: "POST",
      params: data,
    });
    if (resp.status == 200) {
      setResetState(4);
    }
  };

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className="forgotPassword_BoxContainer"
    >
      <Grid item>
        <h1 className="forgotPassword_label">Forgot Your Password?</h1>
      </Grid>
      <Grid item>
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
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
                  placeholder="Enter your email"
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
                <CustomButton
                  type="submit"
                  name="Reset Password"
                  addStyles="forgotPassword_Button"
                />
              </Grid>

              <Grid item>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item>
                    <div className="forgotPassword_line"></div>
                  </Grid>
                  <Grid item>
                    <p className="forgotPassword_lineOr">or</p>
                  </Grid>
                  <Grid item>
                    <div className="forgotPassword_line"></div>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item>
                <CustomButton
                  type="button"
                  onClick={() => {
                    history.push("/login");
                  }}
                  name="Back to Login"
                  addStyles="forgotPassword_loginButton"
                />
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </Grid>
    </Grid>
  );
};

export default ForgotPassword;
