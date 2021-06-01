import React, { useState } from "react";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import colorscheme from "../../utils/colors";
import DashboardLayout from "../../components/DashboardLayout";
import AdminBoxSmall from "../../components/AdminBoxSmall";
import { GoPlus } from "react-icons/go";
import { Formik, Form } from "formik";
import CustomTextField from "../../components/CustomTextField";
import "./statics/css/commonView.css";
import Button from "../../components/Button";
import { ImCross } from "react-icons/im";
import { useAPI } from "../../utils/useAPI";
import callAPI from "../../utils/API";
import {
  Redirect,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";

const SchoolView = () => {
  const history = useHistory();
  const [isPopUp, setPopUp] = useState(false);
  const validationSchema = yup.object({
    name: yup.string("Enter School Name").required("School Name Required"),
    address: yup.string("Enter your Address").required("Address Required"),
  });
  const onSubmit = async (values) => {
    allSchool.push(values);
    try {
      await callAPI({
        endpoint: `/api/v1/school/`,
        method: "POST",
        data: values,
      });
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
              <p className="adminCommon_text">Schools</p>
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
            justify="center"
            alignItems="center"
            spacing={5}
          >
            {allSchool && allSchoolComplete ? (
              allSchool.map((school) => (
                <Grid item key={school.id} xs={6}>
                  <AdminBoxSmall
                    type="school"
                    cardData={school}
                    onSubmit={() => {
                      history.push("/admin/department/" + school.id);
                      console.log(history);
                    }}
                  />
                </Grid>
              ))
            ) : (
              <></>
            )}
          </Grid>
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
                      <Button
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
