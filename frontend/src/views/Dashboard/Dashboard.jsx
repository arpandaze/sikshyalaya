import React, { useState } from "react";
import Button from "../../components/Button";
import Grid from "@material-ui/core/Grid";
import colorscheme from "../../utils/colors";
import DashboardLayout from "../../components/DashboardLayout";
import NotificationButton from "../../components/NotificationButton";
import "./statics/css/dashboard.css";

const Dashboard = () => {
  const [clicked, setClicked] = useState(false);
  return (
    <DashboardLayout>
      <div className="mainDash_root">
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
          wrap="nowrap"
        >
          <Grid item className="mainDash_topBar">
            <NotificationButton />
          </Grid>
          <Grid item className="mainDash_botBar">
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item className="mainDash_leftContainer" xs={4}>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  className="mainDash_xdd"
                >
                  <Grid
                    item
                    className="mainDash_activeClassBoxContainer"
                  ></Grid>
                  <Grid
                    item
                    className="mainDash_classResourcesBoxContainer"
                  ></Grid>
                </Grid>
              </Grid>
              <Grid item className="mainDash_middleContainer" xs={4}>
                <div className="mainDash_discussionBoxContainer"></div>
              </Grid>
              <Grid item className="mainDash_rightContainer" xs={4}>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  className="mainDash_xdd"
                >
                  <Grid item className="mainDash_postBoxContainer"></Grid>
                  <Grid item className="mainDash_quizBoxContainer"></Grid>
                  <Grid item className="mainDash_tbdBoxContainer"></Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
