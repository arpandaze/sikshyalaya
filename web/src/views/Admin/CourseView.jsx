import React, { useState } from "react";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import colorscheme from "../../utils/colors";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import { GoPlus } from "react-icons/go";
import "./statics/css/commonView.css";
import useAPI from "../../utils/useAPI";
import CustomButton from "../../components/CustomButton";
import { ImCross } from "react-icons/im";
import { Formik, Form } from "formik";
import callAPI from "../../utils/API";
import CustomTextField from "../../components/CustomTextField";
import { useHistory } from "react-router-dom";
import AdminBoxSmall from "./components/AdminBoxSmall";

const validationSchema = yup.object({
  course_name: yup
    .string("Enter Course Name")
    .required("Course Name is required"),
  course_code: yup
    .string("Enter Course Code")
    .required("Course Code is required"),
  course_credit: yup
    .number("Enter Course Credit")
    .typeError("Invalid Input")
    .required("Course Credit is required"),
  department_id: yup
    .number("Enter Department")
    .typeError("Invalid Input")
    .required("Course Credit is required"),
});

const CourseView = ({ location, ...rest }) => {
  const history = useHistory();
  const [isPopUp, setPopUp] = useState(false);
  const defaultCourse = [];
  let creditList = [
    { name: "1", value: "1" },
    { name: "2", value: "2" },
    { name: "3", value: "3" },
    { name: "4", value: "4" },
  ];
  const departmentFormatter = (value) =>
    value.data.map((item) => ({
      name: item.name,
      value: item.id,
    }));
  const [department] = useAPI(
    { endpoint: "/api/v1/department/" },
    departmentFormatter
  );
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

  const onSubmit = async (values) => {
    const data = {
      course_code: values.course_code,
      course_name: values.course_name,
      course_credit: parseInt(values.course_credit),
      department_id: values.department_id,
    };
    const position = allCourses.push({
      code: values.course_code,
      name: values.course_name,
      credit: parseInt(values.course_credit),
      department_id: values.department_id,
    });
    try {
      const responseData = await callAPI({
        endpoint: `/api/v1/course/`,
        method: "POST",
        data: data,
      });
      allCourses[position - 1].id = responseData.data.id;
    } catch (e) {}
    setPopUp(false);
  };

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
              <div className="adminCommon_plusIconContainer">
                <GoPlus
                  size={25}
                  color={colorscheme.green2}
                  onClick={() => {
                    setPopUp(true);
                  }}
                />
              </div>
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
                  <AdminBoxSmall type="course" cardData={course} />
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
                initialValues={{
                  course_name: "",
                  course_code: "",
                  course_credit: null,
                  department_id: null,
                }}
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
                    <Grid item xs={12} style={{ padding: "0px 20px 0px 0px" }}>
                      <CustomTextField
                        name="course_name"
                        type="text"
                        placeHolder="Course Name"
                        id="course_name"
                        addStyles="adminTeacher_inputButton"
                      />
                    </Grid>
                    <Grid item xs={12} style={{ padding: "0px 20px 0px 0px" }}>
                      <CustomTextField
                        name="course_code"
                        type="text"
                        placeHolder="Course Code"
                        id="course_code"
                        addStyles="adminTeacher_inputButton"
                      />
                    </Grid>
                    <Grid item xs={12} style={{ padding: "0px 20px 0px 0px" }}>
                      <CustomTextField
                        name="course_credit"
                        dropdown={true}
                        type="text"
                        placeHolder="Credit"
                        menuItems={creditList}
                        id="credit"
                        addStyles="adminStudent_inputButton"
                      />
                    </Grid>

                    <Grid item xs={12} style={{ padding: "0px 20px 0px 0px" }}>
                      <CustomTextField
                        name="department_id"
                        dropdown={true}
                        type="text"
                        placeHolder="Department"
                        menuItems={department || []}
                        id="department_id"
                        addStyles="adminStudent_inputButton"
                      />
                    </Grid>
                    <Grid item className="adminTeacher_submitButtonContainer">
                      <CustomButton
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
