import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import Button from "../../components/Button";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import Login from "./Login";
import "./statics/css/reset.css";
import callAPI from "../../utils/API";
import { Redirect, useHistory } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";

const validationSchema = yup.object({
  password: yup
    .string("Enter your password")
    .min(4, "Minimum 4 characters")
    .required("Password is required"),
  confirm_password: yup.string().when("password", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: yup
      .string()
      .oneOf([yup.ref("password")], "Both password need to be the same"),
  }),
});

const ResetPassword = () => {
  const states = {
    error: 1,
    reset_success: 2,
    send_email: 3,
    reset_email_success: 4,
  };

  const history = useHistory();

  const [resetState, setResetState] = useState(null);
  const [resetToken, setResetToken] = useState(null);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    let token = urlParams.get("token");

    if (token === null) {
      setResetState(states.send_email);
    } else {
      setResetToken(token);
    }
  }, [resetToken]);

  const onPasswordsSubmit = async (values) => {
    if (resetToken === null) {
      setResetState(states.error);
    } else {
      let data = {
        token: resetToken,
        new_password: values.password,
      };

      let resp = await callAPI({
        endpoint: "/api/v1/auth/reset-password",
        method: "POST",
        data: data,
      });

      if (resp.status === 200) {
        setResetState(states.reset_success);
      }
    }
  };
  return (
    <Login>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className="resetCommon_resetBoxContainer"
      >
        {resetState == null ? (
          <>
            <Grid item>
              <h1 className="resetCommon_label">Reset Password</h1>
            </Grid>
            <Grid item>
              <Formik
                initialValues={{
                  password: "",
                  confirm_password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={onPasswordsSubmit}
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
                        type="password"
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
                    <Grid item>
                      <Button
                        type="submit"
                        name="Reset"
                        addStyles="resetCommon_resetButton"
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
                          <div className="resetCommon_line"></div>
                        </Grid>
                        <Grid item>
                          <p
                            style={{
                              margin: "0px",
                              padding: "0px",
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
                    <Grid item>
                      <Button
                        type="button"
                        onClick={() => {
                          history.push("/login");
                        }}
                        name="Back to Login"
                        addStyles="resetCommon_guestButton"
                      />
                    </Grid>
                  </Grid>
                </Form>
              </Formik>
            </Grid>
          </>
        ) : resetState == states.reset_success ? (
          <h1>Password has been reset successfully!</h1>
        ) : resetState == states.reset_email_success ? (
          <h1>Password reset email has been sent!</h1>
        ) : resetState == states.send_email ? (
          <ForgotPassword setResetState={(state) => setResetState(state)} />
        ) : (
          <h1>Valid token not found!</h1>
        )}
      </Grid>
    </Login>
  );
};

export default ResetPassword;
