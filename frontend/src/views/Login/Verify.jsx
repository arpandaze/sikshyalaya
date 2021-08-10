import React, { useEffect, useState } from "react";
import CustomButton from "../../components/CustomButton";
import Login from "./Login";
import Grid from "@material-ui/core/Grid";
import "./statics/css/verify.css";
import DelayedRedirect from "../../components/DelayedRedirect";
import verify from "../../assets/verify.svg";
import emailVerify from "../../assets/emailVerify.svg";
import callAPI from "../../utils/API";
import Image from "../../components/Image";

const Verify = () => {
  const [verifyToken, setVerifyToken] = useState(null);
  const [verifyState, setVerifyState] = useState({ id: 1, msg: null });

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let token = urlParams.get("token");

    if (!token) {
      setVerifyState({ id: 2, msg: "Invalid token!" });
    }

    setVerifyToken(token);
  }, [verifyToken]);

  const onSubmit = async () => {
    let data = {
      token: verifyToken,
    };
    let response = await callAPI({
      endpoint: "/api/v1/auth/verify",
      method: "POST",
      params: data,
    });
    if (response.status === 200) {
      setVerifyState({ id: 3, msg: response.data.msg });
    }
  };

  return (
    <Login>
      {verifyState.id === 1 ? (
        <Grid container direction="column" alignItems="center" justify="center">
          <Grid item xs={8}>
            <Image src={emailVerify} />
          </Grid>
          <Grid item className="verify_buttonContainer">
            <CustomButton
              type="button"
              name="Verify"
              addStyles="verify_button"
              onClick={onSubmit}
            />
          </Grid>
        </Grid>
      ) : (
        <>
          <DelayedRedirect to="/login" timeout="3" />
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Grid item xs={6}>
              <Image src={verify} />
            </Grid>
            <h2>Redirecting...</h2>
            <h2>{verifyState.msg}!</h2>
          </Grid>
        </>
      )}
    </Login>
  );
};

export default Verify;
