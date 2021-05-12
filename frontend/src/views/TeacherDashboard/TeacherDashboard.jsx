import React from "react";
import Grid from "@material-ui/core/Grid";
import DashboardLayout from "../../components/DashboardLayout";
import NotificationButton from "../../components/NotificationButton";
import "./statics/css/teacherDashboard.css";

const TeacherDashbaord = () => {
  return (
    <DashboardLayout>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
        wrap="nowrap"
        className="teacherDash_root"
      >
        <Grid item className="teacherDash_topBar">
          <NotificationButton />
        </Grid>
        <Grid item className="teacherDash_botBar">
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item className="teacherDash_leftContainer" xs={4}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid
                  item
                  className="teacherDash_activeClassBoxContainer"
                ></Grid>
                <Grid item className="teacherDash_quizBoxContainer"></Grid>
                <Grid item className="teacherDash_resourceBoxContainer"></Grid>
              </Grid>
            </Grid>
            <Grid item className="teacherDash_middleContainer" xs={8}>
              <div className="teacherDash_discussionBoxContainer"></div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default TeacherDashbaord;
