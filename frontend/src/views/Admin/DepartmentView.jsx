import React, { useState, useEffect } from "react";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import colorscheme from "../../utils/colors";
import DashboardLayout from "../../components/DashboardLayout";
import AdminBoxSmall from "../../components/AdminBoxSmall";
import { GoPlus } from "react-icons/go";
import "./statics/css/commonView.css";
import { useAPI } from "../../utils/useAPI";
import callAPI from "../../utils/API";
import Button from "../../components/Button";
import { ImCross } from "react-icons/im";
import { Formik, Form } from "formik";
import CustomTextField from "../../components/CustomTextField";
import {
  Redirect,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";

const DepartmentView = ({ match, location }) => {
  const history = useHistory();
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
      school_id: match.params.school,
    };
    allDepartment.push(values);
    try {
      await callAPI({
        endpoint: `/api/v1/deparment/`,
        method: "POST",
        data: values,
      });
    } catch (e) {}
    setPopUp(false);
  };
  const schoolFormatter = (response) => {
    if (!response.data) {
      return "";
    }
    return response.data.name;
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
      (response) => response.school_id == match.params.school
    );
    return finalData;
  };
  let [allDepartment, allDepartmentComplete] = useAPI(
    { endpoint: `/api/v1/deparment/` },
    departmentFormatter,
    defaultDepartment
  );

  let [schoolName, schoolNameComplete] = useAPI(
    { endpoint: `/api/v1/school/${match.params.school}` },
    schoolFormatter,
    defaultSchool
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
              <p className="adminCommon_text">{schoolName}</p>
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
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={5}
          >
            {allDepartment.map((department) => (
              <Grid item key={department.id} xs={6}>
                <AdminBoxSmall
                  type="department"
                  onSubmit={() => {
                    history.push("/admin/program/" + department.id);
                  }}
                  cardData={department}
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
                  address: "",
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

export default DepartmentView;
