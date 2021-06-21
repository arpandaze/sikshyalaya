import React, { useState, useEffect } from "react";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import colorscheme from "../../utils/colors";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import Students from "./components/Student";
import { GoPlus } from "react-icons/go";
import "./statics/css/commonView.css";
import useAPI from "../../utils/useAPI";
import Button from "../../components/Button";
import { ImCross } from "react-icons/im";
import { Formik, Form } from "formik";
import callAPI from "../../utils/API";
import CustomTextField from "../../components/CustomTextField";
import { useHistory } from "react-router-dom";
import { DatePicker } from "../../components/CustomDateTime";
import AdminBoxSmall from "./components/AdminBoxSmall";

const validationSchema = yup.object({
  full_name: yup.string("Enter your name").required("Name is required"),
  address: yup.string("Enter your address").required("Address is required"),
  join_year: yup.number("Enter Joined Year").required("Join year is required"),
  dob: yup.string("Enter Date of Birth").required("Date of Birth is required"),
  phone_number: yup.number().typeError("Not a valid phone number"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email!")
    .required("Email is required"),
  semester: yup.number().required("Semester is required"),
  program: yup.number().required("Program is required"),
});

const CourseView = ({ location, ...rest }) => {
  const history = useHistory();
  const [isPopUp, setPopUp] = useState(false);
  const [editState, setEditState] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const defaultCourse = [];

  const courseFormatter = (response) => {
    if (response.data.length === 0) {
      return [];
    }
    let responseData = [];
    responseData = response.data.map((course) => {
      let formattedResponseData = {
        id: course.id,
        code: course.course_code,
        name: course.course_name,
        credit: course.course_credit,
        department_id: course.department_id,
      };
      return formattedResponseData;
    });
    return responseData;
  };

  let [allCourses] = useAPI(
    { endpoint: `/api/v1/course/` },
    courseFormatter,
    defaultCourse
  );

  const onSubmit = async (data) => {};

  return (
    <DashboardLayout>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
        className="adminCommon_root"
        wrap="nowrap"
      >
        <Grid item className="adminCommon_topBarContainer">
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            className="adminCommon_topBar"
          >
            <Grid xs item className="adminCommon_textContainer">
              <p className="adminCommon_text">Courses</p>
            </Grid>
            <Grid xs={1} item className="adminCommon_plusIcon">
              <GoPlus
                size={30}
                color={colorscheme.green2}
                onClick={() => {
                  setPopUp(true);
                }}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item className="adminCommon_botBar">
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            className="adminCommon_innerContainer"
            wrap="wrap"
          >
            <Grid container direction="row">
              {allCourses.map((course) => (
                <Grid
                  item
                  key={course.id}
                  xs={6}
                  className="adminCommon_mainBox"
                >
                  <AdminBoxSmall
                    type="course"
                    onSubmit={() => {
                      history.push({
                        pathname: "/admin/explore/program",
                        state: {},
                      });
                    }}
                    cardData={course}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {isPopUp ? (
        <Grid
          container
          justify="center"
          className="adminTeacher_popUpContainer"
        >
          <Grid item className="adminTeacher_popUpBox">
            <Grid container direction="column" className="adminTeacher_formBox">
              <Formik
                enableReinitialize={true}
                initialValues={
                  selectedUser
                    ? {
                        full_name: selectedUser.full_name,
                        address: selectedUser.address,
                        program: selectedUser.program,
                        semester: selectedUser.semester,
                        join_year: selectedUser.join_year,
                        dob: selectedUser.dob,
                        email: selectedUser.email,
                        phone_number: selectedUser.contact_number,
                      }
                    : {
                        full_name: "",
                        address: "",
                        program: "",
                        semester: "",
                        join_year: "",
                        dob: null,
                        phone_number: "",
                        email: "",
                        password: "",
                        confirm_password: "",
                      }
                }
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                <Form>
                  <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                  >
                    <Grid item xs={6} style={{ padding: "0px 20px 0px 0px" }}>
                      <CustomTextField
                        name="full_name"
                        type="text"
                        placeHolder="Full Name"
                        id="full_name"
                        addStyles="adminTeacher_inputButton"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CustomTextField
                        name="address"
                        type="text"
                        placeHolder="Address"
                        id="address"
                        addStyles="adminTeacher_inputButton"
                      />
                    </Grid>
                    <Grid item xs={6} style={{ padding: "0px 20px 0px 0px" }}>
                      <CustomTextField
                        id="join_year"
                        name="join_year"
                        placeHolder="Join"
                        label="Join year"
                        type="text"
                        className="adminTeacher_inputButton"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <DatePicker
                        id="dob"
                        label="Birth Date"
                        className="adminTeacher_inputButton"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomTextField
                        name="phone_number"
                        type="text"
                        placeHolder="Phone Number"
                        id="phone_number"
                        addStyles="adminTeacher_inputButton"
                        autoComplete="on"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomTextField
                        name="email"
                        type="text"
                        placeHolder="Email"
                        id="email"
                        addStyles="adminTeacher_inputButton"
                        autoComplete="on"
                      />
                    </Grid>
                    <Grid item className="adminTeacher_submitButtonContainer">
                      <Button
                        name="Save"
                        type="submit"
                        addStyles="adminTeacher_submitButton"
                      />
                    </Grid>
                  </Grid>
                </Form>
              </Formik>
            </Grid>
            <Grid item className="adminSchool_closeButtonContainer">
              <ImCross
                color={colorscheme.red3}
                className="adminSchool_closeButton"
                onClick={() => {
                  setPopUp(false);
                  setEditState(false);
                  setSelectedUser(null);
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <></>
      )}
    </DashboardLayout>
  );
};

export default CourseView;
