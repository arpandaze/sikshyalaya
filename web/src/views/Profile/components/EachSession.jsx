import React from "react";
import Grid from "@material-ui/core/Grid";
import "./css/session.css";
import { RiComputerLine } from "react-icons/ri";
import { ImMobile } from "react-icons/im";

const EachSession = ({ sessions }) => {
  return (
    <Grid
      container
      direction="row"
      alignItems="flex-start"
      className="session_eachSessionRoot"
    >
      <Grid item>
        <Grid
          container
          alignItems="center"
          justify="center"
          className="session_iconContainer"
        >
          <Grid item>
            {sessions.deviceType === "mobile" ? (
              <ImMobile size={25} />
            ) : (
              <RiComputerLine size={25} />
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="column" className="session_info">
          <Grid item>
            <Grid container direction="row" alignItems="center">
              <Grid item>
                <p className="session_device">{`${sessions.device} - `}</p>
              </Grid>
              <Grid item>
                <p className="session_browser"> {sessions.browser}</p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="row">
            <Grid item>
              <p className="session_ip1">{"IP : "}</p>
            </Grid>
            <Grid item>
              <p className="session_ip2">{`${sessions.ip}`}</p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EachSession;
