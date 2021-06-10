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
import Button from "../../components/Button";
import { ImCross } from "react-icons/im";
import { Formik, Form } from "formik";
import CustomTextField from "../../components/CustomTextField";
import {
  Redirect,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom";

const ProgramView = ({ location }) => {
  const history = useHistory();
  const prevData = location.state
    ? location.state
    : { school: { id: "", name: "" }, department: { id: "", name: "" } };
  const defaultProgram = [];
  const defaultDepartment = "";
  const [isPopUp, setPopUp] = useState(false);
  const validationSchema = yup.object({
    name: yup.string("Enter Program Name").required("Program Name Required"),
    numberOfYears: yup
      .number("Enter Number of Years")
      .required("Number of Years Required"),
  });
  const onSubmit = async (values) => {
    const data = {
      name: values.name,
      department_id: prevData.department.id,
    };
    const position = allProgram.push(data);
    try {
      const responseData = await callAPI({
        endpoint: `/api/v1/program/`,
        method: "POST",
        data: data,
      });
      allProgram[position - 1].id = responseData.data.id;
    } catch (e) {}
    setPopUp(false);
  };
  useEffect(() => {
    if (!location.state) {
      history.replace({
        pathname: "/admin/school",
        state: { message: "Choose a School" },
      });
    }
    return () => {
      setPopUp();
    };
  }, [location]);
  const programFormatter = (response) => {
    if (response.data.length === 0) {
      return [];
    }
    let responseData = [];
    responseData = response.data.map((program) => {
      let formattedResponseData = {
        id: program.id,
        name: program.name,
        department_id: program.department_id,
      };
      return formattedResponseData;
    });
    const finalData = responseData.filter(
      (response) => response.department_id == prevData.department.id
    );
    return finalData;
  };
  let [allProgram] = useAPI(
    { endpoint: `/api/v1/program/` },
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
              <p className="adminCommon_text">{prevData.department.name}</p>
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
                    state: {
                      school: prevData.school,
                    },
                  }}
                  className="adminCommon_smallNavLinks"
                >
                  {prevData.school.name}
                </Link>
                &gt;{" "}
                <Link
                  to={{
                    pathname: "/admin/program",
                    state: { ...prevData },
                  }}
                  href=""
                  className="adminCommon_smallNavLinks"
                >
                  {prevData.department.name}
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
            {allProgram.map((program) => (
              <Grid item key={program.id} xs={6}>
                <AdminBoxSmall
                  type="program"
                  onSubmit={() => {
                    history.push({
                      pathname: "/admin/group",
                      state: {
                        school: prevData.school,
                        department: prevData.department,
                        program: program,
                      },
                    });
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
                  numberOfYears: "",
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
                    <Grid item>
                      <CustomTextField
                        id="numberOfYears"
                        name="numberOfYears"
                        placeHolder="Number of Years"
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
