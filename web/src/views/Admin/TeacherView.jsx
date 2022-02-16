import React, { useState, useContext } from "react";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import colorscheme from "../../utils/colors";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import { GoPlus } from "react-icons/go";
import "./statics/css/commonView.css";
import useAPI from "../../utils/useAPI";
import callAPI from "../../utils/API";
import TextField from "@material-ui/core/TextField";
import { format } from "date-fns";
import { AlertContext } from "../../components/DashboardLayout/AlertContext";
import TeacherPagination from "./components/TeacherPagination";
import DetailView from "./components/DetailView";
import CreateAccount from "./components/CreateAccount";

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

const TeacherView = ({ location, ...rest }) => {
  const [filter, setFilter] = useState("");
  const [isPopUp, setPopUp] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [editState, setEditState] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { setAlert } = useContext(AlertContext);

  const teacherFormatter = (values) => {
    const finalData = values.data.map((item) => {
      return {
        id: item.id,
        name: item.full_name,
      };
    });
    return finalData;
  };

  const teacherDefault = [];
  const [teachers] = useAPI(
    { endpoint: `/api/v1/users/teacher/` },
    teacherFormatter,
    teacherDefault
  );

  const onSubmit = async (data) => {
    let date = format(data.dob, "yyyy-MM-dd");
    let req_data = {
      email: data.email,
      full_name: data.full_name,
      address: data.address,
      contact_number: data.phone_number,
      dob: date,
      join_year: parseInt(data.join_year),
    };

    let response;
    if (!editState) {
      response = await callAPI({
        endpoint: "/api/v1/auth/signup",
        method: "POST",
        data: req_data,
      });
      teachers.push({
        name: req_data.full_name,
        id: response.data.id,
      });
    } else {
      response = await callAPI({
        endpoint: `/api/v1/users/${selectedUser.id}`,
        method: "PUT",
        data: req_data,
      });
      const position = teachers.findIndex(
        (currentValue) => currentValue.id == selectedUser.id
      );
      teachers[position] = {
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
              <p className="adminCommon_text">Teachers</p>
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
              <TeacherPagination
                fetchEndpoint="/api/v1/users/teacher/"
                formatter={teacherFormatter}
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
        <CreateAccount
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          setEdit={setEdit}
          setEditState={setEditState}
          setPopUp={setPopUp}
          onSubmit={onSubmit}
          detailType="teacher"
        />
      ) : isPopUp && !isEdit ? (
        <DetailView
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          setEdit={setEdit}
          setEditState={setEditState}
          setPopUp={setPopUp}
          detailType="teacher"
        />
      ) : (
        <></>
      )}
    </DashboardLayout>
  );
};

export default TeacherView;
