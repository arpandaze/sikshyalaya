import React, { useState, useEffect } from "react";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import colorscheme from "../../utils/colors";
import DashboardLayout from "../../components/DashboardLayout";
import AdminBoxSmall from "./components/AdminBoxSmall";
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

const GroupView = ({ match, location }) => {
  const history = useHistory();
  const defaultGroup = [];
  const defaultProgram = "";
  const [isPopUp, setPopUp] = useState(false);
  const validationSchema = yup.object({
    name: yup.string("Enter Program Name").required("Program Name Required"),
  });
  const onSubmit = async (values) => {
    values = {
      ...values,
      department_id: match.params.program,
    };
    allGroup.push(values);
    try {
      await callAPI({
        endpoint: `/api/v1/program/`,
        method: "POST",
        data: values,
      });
    } catch (e) {}
    setPopUp(false);
  };
  const programFormatter = (response) => {
    if (!response.data) {
      return "";
    }
    return response.data.name;
  };
  const groupFormatter = (response) => {
    if (response.data.length === 0) {
      return [];
    }
    let responseData = [];
    responseData = response.data.map((group) => {
      let formattedResponseData = {
        id: group.id,
        name: "Semester " + group.sem,
        program_id: group.program.id,
      };
      return formattedResponseData;
    });
    const finalData = responseData.filter(
      (response) => response.program_id == match.params.program
    );
    console.log(finalData);
    return finalData;
  };

  let [allGroup, allGroupComplete] = useAPI(
    { endpoint: `/api/v1/group/` },
    groupFormatter,
    defaultGroup
  );

  let [programName, programNameComplete] = useAPI(
    { endpoint: `/api/v1/program/${match.params.program}` },
    programFormatter,
    defaultProgram
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
              <p className="adminCommon_text">{programName}</p>
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
            {allGroup.map((group) => (
              <Grid item key={group.id} xs={6}>
                <AdminBoxSmall
                  type="group"
                  onSubmit={() => {
                    history.push("/admin/student/" + group.id);
                  }}
                  cardData={group}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      {isPopUp ? (
        <Grid container justify="center" className="adminGroup_popUpContainer">
          <Grid item className="adminGroup_popUpBox">
            <Grid container direction="column" className="adminGroup_formBox">
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
                        addStyles="adminGroup_inputButton"
                      />
                    </Grid>

                    <Grid item className="adminGroup_submitButtonContainer">
                      <Button
                        type="submit"
                        name="Submit"
                        addStyles="adminGroup_submitButton"
                      />
                    </Grid>
                  </Grid>
                </Form>
              </Formik>
            </Grid>
            <Grid item className="adminGroup_closeButtonContainer">
              <ImCross
                color={colorscheme.red3}
                className="adminGroup_closeButton"
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

export default GroupView;
