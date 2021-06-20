import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import callAPI from "../../../utils/API";
import CustomTextField from "./../../../components/CustomTextField";
import "./css/changePassword.css";
import Button from "../../../components/Button";
import AlertMessage from "../../../components/AlertMessage";
import DelayedRedirect from "../../../components/DelayedRedirect";

const validationSchema = yup.object({
  current_password: yup
    .string("Enter your password")
    .required("Currrent password is required"),
  new_password: yup
    .string("Enter your password")
    .min(8, "Minimum 8 characters")
    .required("Password is required"),
  confirm_password: yup.string().when("new_password", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: yup
      .string()
      .oneOf([yup.ref("new_password")], "Both password need to be the same"),
  }),
});

const PasswordChange = () => {
  const [alert, setAlert] = useState(null);
  const onSubmit = async (value) => {
    let data = {
      current_password: value.current_password,
      new_password: value.new_password,
    };

    let resp = await callAPI({
      endpoint: "/api/v1/auth/change-password",
      method: "POST",
      data: data,
    });
    if (resp.status === 200) {
      setAlert(1);
    } else {
      setAlert(2);
    }
  };
  const renderAlert = () => {
    if (alert === 1) {
      return (
        <div>
          <AlertMessage
            severity="success"
            message="Password changed successfully, Logging out"
          />
          <DelayedRedirect timeout={4} to="/logout" />
        </div>
      );
    } else if (alert === 2) {
      return (
        <AlertMessage
          severity="error"
          message="Current Password does not match"
        />
      );
    }
  };

  return (
    <div>
      {renderAlert()}
      <Grid container direction="column" className="changePw_root">
        <Grid item>
          <Grid
            container
            direction="row"
            alignItems="center"
            className="changePw_topPart"
          >
            <Grid item>
              <p className="changePw_title">Change Your Password</p>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Formik
            enableReinitialize={true}
            initialValues={{
              current_password: "",
              new_password: "",
              confirm_password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <Grid
                container
                direction="column"
                alignItems="center"
                justify="center"
                className="changePw_formContainer"
              >
                <Grid item>
                  <CustomTextField
                    name="current_password"
                    type="password"
                    placeHolder="Current Password"
                    id="current_password"
                    addStyles="changePw_inputField"
                  />
                </Grid>
                <Grid item>
                  <CustomTextField
                    name="new_password"
                    type="password"
                    placeHolder="New Password"
                    id="new_password"
                    addStyles="changePw_inputField"
                  />
                </Grid>
                <Grid item>
                  <CustomTextField
                    name="confirm_password"
                    type="password"
                    placeHolder="Confirm Password"
                    id="confirm_password"
                    addStyles="changePw_inputField"
                  />
                </Grid>
                <Grid item>
                  <Button
                    name="Save"
                    type="submit"
                    addStyles="changePw_button"
                  />
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Grid>
      </Grid>
    </div>
  );
};

export default PasswordChange;
