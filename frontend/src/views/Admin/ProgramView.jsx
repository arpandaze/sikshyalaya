import React, { useState, useEffect } from "react";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import colorscheme from "../../utils/colors";
import DashboardLayout from "../../components/DashboardLayout";
import AdminBoxSmall from "../../components/AdminBoxSmall";
import { GoPlus } from "react-icons/go";
import "./statics/css/commonView.css";
import useAPI from "../../utils/useAPI";
import callAPI from "../../utils/API";
import Button from "../../components/Button";
import { ImCross } from "react-icons/im";
import { Formik, Form } from "formik";
import CustomTextField from "../../components/CustomTextField";
import {
  Redirect,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";

const ProgramView = ({ match, location }) => {
  const history = useHistory();
  const defaultProgram = [];
  const defaultDepartment = "";
  const [isPopUp, setPopUp] = useState(false);
  const validationSchema = yup.object({
    name: yup.string("Enter Program Name").required("Program Name Required"),
  });
  const onSubmit = async (values) => {
    values = {
      ...values,
      department_id: match.params.department,
    };
    allProgram.push(values);
    try {
      await callAPI({
        endpoint: `/api/v1/program/`,
        method: "POST",
        data: values,
      });
    } catch (e) {}
    setPopUp(false);
  };
  const departmentFormatter = (response) => {
    if (!response.data) {
      return "";
    }
    return response.data.name;
  };
  const programFormatter = (response) => {
    if (response.data.length === 0) {
      return [];
    }
    let responseData = [];
    responseData = response.data.map((department) => {
      let formattedResponseData = {
        id: department.id,
        name: department.name,
        department_id: department.department_id,
      };
      return formattedResponseData;
    });
    const finalData = responseData.filter(
      (response) => response.department_id == match.params.department
    );
    return finalData;
  };
  let [allProgram, allProgramComplete] = useAPI(
    { endpoint: `/api/v1/program/` },
    programFormatter,
    defaultProgram
  );

  let [departmentName, departmentNameComplete] = useAPI(
    { endpoint: `/api/v1/deparment/${match.params.department}` },
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
              <p className="adminCommon_text">{departmentName}</p>
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
            {allProgram.map((program) => (
              <Grid item key={program.id} xs={6}>
                <AdminBoxSmall
                  type="program"
                  onSubmit={() => {
                    history.push("/admin/group/" + program.id);
                  }}
                  cardData={program}
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
          className="adminProgram_popUpContainer"
        >
          <Grid item className="adminProgram_popUpBox">
            <Grid container direction="column" className="adminProgram_formBox">
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
                        addStyles="adminProgram_inputButton"
                      />
                    </Grid>

                    <Grid item className="adminProgram_submitButtonContainer">
                      <Button
                        type="submit"
                        name="Submit"
                        addStyles="adminProgram_submitButton"
                      />
                    </Grid>
                  </Grid>
                </Form>
              </Formik>
            </Grid>
            <Grid item className="adminProgram_closeButtonContainer">
              <ImCross
                color={colorscheme.red3}
                className="adminProgram_closeButton"
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

export default ProgramView;
