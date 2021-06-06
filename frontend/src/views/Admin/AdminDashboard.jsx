import React from "react";
import Grid from "@material-ui/core/Grid";
import DashboardLayout from "../../components/DashboardLayout";
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
        className="mainDash_root"
      >
        <Grid item className="mainDash_topBar"></Grid>
        <Grid item className="mainDash_botBar">
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item className="mainDash_leftContainer" xs={4}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid item className="mainDash_activeClassBoxContainer">
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    className="mainDash_activeClassBoxInside"
                  >
                    <Grid item>
                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        className="mainDash_activeClassBoxTop"
                      >
                        <div className="mainDash_smallRedBox"></div>
                        <h1 className="mainDash_activeClassTitle">
                          Active Class
                        </h1>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item className="mainDash_classResourcesBoxContainer">
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    className="mainDash_classResourceBoxInside"
                  >
                    <Grid item>
                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        className="mainDash_classResourceBoxTop"
                      >
                        <div className="mainDash_smallPurpleBox"></div>
                        <h1 className="mainDash_classResourceTitle">
                          Class Resource
                        </h1>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item className="mainDash_middleContainer" xs={4}>
              <Grid item className="mainDash_discussionBoxContainer">
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  className="mainDash_quizBoxInside"
                >
                  <Grid item>
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      className="mainDash_quizBoxTop"
                    >
                      <div className="mainDash_smallBlueBox"></div>
                      <h1 className="mainDash_quizBoxTitle">Discussion</h1>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item className="mainDash_rightContainer" xs={4}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid item className="mainDash_postBoxContainer">
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    className="mainDash_postBoxInside"
                  >
                    <Grid item>
                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        className="mainDash_postBoxTop"
                      >
                        <div className="mainDash_smallGreenBox"></div>
                        <h1 className="mainDash_postBoxTitle">Post</h1>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item className="mainDash_quizBoxContainer">
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    className="mainDash_quizBoxInside"
                  >
                    <Grid item>
                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        className="mainDash_quizBoxTop"
                      >
                        <div className="mainDash_smallYellowBox"></div>
                        <h1 className="mainDash_quizBoxTitle">Quiz</h1>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item className="mainDash_tbdBoxContainer">
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    className="mainDash_tbdBoxInside"
                  >
                    <Grid item>
                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        className="mainDash_tbdBoxTop"
                      >
                        <div className="mainDash_smallBlueBox"></div>
                        <h1 className="mainDash_tbdBoxTitle">TBD</h1>
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
