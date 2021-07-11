import React, { useState, useEffect } from "react";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import colorscheme from "../../utils/colors";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import AdminBoxSmall from "./components/AdminBoxSmall";
import { GoPlus } from "react-icons/go";
import "./statics/css/commonView.css";
import useAPI from "../../utils/useAPI";
import callAPI from "../../utils/API";
import CustomButton from "../../components/CustomButton";
import { ImCross } from "react-icons/im";
import { Formik, Form } from "formik";
import CustomTextField from "../../components/CustomTextField";
import { useHistory } from "react-router-dom";

const GroupView = ({ match, location }) => {
  const history = useHistory();
  const prevData = location.state
    ? location.state
    : {
        school: { id: "", name: "" },
        department: { id: "", name: "" },
        program: { id: "", name: "" },
      };
  const defaultGroup = [];
  const defaultProgram = "";
  const [isPopUp, setPopUp] = useState(false);
  const validationSchema = yup.object({
    sem: yup
      .number("Enter Semester Number")
      .required("Semester Number Required"),
  });
  const onSubmit = async (values) => {
    const data = {
      sem: values.sem,
      program_id: prevData.program.id,
      course: [],
    };
    const dataLocal = {
      ...data,
      name: "Semester " + values.sem,
    };
    const position = allGroup.push(dataLocal);
    try {
      const responseData = await callAPI({
        endpoint: `/api/v1/group/`,
        method: "POST",
        data: data,
      });
      allGroup[position - 1].id = responseData.data.id;
    } catch (e) {}
    setPopUp(false);
  };
  const programFormatter = (response) => {
    if (!response.data) {
      return "";
    }
    return response.data.name;
  };
  useEffect(() => {
    if (!location.state) {
      history.replace({
        pathname: "/admin/explore",
        state: { message: "Choose a School" },
      });
    }
    return () => {
      setPopUp();
    };
  }, [location]);
  const groupFormatter = (response) => {
    if (response.data.length === 0) {
      return [];
    }
    let responseData = [];
    responseData = response.data.groups.map((group) => {
      let formattedResponseData = {
        id: group.id,
        name: "Semester " + group.sem,
      };
      return formattedResponseData;
    });
    return responseData;
  };

  let [allGroup, allGroupComplete] = useAPI(
    { endpoint: `/api/v1/program/${prevData.program.id}/group/` },
    groupFormatter,
    defaultGroup
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
                  <p className="adminCommon_text">{prevData.program.name}</p>
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
              {/* <p className="adminCommon_smallNav">
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
                    state: {
                      school: prevData.school,
                    },
                  }}
                  className="adminCommon_smallNavLinks"
                >
                  {prevData.school.name}
                </Link>{" "}
                &gt;{" "}
                <Link
                  to={{
                    pathname: "/admin/program",
                    state: {
                      school: prevData.school,
                      department: prevData.department,
                    },
                  }}
                  className="adminCommon_smallNavLinks"
                >
                  {prevData.department.name}
                </Link>{" "}
                &gt;{" "}
                <Link
                  to={{
                    pathname: "/admin/group",
                    state: { ...prevData },
                  }}
                  className="adminCommon_smallNavLinks"
                >
                  {prevData.program.name}
                </Link>
              </p> */}
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
                    history.push({
                      pathname: "/admin/explore/group",
                      state: {
                        school: prevData.school,
                        department: prevData.department,
                        program: prevData.program,
                        group: group,
                      },
                    });
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
                  sem: "",
                }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                <Form>
                  <Grid container direction="column" alignItems="flex-start">
                    <Grid item>
                      <CustomTextField
                        id="sem"
                        name="sem"
                        placeHolder="Semester"
                        addStyles="adminGroup_inputButton"
                      />
                    </Grid>

                    <Grid item className="adminGroup_submitButtonContainer">
                      <CustomButton
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
