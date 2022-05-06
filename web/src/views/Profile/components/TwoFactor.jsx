import React, { useContext, useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import callAPI from "../../../utils/API";
import CustomTextField from "./../../../components/CustomTextField";
import "./css/twoFactor.css";
import CustomButton from "../../../components/CustomButton";
import CustomCheckComponent from "../../../components/CustomCheckboxComponent";
import { AlertContext } from "../../../components/DashboardLayout/AlertContext";
import CustomRadioButton from "../../../components/CustomRadioButton";
import CustomQRCode from "../../../components/CustomQRCode";
import { QRCode } from "react-qrcode-logo";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const validationSchema = yup.object({
  auth_code: yup.number(),
});

const TwoFactor = () => {
  const history = useHistory();
  const [text, setText] = useState("");
  const [toggle, setToggle] = useState(false);
  const { alert, setAlert } = useContext(AlertContext);
  const [qrShow, setQRShow] = useState(false);
  const [qrToken, setQRtoken] = useState("");

  useEffect(async () => {
    try {
      const response = await callAPI({
        endpoint: "/api/v1/2fa/enable/request",
        method: "GET",
      });
      if (response.status == 409) {
        setToggle(1);
      } else {
        setToggle(0);
      }
    } catch (e) {}
  }, []);

  const onSubmit = async (value) => {
    let data = {
      totp: value.auth_code,
    };

    let resp = await callAPI({
      endpoint: "/api/v1/2fa/enable/confirm",
      method: "POST",
      data: data,
    });
    if (resp.status === 200) {
      setAlert({
        severity: "success",
        message: "2fa code authenticated",
      });
      setTimeout(() => {
        setAlert(null);
      }, 2000);
      window.location.reload();
    } else {
      setAlert({
        severity: "error",
        message: "2fa code not authenticated",
      });
      setTimeout(() => {
        setAlert(null);
      }, 2000);
    }
  };
  const handleInputChange = (event) => {
    setText(event.target.value);
    console.log("value", event.target.value);
  };

  const handle2faRequest = async () => {
    try {
      let resp = await callAPI({
        endpoint: "/api/v1/2fa/enable/request",
        method: "GET",
      });
      setQRtoken(resp.data.uri);
    } catch (e) {}
  };
  const handle2faDelete = async () => {
    try {
      let resp = await callAPI({
        endpoint: "/api/v1/2fa/disable",
        method: "DELETE",
      });
      if (resp.status === 200) {
        setAlert({
          severity: "success",
          message: "2fa sucessfully turned off",
        });
        setTimeout(() => {
          setAlert(null);
        }, 2000);

        window.location.reload();
      } else {
        setAlert({
          severity: "error",
          message: "Turning off 2fa failed",
        });
        setTimeout(() => {
          setAlert(null);
        }, 2000);
      }
    } catch (e) {}
  };
  const handleToggle = () => {
    if (toggle) {
      setToggle(false);
      handle2faDelete();
    } else {
      setToggle(true);
      setQRShow(true);
      handle2faRequest();
    }
  };
  return (
    <div>
      <Grid container direction="column" className="tfa_root">
        <Grid item>
          <Formik
            enableReinitialize={true}
            initialValues={{
              auth_code: "",
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
                  className="tfa_formContainer"
                >
                  <Grid item xs={10}>
                    <CustomRadioButton
                      handleToggle={handleToggle}
                      toggle={toggle}
                      label="Two Factor Authentication"
                    />
                  </Grid>
                  {qrShow ? (
                    <>
                      <Grid item xs={10}>
                        <QRCode value={qrToken} />
                      </Grid>
                      <Grid item xs={10}>
                        <div>Scan QR Code with an Authenticator app</div>
                        <CustomTextField
                          type="number"
                          name="auth_code"
                          placeHolder="Enter Authentication Code"
                          id="auth_code"
                          addStyles="tfa_inputField"
                        />
                      </Grid>
                      <Grid item>
                        <CustomButton
                          name="Send"
                          type="submit"
                          addStyles="tfa_button"
                        />
                      </Grid>
                    </>
                  ) : (
                    <></>
                  )}
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </div>
  );
};

export default TwoFactor;
