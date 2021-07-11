import React, { useState, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import colorscheme from "../../utils/colors";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import { GoPlus } from "react-icons/go";
import "./statics/css/commonView.css";
import useAPI from "../../utils/useAPI";
import callAPI from "../../utils/API";
import { format } from "date-fns";
import TextField from "@material-ui/core/TextField";
import { AlertContext } from "../../components/DashboardLayout/AlertContext";
import StudentPagination from "./components/StudentPagination";
import DetailView from "./components/DetailView";
import CreateAccount from "./components/CreateAccount";

const StudentView = ({ location, ...rest }) => {
  const [filter, setFilter] = useState("");
  const [isPopUp, setPopUp] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [editState, setEditState] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { setAlert } = useContext(AlertContext);

  const groupFormatter = (value) => {
    return value.data;
  };

  const [group] = useAPI({ endpoint: "/api/v1/group/all/" }, groupFormatter);

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
        programName: item.group.program.name,
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
    let date = format(data.dob, "yyyy-MM-dd");

    let req_data = {
      email: data.email,
      full_name: data.full_name,
      address: data.address,
      group_id: group_id,
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
        <CreateAccount
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          setEdit={setEdit}
          setEditState={setEditState}
          setPopUp={setPopUp}
          onSubmit={onSubmit}
          detailType="student"
        />
      ) : isPopUp && !isEdit ? (
        <DetailView
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          setEdit={setEdit}
          setEditState={setEditState}
          setPopUp={setPopUp}
          detailType="student"
        />
      ) : (
        <></>
      )}
    </DashboardLayout>
  );
};

export default StudentView;
