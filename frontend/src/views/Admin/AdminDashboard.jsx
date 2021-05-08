import React from "react";
import Grid from "@material-ui/core/Grid";
import DashboardLayout from "../../components/DashboardLayout";
import NotificationButton from "../../components/NotificationButton";
import "./statics/css/adminDashboard.css";

const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
        wrap="nowrap"
      >
        <Grid item className="admin_topBar">
          <NotificationButton />
        </Grid>
        <Grid item className="admin_botBar">
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item className="admin_leftContainer" xs={4}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid item className="admin_activeClassBoxContainer"></Grid>
                <Grid item className="admin_classResourcesBoxContainer"></Grid>
              </Grid>
            </Grid>
            <Grid item className="admin_middleContainer" xs={4}>
              <div className="admin_discussionBoxContainer"></div>
            </Grid>
            <Grid item className="admin_rightContainer" xs={4}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid item className="admin_postBoxContainer"></Grid>
                <Grid item className="admin_quizBoxContainer"></Grid>
                <Grid item className="admin_tbdBoxContainer"></Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default AdminDashboard;
