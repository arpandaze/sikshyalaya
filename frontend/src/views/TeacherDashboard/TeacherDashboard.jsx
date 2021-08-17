import React, { useState, useEffect, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import ClassResource from "../Dashboard/components/ClassResource";
import callAPI from "../../utils/API";
import DiscussionBox from "../../components/DiscussionBox.jsx";
import ConditionalRendering from "../../components/ConditionalRendering";
import { FileUpload } from "../../components/FileUpload";
import Student from "./components/Student";
import Button from "@material-ui/core/Button";
import configs from "../../utils/configs";
import noClass from "../../assets/bulletin.svg";
import Image from "../../components/Image";
import defaultProfile from "../../assets/default-profile.svg";
import { AlertContext } from "../../components/DashboardLayout/AlertContext";
import "./statics/css/teacherDashboard.css";
import { BsFilePlus } from "react-icons/bs";

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

const students = [];
let groupID = null;

const Dashboard = ({ match }) => {
  const [optionFile, setOptionFile] = useState([]);
  const [buttonType, setButtonType] = useState(true);

  const { alert, setAlert } = useContext(AlertContext);
  const [pageState, setPageState] = useState(0);
  const [doneState, setDoneState] = useState(0);

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
    teachers: [],
    classID: null,
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

  const handleUploadSave = (files) => {
    setOptionFile([...optionFile, ...files]);
  };
  const handleSubmit = async () => {
    let formData = new FormData();
    formData.append("class_id", classDetails.classID);
    if (optionFile) {
      [...optionFile].map((item) => {
        formData.append("files", item);
      });
    }
    let resp = await callAPI({
      endpoint: `/api/v1/class_session/${classDetails.classID}/files`,
      method: "PUT",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (resp.status === 200) {
      window.location = "/teacher-dashboard";
    }
  };

  useEffect(async () => {
    if (classDetails.groupID) {
      let class_details = null;
      try {
        const req = await callAPI({
          endpoint: `/api/v1/group/${classDetails.groupID}/student/`,
        });
        class_details = req.data;
      } catch (e) {
        console.log(e);
      }

      if (class_details) {
        class_details.student.map((student) => {
          students.push({
            id: student.id,
            name: student.full_name,
            profile_image: student.profile_image
              ? configs.PUBLIC_FILES_PATH + "/" + student.profile_image
              : defaultProfile,
          });
        });
      }
    }
  }, [classDetails.groupID]);
  const [ids, setIDs] = useState([]);
  const [checked, setChecked] = useState([]);

  const postAttendance = async () => {
    let data = null;

    data = {
      attendant: ids,
    };
    const postAttendants = await callAPI({
      endpoint: `/api/v1/class_session/${classDetails.groupID}/attendance`,
      method: "PUT",
      data: data,
    });
    setDoneState(doneState + 1);
  };

  return (
    <DashboardLayout>
      <ConditionalRendering condition={pageState == 0}>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
          wrap="nowrap"
          className="teacherDash_root"
        >
          <Grid item className="teacherDash_topBar"></Grid>
          <Grid item className="teacherDash_botBar">
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item className="teacherDash_leftContainer" xs={4}>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item className="teacherDash_activeClassBoxContainer">
                    <Grid
                      container
                      direction="column"
                      className="teacherDash_activeClassBoxInside"
                    >
                      <Grid item>
                        <Grid
                          container
                          direction="row"
                          alignItems="center"
                          className="teacherDash_activeClassBoxTop"
                        >
                          <div className="teacherDash_smallRedBox"></div>
                          <h1 className="teacherDash_activeClassTitle">
                            Active Class
                          </h1>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid
                          container
                          direction="column"
                          alignItems="flex-start"
                          className="teacherDash_activeClassBoxBottom"
                        >
                          <Grid item>
                            <Grid
                              container
                              direction="row"
                              alignItems="flex-start"
                              className="teacherDash_activeClassListContainer"
                            >
                              <Grid
                                item
                                className="teacherDash_activeClassListrow1"
                              >
                                <Grid
                                  container
                                  direction="column"
                                  justify="center"
                                  alignItems="flex-start"
                                  className="teacherDash_activeClassListrow_col_box"
                                >
                                  <Grid
                                    item
                                    className="teacherDash_activeClassListrow_col_1"
                                  >
                                    <p className="teacherDash_activeClassListrow_col_1_bold">
                                      {classDetails.title}
                                    </p>

                                    <p className="teacherDash_activeClassListrow_col_1_light">
                                      {classDetails.titleDescription}
                                    </p>
                                  </Grid>
                                  <Grid
                                    item
                                    className="teacherDash_activeClassListrow_col_2"
                                  >
                                    <p className="teacherDash_activeClassListrow_col_2_bold">
                                      {classDetails.title2}
                                    </p>
                                    <p className="teacherDash_activeClassListrow_col_2_light">
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
                  <Grid item className="teacherDash_classResourcesBoxContainer">
                    <Grid
                      container
                      direction="column"
                      className="teacherDashboard_classResourceBoxInside"
                    >
                      <Grid item>
                        <Grid
                          container
                          direction="row"
                          alignItems="center"
                          className="teacherDashboard_classResourceBoxTop"
                        >
                          <Grid item>
                            <div className="teacherDashboard_smallPurpleBox"></div>
                          </Grid>
                          <Grid
                            item
                            className="teacherDashboard_classResourceTitleContainer"
                          >
                            <h1 className="teacherDashboard_classResourceTitle">
                              Class Resource
                            </h1>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid
                          container
                          direction="column"
                          alignItems="center"
                          className="teacherDash_classResourceBoxBottom"
                        >
                          <Grid item>
                            <ClassResource
                              resourceList={classDetails.resources}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid
                          container
                          direction="row"
                          alignItems="center"
                          className="teacherDashboard_bottomPart"
                        >
                          <Grid item className="teacherDash_uploadIcon">
                            <FileUpload
                              label="Upload"
                              acceptedFiles={[
                                "application/msword",
                                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                                "image/jpeg",
                                "image/png",
                                "application/pdf",
                                "application/vnd.ms-powerpoint",
                                "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                                "application/vnd.rar",
                                "application/x-tar",
                                "application/zip",
                                "application/x-7z-compressed",
                                "application/x-zip-compressed",
                              ]}
                              handleSave={(files) => {
                                handleUploadSave(files);
                              }}
                            />
                          </Grid>
                          {optionFile && optionFile.length ? (
                            <Grid item className="teacherDash_submitContainer">
                              <Button
                                onMouseOver={() => {
                                  setButtonType(false);
                                }}
                                onMouseOut={() => {
                                  setButtonType(true);
                                }}
                                variant={buttonType ? "outlined" : "contained"}
                                color="primary"
                                onClick={() => {
                                  handleSubmit();
                                }}
                                className="teacherDash_crossbutton"
                              >
                                Upload
                              </Button>
                            </Grid>
                          ) : (
                            <></>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>

                    {/*Attendance part*/}
                    {/* <Grid
                      container
                      direction="column"
                      className="teacherDash_classResourceBoxInside"
                    >
                      <Grid item>
                        <Grid
                          container
                          direction="row"
                          alignItems="center"
                          className="teacherDash_classResourceBoxTop"
                        >
                          <div className="teacherDash_smallPurpleBox"></div>
                          <h1 className="teacherDash_classResourceTitle">
                            Attendance
                          </h1>
                          <Button
                            onMouseOver={() => {
                              setButtonType(false);
                            }}
                            onMouseOut={() => {
                              setButtonType(true);
                            }}
                            variant={buttonType ? "outlined" : "contained"}
                            color="primary"
                            onClick={postAttendance}
                            className="teacherDash_doneAttendanceButton"
                          >
                            Done
                          </Button>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid
                          container
                          direction="column"
                          alignItems="center"
                          className="teacherDash_classResourceBoxBottom"
                          wrap="nowrap"
                        >
                          {students.map((user) => (
                            <Student
                              id={user.id}
                              username={user.name}
                              src={user.profile_image}
                              idSet={setIDs}
                              userIdArray={ids}
                              doneClicked={doneState}
                            />
                          ))}
                        </Grid>
                      </Grid>
                    </Grid> */}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item className="teacherDash_middleContainer" xs={8}>
                <Grid item className="teacherDash_discussionBoxContainer">
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
            className="teacherDashboard_noClassContainer"
          >
            <div className="teacherDashboard_noClassImage">
              <Image src={noClass} />
              <p className="teacherDashboard_noClass">
                No active class sessions!
              </p>
            </div>
          </Grid>
        </Grid>
      </ConditionalRendering>
    </DashboardLayout>
  );
};

export default Dashboard;
