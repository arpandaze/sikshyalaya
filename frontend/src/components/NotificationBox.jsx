import React from "react";
import Grid from "@material-ui/core/Grid";
import { StylesProvider } from "@material-ui/core/styles";
import "./statics/css/notificationBox.css";

const NotificationBox = () => {
  return (
    <StylesProvider injectFirst>
      <Grid
        container
        direction="row"
        className="notifBox_root"
        wrap="nowrap"
        spacing={2}
      >
        <Grid item xs={12} className="notifBox_titleBox">
          <p className="notifBox_titleText">Notifications</p>
        </Grid>
      </Grid>
    </StylesProvider>
  );
};

export default NotificationBox;
