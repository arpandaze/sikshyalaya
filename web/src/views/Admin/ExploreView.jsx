import React, { useState } from "react";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import colorscheme from "../../utils/colors";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import AdminBoxSmall from "./components/AdminBoxSmall";
import { GoPlus } from "react-icons/go";
import { Formik, Form } from "formik";
import CustomTextField from "../../components/CustomTextField";
import "./statics/css/commonView.css";
import CustomButton from "../../components/CustomButton";
import { ImCross } from "react-icons/im";
import useAPI from "../../utils/useAPI";
import callAPI from "../../utils/API";
import { useHistory } from "react-router-dom";

const SchoolView = ({ location }) => {
  const history = useHistory();
  const [isPopUp, setPopUp] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const validationSchema = yup.object({
    name: yup.string("Enter School Name").required("School Name Required"),
    address: yup.string("Enter your Address").required("Address Required"),
  });
  const handeTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const onSubmit = async (values) => {
    const position = allSchool.push(values);
    try {
      const responseData = await callAPI({
        endpoint: `/api/v1/school/`,
        method: "POST",
        data: values,
      });
      allSchool[position - 1].id = responseData.data.id;
    } catch (e) {}
    setPopUp(false);
  };
  const defaultSchool = [];
  const schoolFormatter = (response) => {
    if (response.data.length === 0) {
      return [];
    }
    let responseData = [];
    responseData = response.data.map((school) => {
      let formattedResponseData = {
        id: school.id,
        name: school.name,
        address: school.address,
      };
      return formattedResponseData;
    });
    return responseData;
  };

  let [allSchool, allSchoolComplete] = useAPI(
    { endpoint: "/api/v1/school/" },
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
              <Grid container direction="row" alignItems="center">
                <Grid xs={11} item>
                  <p className="adminCommon_text">
                    {location.state ? location.state.message : "Schools"}
                  </p>
                </Grid>
                <Grid xs={1} item className="adminCommon_plusIcon">
                  <div className="adminCommon_plusIconContainer">
                    <GoPlus
                      size={25}
                      onClick={() => {
                        setPopUp(true);
                      }}
                      color={colorscheme.green2}
                    />
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item className="adminCommon_botBar">
          {tabValue == 0 ? (
            <Grid container direction="row">
              {allSchool && allSchoolComplete ? (
                allSchool.map((school) => (
                  <Grid
                    item
                    key={school.id}
                    xs={6}
                    className="adminCommon_mainBox"
                  >
                    <AdminBoxSmall
                      type="school"
                      cardData={school}
                      onSubmit={() => {
                        history.push({
                          pathname: "/admin/explore/school",
                          state: { school: school },
                        });
                      }}
                    />
                  </Grid>
                ))
              ) : (
                <></>
              )}
            </Grid>
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
      {isPopUp ? (
        <Grid container justify="center" className="adminSchool_popUpContainer">
          <Grid item className="adminSchool_popUpBox">
            <Grid container direction="column" className="adminSchool_formBox">
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
                        addStyles="adminSchool_inputButton"
                      />
                    </Grid>

                    <Grid item>
                      <CustomTextField
                        id="address"
                        name="address"
                        placeHolder="Address"
                        addStyles="adminSchool_inputButton"
                      />
                    </Grid>
                    <Grid item className="adminSchool_submitButtonContainer">
                      <CustomButton
                        type="submit"
                        name="Submit"
                        addStyles="adminSchool_submitButton"
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

export default SchoolView;
