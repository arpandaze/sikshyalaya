import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import Button from "../../components/Button";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import logo from "../../assets/logo.png";
import axios from "axios";
import configs from "../../utils/configs";
import {get, set} from "idb-keyval";
import Image from "../../components/Image";
import Login from "./Login";
import "./statics/css/reset.css";

const validationSchema = yup.object({
  password: yup
    .string("Enter your password")
    .min(4, "Minimum 4 characters")
    .required("Password is required"),
  confirm_password: yup
    .string()
    .when("password", {
    is: val => (val && val.length > 0 ? true : false),
    then: yup.string().oneOf(
      [yup.ref("password")],
      "Both password need to be the same"
    )
    })
});
const ResetPassword = () => {
  const onSubmit = (values) => {
    
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    
    let token = urlParams.get('token')
    
    if (token === null){
      token = ''
    }

    let data = {
        token: token,
        new_password: values.password, 
    };

    axios
        .post(`${configs.API_HOST}/api/v1/auth/reset-password`, data, {
            withCredentials: true,
        })
        .then((response) => {
           
            if (
                !(
                    response.status === 200 &&
                    response.data.msg === "Password updated successfully"
                )
            ) {
                throw "Password Reset Failed!";
            } else {

                document.location = "/landing";
            }
        })
        .catch((error) => {
            console.log(error);
        });
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
                  <Button type="submit" name="Reset" addStyles="resetCommon_resetButton" />
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
                    onClick={()=>{console.log("Back to Login")}}
                    name="Back to Login"
                    addStyles="resetCommon_guestButton"
                  />
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Grid>
      </Grid>
    </Login>
  );
};

export default ResetPassword;
