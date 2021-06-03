import React, { useState, useContext, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { Formik, Form, FieldArray, Field } from "formik";
import CustomTextField from "../../components/CustomTextField";
import DashboardLayout from "../../components/DashboardLayout";
import Button from "../../components/Button";
import DateFnsUtils from "@date-io/date-fns";
import { BiMinus } from "react-icons/bi";
import * as yup from "yup";
import { GoPlus } from "react-icons/go";
import { format } from "date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { BiTimeFive } from "react-icons/bi";
import colorscheme from "../../utils/colors";
import "./statics/css/classSessionCreator.css";
import useAPI from "../../utils/useAPI.jsx";
import { UserContext } from "../../utils/Contexts/UserContext.jsx";
import { get } from "idb-keyval";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import callAPI from "../../utils/API.jsx";
import ConditionalRendering from "../../components/ConditionalRendering";

const validationSchema = yup.object({
  start_time: yup.date().required("Start time is required!"),
  end_time: yup.date().required("End time is required!"),
});

const ClassSessionCreator = () => {
  const [selectFile, setSelectedFile] = useState();
  const { user } = useContext(UserContext);
  const [pageState, setPageState] = useState(1);

  const [group, setGroup] = useState(null);

  const teacherFormatter = (values) => {
    return values.data.map((item) => {
      return {
        id: item.id,
        name: item.full_name,
      };
    });
  };

  const [teacher] = useAPI(
    { endpoint: "/api/v1/users/teacher" },
    teacherFormatter,
    []
  );

  const onFileUpload = async (e) => {
    setSelectedFile(e.target.files);
  };

  const onSubmit = async (values) => {
    let formData = new FormData();
    formData.append("start_time", values.start_time.toISOString());
    formData.append("end_time", values.end_time.toISOString());
    if (values.instructors) {
      values.instructors.map((instructor) => {
        formData.append("instructor", instructor);
      });
    }
    formData.append("group", values.group);
    formData.append("description", values.description);
    if (selectFile) {
      [...selectFile].map((item) => {
        formData.append("file", item);
      });
    }

    let resp = await callAPI({
      endpoint: "/api/v1/class_session",
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (resp.status == 200) {
      setPageState(2);
    }
  };

  return (
    <>
      <DashboardLayout>
        <ConditionalRendering condition={pageState == 1}>
          <Grid
            container
            direction="column"
            alignItems="flex-start"
            justify="flex-start"
            className="classSession_root"
          >
            <Grid item className="classSession_heading">
              <a className="classSession_headingText">Create Class Session</a>
            </Grid>
            <Grid item className="classSession_body">
              <Formik
                initialValues={{
                  start_time: null,
                  end_time: null,
                  group: "",
                  description: "",
                  instructors: [],
                }}
                onSubmit={onSubmit}
              >
                {({ values, setFieldValue }) => (
                  <>
                    <Form>
                      <Grid
                        item
                        className="classSession_dateTimePickerContainerOuter"
                      >
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <Grid
                            container
                            direction="row"
                            alignItems="center"
                            justify="center"
                            className="classSession_dateTimePickerContainer"
                            spacing={3}
                          >
                            <Grid item>
                              <KeyboardDateTimePicker
                                margin="normal"
                                id="start_time"
                                minutesStep={5}
                                label="Start time"
                                inputVariant="outlined"
                                value={values.start_time}
                                onChange={(value: Date) => {
                                  setFieldValue("start_time", value);
                                }}
                                KeyboardButtonProps={{
                                  "aria-label": "change time",
                                }}
                                keyboardIcon={<BiTimeFive />}
                              />
                            </Grid>
                            <Grid item>
                              <KeyboardDateTimePicker
                                minutesStep={5}
                                margin="normal"
                                id="end_time"
                                label="End time"
                                inputVariant="outlined"
                                value={values.end_time}
                                onChange={(value) => {
                                  setFieldValue("end_time", value);
                                }}
                                KeyboardButtonProps={{
                                  "aria-label": "change time",
                                }}
                                keyboardIcon={<BiTimeFive />}
                              />
                            </Grid>
                          </Grid>
                        </MuiPickersUtilsProvider>
                      </Grid>
                      <Grid
                        item
                        className="classSession_instructorContainerOuter"
                      >
                        <Grid
                          container
                          direction="column"
                          alignItems="center"
                          justify="center"
                          className="classSession_instructorContainer"
                        >
                          <FieldArray name="instructors">
                            {(arrayHelpers) => (
                              <>
                                {values.instructors &&
                                  values.instructors.length !== 0 &&
                                  values.instructors.map(
                                    (instructor, index) => (
                                      <>
                                        <div key={index}>
                                          <Grid
                                            item
                                            className="classSession_instructorFieldOuter"
                                          >
                                            <Grid
                                              container
                                              direction="row"
                                              className="classSession_instructorField"
                                              alignItems="center"
                                              justify="center"
                                            >
                                              <Grid
                                                item
                                                xs={10}
                                                className="classSession_instructorFieldInner"
                                              >
                                                <Autocomplete
                                                  id="combo-box-demo"
                                                  options={teacher}
                                                  getOptionLabel={(option) =>
                                                    option.name
                                                  }
                                                  onChange={(e, value) => {
                                                    arrayHelpers.replace(
                                                      index,
                                                      value.id
                                                    );
                                                  }}
                                                  style={{ width: 300 }}
                                                  renderInput={(params) => (
                                                    <TextField
                                                      {...params}
                                                      name={`instructors[${index}]`}
                                                      placeHolder="Add Other Instructors"
                                                      addStyles="classSession_inputField"
                                                      label="Combo box"
                                                      variant="outlined"
                                                    />
                                                  )}
                                                />
                                              </Grid>

                                              <Grid item xs={2}>
                                                <button
                                                  type="button"
                                                  onClick={() =>
                                                    arrayHelpers.remove(index)
                                                  }
                                                  className="classSession_removeButton"
                                                >
                                                  <BiMinus
                                                    size={20}
                                                    color={colorscheme.red2}
                                                  />
                                                </button>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                        </div>
                                      </>
                                    )
                                  )}
                                <Grid item>
                                  <button
                                    type="button"
                                    title="Add Other Instructor"
                                    onClick={() => arrayHelpers.push()}
                                    className="classSession_addInstructor"
                                  >
                                    + Other Instructor
                                  </button>
                                </Grid>
                              </>
                            )}
                          </FieldArray>
                          <Grid
                            container
                            direction="column"
                            alignItems="center"
                            justify="center"
                          >
                            <Grid item>
                              <CustomTextField
                                name="group"
                                placeHolder="Group"
                                dropdown={true}
                                menuItems={user.teacher_group.map((group) => {
                                  return {
                                    name: `${group.group.program.name} Sem: ${group.group.sem}`,
                                    value: group.group.id,
                                  };
                                })}
                                addStyles="classSession_inputField"
                              />
                            </Grid>
                            <Grid item className="classSession_description">
                              <CustomTextField
                                name="description"
                                placeHolder="Enter description"
                                addStyles="classSession_inputField"
                              />
                            </Grid>
                            <Grid item className="classSession_upload">
                              <label htmlFor="resources">
                                <p className="classSession_uploadText">
                                  Upload resources:
                                </p>
                              </label>
                              <input
                                id="resources"
                                name="resources"
                                type="file"
                                multiple={true}
                                onChange={onFileUpload}
                                accept=".jpg,.jpeg,.png,.pdf,.pptx,.ppt,.7z,.zip,.rar,.doc,.docx"
                              ></input>
                            </Grid>
                          </Grid>

                          <Grid item>
                            <Button
                              name="Submit"
                              type="submit"
                              addStyles="classSession_submit"
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Form>
                  </>
                )}
              </Formik>
            </Grid>
          </Grid>
        </ConditionalRendering>
        <ConditionalRendering condition={pageState == 2}>
          <h1>Class session has been successfully created!</h1>
        </ConditionalRendering>
      </DashboardLayout>
    </>
  );
};

export default ClassSessionCreator;
