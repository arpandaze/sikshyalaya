import React, { useState, useEffect, useRef } from "react";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import colorscheme from "../../utils/colors";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import AdminBoxSmall from "./components/AdminBoxSmall";
import { GoPlus } from "react-icons/go";
import "./statics/css/commonView.css";
import useAPI from "../../utils/useAPI";
import callAPI from "../../utils/API";
import Button from "../../components/Button";
import { ImCross } from "react-icons/im";
import { Formik, Form } from "formik";
import CustomTextField from "../../components/CustomTextField";
import { Link, useHistory } from "react-router-dom";
import {} from "react-router-dom";

const CourseView = ({ location }) => {
  const history = useHistory();
  const mountRef = useRef(true);
  const prevData = location.state
    ? location.state
    : { school: { id: "", name: "" } };
  const defaultDepartment = [];
  const defaultSchool = "";
  const [isPopUp, setPopUp] = useState(false);
  const validationSchema = yup.object({
    name: yup
      .string("Enter Department Name")
      .required("Department Name Required"),
  });
  const onSubmit = async (values) => {
    values = {
      ...values,
      school_id: prevData.school.id,
    };
    const position = allDepartment.push(values);
    try {
      const responseData = await callAPI({
        endpoint: `/api/v1/department/`,
        method: "POST",
        data: values,
      });
      allDepartment[position - 1].id = responseData.data.id;
    } catch (e) {}
    setPopUp(false);
  };
  const departmentFormatter = (response) => {
    if (response.data.length === 0) {
      return [];
    }
    let responseData = [];
    responseData = response.data.map((department) => {
      let formattedResponseData = {
        id: department.id,
        name: department.name,
        school_id: department.school_id,
      };
      return formattedResponseData;
    });
    const finalData = responseData.filter(
      (response) => response.school_id == prevData.school.id
    );
    return finalData;
  };
  let [allDepartment, allDepartmentComplete] = useAPI(
    { endpoint: `/api/v1/department/` },
    departmentFormatter,
    defaultDepartment
  );

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
              <p className="adminCommon_text">{prevData.school.name}</p>
              <p className="adminCommon_smallNav">
                <Link
                  to={{
                    pathname: "/admin/school",
                  }}
                  className="adminCommon_smallNavLinks"
                >
                  {" "}
                  School{" "}
                </Link>{" "}
                &gt;{" "}
                <Link
                  to={{
                    pathname: "/admin/department",
                    state: { ...prevData },
                  }}
                  href=""
                  className="adminCommon_smallNavLinks"
                >
                  {prevData.school.name}
                </Link>
              </p>
            </Grid>
            <Grid xs={1} item className="adminCommon_plusIcon">
              <GoPlus
                size={30}
                onClick={() => {
                  setPopUp(true);
                }}
                color={colorscheme.green2}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item className="adminCommon_botBar">
          <Grid container direction="row" alignItems="center" spacing={5}>
            {allDepartment.map((department) => (
              <Grid item key={department.id} xs={6}>
                <AdminBoxSmall
                  type="department"
                  key={department.id}
                  cardData={department}
                  onSubmit={() => {
                    history.push({
                      pathname: "/admin/program",
                      state: {
                        school: prevData.school,
                        department: department,
                      },
                    });
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      {isPopUp ? (
        <Grid
          container
          justify="center"
          className="adminDepartment_popUpContainer"
        >
          <Grid item className="adminDepartment_popUpBox">
            <Grid
              container
              direction="column"
              className="adminDepartment_formBox"
            >
              <Formik
                initialValues={{
                  name: "",
                }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                <Form>
                  <Grid container direction="column" alignItems="flex-start">
                    <Grid item>
                      <CustomTextField
                        id="name"
                        name="name"
                        placeHolder="Name"
                        addStyles="adminDepartment_inputButton"
                      />
                    </Grid>

                    <Grid
                      item
                      className="adminDepartment_submitButtonContainer"
                    >
                      <Button
                        type="submit"
                        name="Submit"
                        addStyles="adminDepartment_submitButton"
                      />
                    </Grid>
                  </Grid>
                </Form>
              </Formik>
            </Grid>
            <Grid item className="adminDepartment_closeButtonContainer">
              <ImCross
                color={colorscheme.red3}
                className="adminDepartment_closeButton"
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
