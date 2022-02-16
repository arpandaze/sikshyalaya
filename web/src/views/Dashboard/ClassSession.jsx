import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import "./statics/css/classSession.css";
import ClassResource from "./components/ClassResource";
import callAPI from "../../utils/API";
import DiscussionBox from "../../components/DiscussionBox";
import ConditionalRendering from "../../components/ConditionalRendering";
import noClass from "../../assets/bulletin.svg";
import Image from "../../components/Image";

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

const Dashboard = ({ match }) => {
  const [pageState, setPageState] = useState(0);

  const classDetailsDefault = {
    id: null,
    title: null,
    titleDescription: null,
    title2: null,
    title2Description: null,
    bottomText: null,
    button: null,
    resources: [],
    groupID: null,
    classID: null,
    teachers: [],
  };

  const [classDetails, setClassDetails] = useState(classDetailsDefault);

  const classSessionFormatter = (value) => {
    if (!value.data.length) {
      return null;
    }
    const currentDateTime = new Date();
    let active_class_session = value.data.filter((item) => {
      let start_time = new Date(
        new Date(item.start_time).toLocaleString() + " UTC"
      );
      let end_time = new Date(
        new Date(item.end_time).toLocaleString() + " UTC"
      );
      if (end_time > currentDateTime && start_time < currentDateTime) {
        return item;
      }
    });
    return active_class_session[0];
  };

  useEffect(async () => {
    let class_details = null;
    if (match.params.classID) {
      const req = await callAPI({
        endpoint: `/api/v1/class_session/${match.params.classID}/`,
      });
      class_details = req.data;
    } else {
      const req = await callAPI({
        endpoint: `/api/v1/class_session/`,
      });
      class_details = classSessionFormatter(req);
    }
    if (class_details) {
      let instructors_name = class_details.instructor
        .map((instructor) => {
          return instructor.full_name;
        })
        .join(" and ");
      let resources = class_details.files.map((item, index) => {
        return {
          id: index,
          name: item.name,
          url: `/${item.path}/${item.name}`,
          type: getFileType(item.file_type),
          time: item.uploaded_datetime,
        };
      });
      setClassDetails({
        id: class_details.id,
        title: class_details.course.course_code,
        titleDescription: class_details.course.course_name,
        title2: "Today's Topic",
        title2Description: class_details.description,
        bottomText: instructors_name,
        button: true,
        resources: resources,
        groupID: class_details.group_id,
        teachers: class_details.instructor,
        classID: class_details.id,
      });
    } else {
      setPageState(1);
    }
  }, []);

  return (
    <DashboardLayout mode={2}>
      <ConditionalRendering condition={pageState == 0}>
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
                                      {classDetails.title}
                                    </p>

                                    <p className="mainDash_activeClassListrow_col_1_light">
                                      {classDetails.titleDescription}
                                    </p>
                                  </Grid>
                                  <Grid
                                    item
                                    className="mainDash_activeClassListrow_col_2"
                                  >
                                    <p className="mainDash_activeClassListrow_col_2_bold">
                                      {classDetails.title2}
                                    </p>
                                    <p className="mainDash_activeClassListrow_col_2_light">
                                      {classDetails.title2Description}
                                    </p>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
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
                              resourceList={classDetails.resources}
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
                  <DiscussionBox classDetails={classDetails} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ConditionalRendering>
      <ConditionalRendering condition={pageState == 1}>
        <Grid container direction="row">
          <Grid
            container
            item
            xs={12}
            alignItems="center"
            justify="center"
            className="mainDash_noClassContainer"
          >
            <div className="mainDash_noClassImage">
              <Image src={noClass} />
              <p className="mainDash_noClass">No active class sessions!</p>
            </div>
          </Grid>
        </Grid>
      </ConditionalRendering>
    </DashboardLayout>
  );
};

export default Dashboard;
