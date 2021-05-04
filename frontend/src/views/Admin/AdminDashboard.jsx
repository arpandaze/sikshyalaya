import React from "react";
import Grid from "@material-ui/core/Grid";
import DashboardLayout from "../../components/DashboardLayout";
import NotificationButton from "../../components/NotificationButton";
import "./statics/css/adminDashboard.css";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
        className="root"
        wrap="nowrap"
      >
        <Grid item className="topBar">
          <NotificationButton />
        </Grid>
        <Grid item className="botBar">
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item className="leftContainer" xs={4}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid item className="activeClassBoxContainer"></Grid>
                <Grid item className="classResourcesBoxContainer"></Grid>
              </Grid>
            </Grid>
            <Grid item className="middleContainer" xs={4}>
              <div className="discussionBoxContainer"></div>
            </Grid>
            <Grid item className="rightContainer" xs={4}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid item className="postBoxContainer"></Grid>
                <Grid item className="quizBoxContainer"></Grid>
                <Grid item className="tbdBoxContainer"></Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default Dashboard;
