import React, { useEffect, useContext, useState } from "react";
import Button from "../../components/Button";
import Login from "./Login";
import Grid from "@material-ui/core/Grid";
import "./statics/css/verify.css";

const Verify = () => {
    const [verifyToken, setVerifyToken] = useState(null)

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        let token = urlParams.get("token");

        setVerifyToken(token);

    }, [verifyToken]);

  return (
    <Login>
      <Grid container direction="column" alignItems="center" justify="center">
        <Grid item xs={12}>
          <h2>Click the button below to verify your account.</h2>
        </Grid>
        <Grid item>
          <Button
            type="button"
            name="Verify"
            addStyles="verify_button"
          ></Button>
        </Grid>
      </Grid>
    </Login>
  );
};

export default Verify;
