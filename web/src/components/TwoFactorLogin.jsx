import React, { useContext, useState } from "react";
import { Formik, Form } from "formik";
import CustomButton from "../components/CustomButton";
import * as yup from "yup";
import { Link } from "react-router-dom";
import Image from "./Image";
import logoLarge from "../assets/logo-large.svg";
import Grid from "@material-ui/core/Grid";
import "./statics/css/twoFactorLogin.css";
import { UserContext } from "../utils/Contexts/UserContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import callAPI from "../utils/API";
import CustomTextField from "./CustomTextField";
import { BiBarcodeReader } from "react-icons/bi";
import { Redirect } from "react-router-dom";
import configs from "../utils/configs";

const validationSchema = yup.object({
  auth_code: yup.number(),
});
const TwoFactorLogin = () => {
  const history = useHistory();
  const [qrShow, setQrShow] = useState(false);
  const [qrToken, setQrToken] = useState("");
  const { user, setUser } = useContext(UserContext);

  const onSubmit = async (value) => {
    let data = {
      totp: value.auth_code,
    };

    let resp = await callAPI({
      endpoint: "/api/v1/2fa/login/confirm",
      method: "POST",
      data: data,
    });
    if (resp.status === 200) {
      setUser(resp.data["user"]);
    } else {
      throw "Login failed!";
    }
  };

  return (
    <>
      {user == null || !configs.AUTO_REDIRECT ? (
        <Grid container direction="column">
          <Grid item className="login_logoBox">
            <Grid container direction="row" alignItems="flex-start">
              <Grid item className="login_logo">
                <Link to="/login">
                  <Image
                    src={logoLarge}
                    alt="Sikshyalaya"
                    addStyles="login_image"
                  />
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className="login_loginBoxContainer">
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
            >
              <Grid item>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  className="loginCommon_loginBoxContainer"
                >
                  <Grid item>
                    <h1 className="loginCommon_label">
                      Two Factor Authentication
                    </h1>
                  </Grid>
                  <Grid item xs={12}>
                    <Formik
                      initialValues={{
                        auth_code: "",
                      }}
                      validationSchema={validationSchema}
                      onSubmit={onSubmit}
                    >
                      <Form>
                        <Grid
                          container
                          direction="column"
                          alignItems="flex-start"
                        >
                          <Grid item xs={12}>
                            <CustomTextField
                              id="auth_code"
                              name="auth_code"
                              type="number"
                              placeHolder="Enter Authenticator Code"
                              addStyles="loginCommon_inputButton"
                            />
                          </Grid>
                        </Grid>
                        <Grid
                          container
                          spacing={1}
                          direction="column"
                          justify="center"
                          alignItems="center"
                        >
                          <Grid
                            container
                            item
                            direction="row"
                            alignItems="center"
                            justify="center"
                            className="loginCommon_loginButtonContainer"
                          >
                            <CustomButton
                              type="submit"
                              name="Login"
                              addStyles="loginCommon_loginButton"
                            />
                          </Grid>
                          <Grid item>
                            <p
                              onClick={() => {
                                history.push("/reset");
                              }}
                              className="loginCommon_forgetButton"
                            >
                              Can't Access TwoFA? Reset Password.
                            </p>
                          </Grid>
                        </Grid>
                      </Form>
                    </Formik>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : user.id ? (
        <Redirect
          to={{
            pathname: "/landing",
          }}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default TwoFactorLogin;
