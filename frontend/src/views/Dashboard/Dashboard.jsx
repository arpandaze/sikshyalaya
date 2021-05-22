import React from "react";
import Grid from "@material-ui/core/Grid";
import DashboardLayout from "../../components/DashboardLayout";
import NotificationButton from "../../components/NotificationButton";
import "./statics/css/dashboard.css";
import ClassResource from "./components/ClassResource";

const resourceList = [
  {
    id: "1",
    name: "How a man goes under the water",
    url: "hi under the water.com",
    type: "pdf",
    time: "Sat May 22 2021 14:45:06 GMT+0545",
  },
  {
    id: "2",
    name: "Breaking! Ku opens bhajan group",
    url: "hi under the water.com",
    type: "image",
    time: "Sat May 22 2021 14:40:06 GMT+0545",
  },
  {
    id: "3",
    name: "Ku fountain has high nitrogen content suggesting urination",
    url: "hi under the water.com",
    type: "presentation",
    time: "Sat May 22 2021 14:22:06 GMT+0545",
  },
  {
    id: "4",
    name: "Find out on the next episode of Dragon Ball Z",
    url: "hi under the water.com",
    type: "document",
    time: "Sat May 22 2021 13:52:06 GMT+0545",
  },
  {
    id: "5",
    name: "RPG's advertisement profile",
    url: "hi under the water.com",
    type: "link",
    time: "Sat May 22 2021 12:52:06 GMT+0545",
  },
  {
    id: "6",
    name: "Rushab is also under the water",
    url: "hi under the water.com",
    type: "zip",
    time: "Sat May 22 2021 11:52:06 GMT+0545",
  },
  {
    id: "6",
    name: "Rushab is also under the water",
    url: "hi under the water.com",
    type: "zip",
    time: "Sat May 22 2021 15:26:44 GMT+0545",
  },
];

const Dashboard = () => {
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
        <Grid item className="mainDash_topBar">
          <NotificationButton />
        </Grid>
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
                    direction="column"
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
                    <Grid item>
                      <Grid
                        container
                        direction="column"
                        alignItems="center"
                        className="mainDash_activeClassBoxBottom"
                      >
                        <Grid item></Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item className="mainDash_classResourcesBoxContainer">
                  <Grid
                    container
                    direction="column"
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
                    <Grid item>
                      <Grid
                        container
                        direction="column"
                        alignItems="center"
                        className="mainDash_classResourceBoxBottom"
                      >
                        <Grid item>
                          <ClassResource resourceList={resourceList} />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item className="mainDash_middleContainer" xs={8}>
              <Grid item className="mainDash_discussionBoxContainer">
                <Grid
                  container
                  direction="column"
                  className="mainDash_discussionBoxInside"
                >
                  <Grid item>
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      className="mainDash_discussionBoxTop"
                    >
                      <div className="mainDash_smallBlueBox"></div>
                      <h1 className="mainDash_discussionBoxTitle">
                        Discussion
                      </h1>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid
                      container
                      direction="column"
                      alignItems="center"
                      className="mainDash_discussionBoxBottom"
                    >
                      <Grid item></Grid>
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

export default Dashboard;
