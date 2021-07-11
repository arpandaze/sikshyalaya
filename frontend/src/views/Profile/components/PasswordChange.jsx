import React, { useContext } from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import callAPI from "../../../utils/API";
import CustomTextField from "./../../../components/CustomTextField";
import "./css/changePassword.css";
import CustomButton from "../../../components/CustomButton";
import { AlertContext } from "../../../components/DashboardLayout/AlertContext";

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
  const { alert, setAlert } = useContext(AlertContext);
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
      setAlert({
        severity: "success",
        message: "Password changed successfully, Logging out",
      });
      setTimeout(() => {
        setAlert(null);
      }, 2000);
    } else {
      setAlert({
        severity: "error",
        message: "Current Password does not match",
      });
      setTimeout(() => {
        setAlert(null);
      }, 2000);
    }
  };

  return (
    <div>
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
            {({ resetForm }) => (
              <Form>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justify="center"
                  className="changePw_formContainer"
                >
                  <Grid item xs={10}>
                    <CustomTextField
                      name="current_password"
                      type="password"
                      placeHolder="Current Password"
                      id="current_password"
                      addStyles="changePw_inputField"
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <CustomTextField
                      name="new_password"
                      type="password"
                      placeHolder="New Password"
                      id="new_password"
                      addStyles="changePw_inputField"
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <CustomTextField
                      name="confirm_password"
                      type="password"
                      placeHolder="Confirm Password"
                      id="confirm_password"
                      addStyles="changePw_inputField"
                    />
                  </Grid>
                  <Grid item>
                    <CustomButton
                      name="Save"
                      type="submit"
                      addStyles="changePw_button"
                    />
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </div>
  );
};

export default PasswordChange;
