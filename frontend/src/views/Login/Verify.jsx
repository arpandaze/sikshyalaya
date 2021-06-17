import React, { useEffect, useContext, useState } from "react";
import Button from "../../components/Button";
import Login from "./Login";
import Grid from "@material-ui/core/Grid";
import "./statics/css/verify.css";
import DelayedRedirect from "../../components/DelayedRedirect";
import callAPI from "../../utils/API";

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
          <Grid item xs={12}>
            <h2>Click the button below to verify your account.</h2>
          </Grid>
          <Grid item>
            <Button
              type="button"
              name="Verify"
              addStyles="verify_button"
              onClick={onSubmit}
            ></Button>
          </Grid>
        </Grid>
      ) : (
        <>
          <DelayedRedirect to="/login" timeout="3" />
          <div style={{ textAlign: "center" }}>
            <h2>{verifyState.msg}!</h2>
            <h2>Redirecting...</h2>
          </div>
        </>
      )}
    </Login>
  );
};

export default Verify;
