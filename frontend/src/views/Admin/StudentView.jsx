import React, { useState, useContext } from "react";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import colorscheme from "../../utils/colors";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import Students from "./components/Student";
import { GoPlus } from "react-icons/go";
import "./statics/css/commonView.css";
import useAPI from "../../utils/useAPI";
import CustomButton from "../../components/CustomButton";
import Button from "@material-ui/core/Button";
import { ImCross } from "react-icons/im";
import { BiMailSend } from "react-icons/bi";
import { Formik, Form } from "formik";
import callAPI from "../../utils/API";
import CustomTextField from "../../components/CustomTextField";
import TextField from "@material-ui/core/TextField";
import configs from "../../utils/configs";
import { useHistory } from "react-router-dom";
import { DatePicker } from "../../components/CustomDateTime";
import Image from "../../components/Image";
import defaultProfile from "../../assets/default-profile.svg";
import { AlertContext } from "../../components/DashboardLayout/AlertContext";
import StudentPagination from "./components/StudentPagination";
import { set } from "idb-keyval";

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

const semester = [
  { name: "I", value: 1 },
  { name: "II", value: 2 },
  { name: "III", value: 3 },
  { name: "IV", value: 4 },
  { name: "V", value: 5 },
  { name: "VI", value: 6 },
  { name: "VII", value: 7 },
  { name: "VIII", value: 8 },
];

const StudentView = ({ location, ...rest }) => {
  const history = useHistory();
  const [filter, setFilter] = useState("");
  const [isPopUp, setPopUp] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [editState, setEditState] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [buttonType, setButtonType] = useState(true);
  const { alert, setAlert } = useContext(AlertContext);

  const studentFormatter = (values) => {
    const data = values.data.filter((response) => response.user_type == "4");
    const finalData = data.map((item) => {
      return {
        id: item.id,
        name: item.full_name,
        profile_image: item.profile_image,
        email: item.email,
        program: item.group.program.id,
        semester: item.group.sem,
        dob: item.dob,
        address: item.address,
        contact_number: item.contact_number,
        join_year: item.join_year,
        user_type: item.user_type,
        is_active: item.is_active,
      };
    });

    return finalData;
  };

  const studentDefault = [];
  const [students] = useAPI(
    { endpoint: `/api/v1/users/` },
    studentFormatter,
    studentDefault
  );

  const programFormatter = (value) =>
    value.data.map((item) => ({
      name: item.name,
      value: item.id,
    }));

  const groupFormatter = (value) => {
    return value.data;
  };

  const [group] = useAPI({ endpoint: "/api/v1/group/all/" }, groupFormatter);

  const [program] = useAPI({ endpoint: "/api/v1/program/" }, programFormatter);

  const onSubmit = async (data) => {
    let group_id_list = group.filter((item) => {
      if (item.sem === data.semester && item.program_id === data.program) {
        return item;
      }
    });

    if (!group_id_list.length) {
      throw "No matching group found!";
    }
    let group_id = group_id_list[0].id;
    console.log("sgd");
    console.log(group_id);

    let req_data = {
      email: data.email,
      full_name: data.full_name,
      address: data.address,
      group_id: group_id,
      contact_number: data.phone_number,
      dob: data.dob,
      join_year: parseInt(data.join_year),
    };

    let response;
    if (!editState) {
      response = await callAPI({
        endpoint: "/api/v1/auth/signup",
        method: "POST",
        data: req_data,
      });
      students.push({
        name: req_data.full_name,
        id: response.data.id,
      });
    } else {
      response = await callAPI({
        endpoint: `/api/v1/users/${selectedUser.id}`,
        method: "PUT",
        data: req_data,
      });
      const position = students.findIndex(
        (currentValue) => currentValue.id == selectedUser.id
      );
      students[position] = {
        id: selectedUser.id,
        name: req_data.full_name,
        email: req_data.email,
        program: data.program,
        semester: data.semester,
        dob: req_data.dob,
        address: req_data.address,
        contact_number: req_data.contact_number,
        join_year: req_data.join_year,
        user_type: req_data.user_type,
      };
    }

    if (response.status && response.status == 200) {
      setPopUp(false);
      setEditState(false);
      setSelectedUser(null);
      setAlert({
        severity: "success",
        message: "Changes Saved Successfully",
      });
      setTimeout(() => {
        setAlert(null);
      }, 2000);
    } else {
      setAlert({
        severity: "error",
        message: "Error Occurred while Saving",
      });
      setTimeout(() => {
        setAlert(null);
      }, 2000);
    }
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
              <p className="adminCommon_text">Student</p>
            </Grid>
            <Grid xs={1} item className="adminCommon_plusIcon">
              <div className="adminCommon_plusIconContainer">
                <GoPlus
                  size={25}
                  color={colorscheme.green2}
                  onClick={() => {
                    setPopUp(true);
                    setEdit(true);
                  }}
                />
              </div>
            </Grid>
          </Grid>
        </Grid>

        <Grid item className="adminCommon_botBar">
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
            className="adminCommon_innerContainer"
          >
            <Grid item className="adminCommon_searchComponentContainer">
              <TextField
                variant="outlined"
                label="Enter Search Query"
                style={{ width: "100%" }}
                onChange={(e) => {
                  setFilter(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} style={{ width: "100%" }}>
              <StudentPagination
                fetchEndpoint="/api/v1/users/"
                formatter={studentFormatter}
                search={filter}
                setSelectedUser={setSelectedUser}
                setEdit={setEdit}
                setEditState={setEditState}
                setPopUp={setPopUp}
              />
            </Grid>
          </Grid>
        </Grid>
        <br />
        <br />
      </Grid>
      {isPopUp && isEdit ? (
        <Grid
          container
          justify="center"
          className="adminStudent_popUpContainer"
        >
          <Grid item className="adminStudent_popUpBox">
            <Grid container direction="column" className="adminStudent_formBox">
              <Formik
                enableReinitialize={true}
                initialValues={
                  selectedUser
                    ? {
                        full_name: selectedUser.name,
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
                        addStyles="adminStudent_inputButton"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CustomTextField
                        name="address"
                        type="text"
                        placeHolder="Address"
                        id="address"
                        addStyles="adminStudent_inputButton"
                      />
                    </Grid>
                    <Grid item xs={6} style={{ padding: "0px 20px 0px 0px" }}>
                      <CustomTextField
                        name="program"
                        dropdown={true}
                        type="text"
                        placeHolder="Program"
                        menuItems={program || []}
                        id="program"
                        addStyles="adminStudent_inputButton"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CustomTextField
                        name="semester"
                        dropdown={true}
                        type="text"
                        placeHolder="Semester"
                        menuItems={semester}
                        id="semester"
                        addStyles="adminStudent_inputButton"
                        style={{ maxWidth: "20" }}
                      />
                    </Grid>
                    <Grid item xs={6} style={{ padding: "0px 20px 0px 0px" }}>
                      <CustomTextField
                        id="join_year"
                        name="join_year"
                        placeHolder="Join"
                        label="Join year"
                        type="text"
                        className="adminStudent_inputButton"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <DatePicker id="dob" name="dob" label="Birth Date" />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomTextField
                        name="email"
                        type="text"
                        placeHolder="Email"
                        id="email"
                        addStyles="adminStudent_inputButton"
                        autoComplete="on"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomTextField
                        name="phone_number"
                        type="text"
                        placeHolder="Phone Number"
                        id="phone_number"
                        addStyles="adminStudent_inputButton"
                        autoComplete="on"
                      />
                    </Grid>
                    <Grid item className="adminStudent_submitButtonContainer">
                      <CustomButton
                        name="Save"
                        type="submit"
                        addStyles="adminStudent_submitButton"
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
                  setEdit(false);
                  setSelectedUser(null);
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      ) : isPopUp && !isEdit ? (
        <Grid
          container
          justify="center"
          className="adminStudent_popUpContainer"
        >
          <Grid item className="adminStudent_popUpDisplayBox">
            <Grid
              container
              direction="column"
              className="adminStudent_displayBox"
              alignItems="center"
            >
              <Grid item className="adminStudent_displayProfile">
                <Image
                  src={
                    selectedUser.profile_image
                      ? configs.PUBLIC_FILES_PATH +
                        "/" +
                        selectedUser.profile_image
                      : defaultProfile
                  }
                  alt="profile-image"
                  addStyles="adminStudent_displayProfileImage"
                />
              </Grid>
              <Grid item className="adminStudent_displayContainer">
                <Grid container direction="row">
                  <Grid item className="adminStudent_displayDetails">
                    <a className="adminStudent_fieldTitle">Name:</a>{" "}
                    {selectedUser.name}
                  </Grid>
                  <Grid item className="adminStudent_displayDetails">
                    <a className="adminStudent_fieldTitle">Address: </a>{" "}
                    {selectedUser.address}
                  </Grid>
                  <Grid item className="adminStudent_displayDetails">
                    <a className="adminStudent_fieldTitle">Program: </a>
                    {
                      program.filter(
                        (element) => element.value == selectedUser.program
                      )[0].name
                    }
                  </Grid>
                  <Grid item className="adminStudent_displayDetails">
                    <a className="adminStudent_fieldTitle">Semester: </a>
                    {selectedUser.semester}
                  </Grid>
                  <Grid item className="adminStudent_displayDetails">
                    <a className="adminStudent_fieldTitle">Year Joined: </a>
                    {selectedUser.join_year}
                  </Grid>
                  <Grid item className="adminStudent_displayDetails">
                    <a className="adminStudent_fieldTitle">Date of Birth: </a>
                    {selectedUser.dob}
                  </Grid>
                  <Grid item className="adminStudent_displayDetails">
                    <a className="adminStudent_fieldTitle">Email: </a>
                    {selectedUser.email}
                  </Grid>
                  <Grid item className="adminStudent_displayDetails">
                    <a className="adminStudent_fieldTitle">Cotnact No: </a>
                    {selectedUser.contact_number}
                  </Grid>
                  {!selectedUser.is_active ? (
                    <Grid
                      item
                      xs={12}
                      className="adminStudent_resendButtonContainer"
                    >
                      <Button
                        onMouseOver={() => {
                          setButtonType(false);
                        }}
                        onMouseOut={() => {
                          setButtonType(true);
                        }}
                        variant="outlined"
                        color="primary"
                        startIcon={<BiMailSend />}
                        onClick={async () => {
                          const response = await callAPI({
                            endpoint: `/api/v1/auth/resend-verification-email/?email=${selectedUser.email}`,
                            method: "POST",
                          });
                          if (response.status && response.status == 200) {
                            setPopUp(false);
                            setEditState(false);
                            setSelectedUser(null);
                            setAlert({
                              severity: "success",
                              message: "Reset Email Sent",
                            });
                            setTimeout(() => {
                              setAlert(null);
                            }, 2000);
                          } else {
                            setAlert({
                              severity: "error",
                              message: "Reset Email Failed",
                            });
                            setTimeout(() => {
                              setAlert(null);
                            }, 2000);
                          }
                        }}
                        className="adminStudent_resendButton"
                      >
                        Resend Verification
                      </Button>
                    </Grid>
                  ) : (
                    <></>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item className="adminStudent_displayStatus">
              <Grid container direction="row" alignItems="center">
                {selectedUser.is_active ? (
                  <>
                    <div className="adminStudent_active"></div>
                    <p className="adminStudent_statusText">Active</p>
                  </>
                ) : (
                  <>
                    <div className="adminStudent_inactive"></div>
                    <p className="adminStudent_statusText">Inactive</p>
                  </>
                )}
              </Grid>
            </Grid>
            <Grid item className="adminSchool_closeButtonContainer">
              <ImCross
                color={colorscheme.red3}
                className="adminSchool_closeButton"
                onClick={() => {
                  setPopUp(false);
                  setEditState(false);
                  setEdit(false);
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

export default StudentView;
