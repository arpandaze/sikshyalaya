import React from "react";
import Grid from "@material-ui/core/Grid";
import DashboardLayout from "../../components/DashboardLayout";
import NotificationButton from "../../components/NotificationButton";
import "./statics/css/dashboard.css";
import ClassResource from "./components/ClassResource";
import { useAPI } from "../../utils/useAPI";

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

const getFileType = (item) => {
  switch (item) {
    case "application/msword":
      return "document";
      break;
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return "document";
      break;
    case "image/jpeg":
      return "image";
      break;
    case "image/png":
      return "image";
      break;
    case "application/pdf":
      return "pdf";
      break;
    case "application/vnd.ms-powerpoint":
      return "presentation";
      break;
    case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      return "presentation";
      break;
    case "application/vnd.rar":
      return "zip";
      break;
    case "application/x-tar":
      return "zip";
      break;
    case "application/zip":
      return "zip";
      break;
    case "application/x-7z-compressed":
      return "zip";
      break;
  }
};

const Dashboard = () => {
  const classSessionFormatter = (value) => {
    if (!value.data.length) {
      return [];
    }
    let active_class_session = [];
    value.data.map((item) => {
      let start_time = new Date(item.start_time + "+05:45");
      let end_time = new Date(item.end_time + "+05:45");
      let instructors_name = item.instructor
        .map((instructor) => {
          return instructor.full_name;
        })
        .join(" and ");
      if (
        end_time.getTime() > Date.now() &&
        start_time.getTime() < Date.now()
      ) {
        let resources = item.files.map((item, index) => {
          return {
            id: index,
            name: item.name,
            url: `/${item.path}/${item.name}`,
            type: getFileType(item.file_type),
            time: item.uploaded_datetime,
          };
        });
        active_class_session.push({
          title: item.course.course_code,
          titleDescription: item.course.course_name,
          title2: "Today's Topic",
          title2Description: item.description,
          bottomText: instructors_name,
          button: true,
          resources: resources,
        });
      }
    });
    return { active: active_class_session };
  };

  const classSessionDefaults = {
    active: [
      {
        title: null,
        titleDescription: null,
        title2: null,
        title2Description: null,
        bottomText: null,
        button: null,
        resources: [
          {
            id: null,
            name: null,
            url: null,
            type: null,
            time: null,
          },
        ],
      },
    ],
  };

  const [classSession, classSessionReqStat] = useAPI(
    { endpoint: "/api/v1/class_session/" },
    classSessionFormatter,
    classSessionDefaults
  );

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
                        alignItems="flex-start"
                        className="mainDash_activeClassBoxBottom"
                      >
                        <Grid item>
                          {classSession.active.map((data) => (
                            <Grid
                              container
                              direction="row"
                              alignItems="flex-start"
                              className="mainDash_activeClassListContainer"
                            >
                              <Grid
                                item
                                className="mainDash_activeClassListrow1"
                              >
                                <Grid
                                  container
                                  direction="column"
                                  justify="center"
                                  alignItems="flex-start"
                                  className="mainDash_activeClassListrow_col_box"
                                >
                                  <Grid
                                    item
                                    className="mainDash_activeClassListrow_col_1"
                                  >
                                    <p className="mainDash_activeClassListrow_col_1_bold">
                                      {data.title}
                                    </p>

                                    <p className="mainDash_activeClassListrow_col_1_light">
                                      {data.titleDescription}
                                    </p>
                                  </Grid>
                                  <Grid
                                    item
                                    className="mainDash_activeClassListrow_col_2"
                                  >
                                    <p className="mainDash_activeClassListrow_col_2_bold">
                                      {data.title2}
                                    </p>
                                    <p className="mainDash_activeClassListrow_col_2_light">
                                      {data.title2Description}
                                    </p>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          ))}
                        </Grid>
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
                          <ClassResource
                            resourceList={classSession.active[0].resources}
                          />
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
