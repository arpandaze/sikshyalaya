import React from "react";
import Grid from "@material-ui/core/Grid";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
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
        className="admin_root"
      >
        <Grid item className="admin_topBar"></Grid>
        <Grid item className="admin_botBar">
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item className="admin_leftContainer" xs={4}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid item className="admin_activeClassBoxContainer">
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    className="admin_activeClassBoxInside"
                  >
                    <Grid item>
                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        className="admin_activeClassBoxTop"
                      >
                        <div className="admin_smallRedBox"></div>
                        <h1 className="admin_activeClassTitle">Active Class</h1>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item className="admin_classResourcesBoxContainer">
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    className="admin_classResourceBoxInside"
                  >
                    <Grid item>
                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        className="admin_classResourceBoxTop"
                      >
                        <div className="admin_smallPurpleBox"></div>
                        <h1 className="admin_classResourceTitle">
                          Class Resource
                        </h1>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item className="admin_middleContainer" xs={4}>
              <Grid item className="admin_discussionBoxContainer">
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  className="admin_quizBoxInside"
                >
                  <Grid item>
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      className="admin_quizBoxTop"
                    >
                      <div className="admin_smallBlueBox"></div>
                      <h1 className="admin_quizBoxTitle">Discussion</h1>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item className="admin_rightContainer" xs={4}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid item className="admin_postBoxContainer">
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    className="admin_postBoxInside"
                  >
                    <Grid item>
                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        className="admin_postBoxTop"
                      >
                        <div className="admin_smallGreenBox"></div>
                        <h1 className="admin_postBoxTitle">Post</h1>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item className="admin_quizBoxContainer">
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    className="admin_quizBoxInside"
                  >
                    <Grid item>
                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        className="admin_quizBoxTop"
                      >
                        <div className="admin_smallYellowBox"></div>
                        <h1 className="admin_quizBoxTitle">Quiz</h1>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item className="admin_tbdBoxContainer">
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    className="admin_tbdBoxInside"
                  >
                    <Grid item>
                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        className="admin_tbdBoxTop"
                      >
                        <div className="admin_smallBlueBox"></div>
                        <h1 className="admin_tbdBoxTitle">TBD</h1>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default AdminDashboard;
