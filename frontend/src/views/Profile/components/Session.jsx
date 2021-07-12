import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import useAPI from "../../../utils/useAPI";
import "./css/session.css";
import UAParser from "ua-parser-js";
import callAPI from "../../../utils/API";
import EachSession from "./EachSession";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Session = () => {
  const history = useHistory();
  const getDeviceType = (useragent) => {
    var parser = new UAParser();
    parser.setUA(useragent);
    var result = parser.getResult();
    if (result.device.type === "mobile") {
      return "mobile";
    } else {
      return "computer";
    }
  };
  const sessionFormatter = (response) => {
    let responseData = [];
    responseData = response.data.map((item) => {
      var parser = new UAParser();
      parser.setUA(item.ua);
      var result = parser.getResult();
      let formattedResponse = {
        ua: item.ua,
        ip: item.ip,
        deviceType: getDeviceType(item.ua),
        device: result.os.name,
        browser: result.browser.name,
      };
      return formattedResponse;
    });
    return responseData;
  };

  let defaultSessions = [];
  let [allSessions] = useAPI(
    { endpoint: "/api/v1/auth/active-sessions/" },
    sessionFormatter,
    defaultSessions
  );
  const handleLogOut = async () => {
    await callAPI({ endpoint: "/api/v1/auth/logout-all-sessions/" });
    history.push("/logout");
  };

  return (
    <>
      <Grid
        direction="column"
        alignItems="center"
        justify="center"
        className="session_root"
      >
        <Grid item>
          <Grid
            container
            direction="row"
            alignItems="center"
            className="session_titleContainer"
          >
            <Grid item>
              <p className="session_title">Active Sessions</p>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="column" className="session_bodyRoot">
            <Grid item>
              <Grid
                container
                direction="column"
                className="session_sessionContainer"
              >
                <Grid item>
                  {allSessions &&
                    allSessions.map((item) => <EachSession sessions={item} />)}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container className="session_logout">
            <Grid item>
              <p className="session_logoutText" onClick={handleLogOut}>
                Logout of all sessions
              </p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Session;
