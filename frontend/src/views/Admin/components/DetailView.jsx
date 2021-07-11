import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import colorscheme from "../../../utils/colors";
import Image from "../../../components/Image";
import defaultProfile from "../../../assets/default-profile.svg";
import { ImCross } from "react-icons/im";
import configs from "../../../utils/configs";
import { BiMailSend } from "react-icons/bi";
import { AlertContext } from "../../../components/DashboardLayout/AlertContext";
import callAPI from "../../../utils/API";
import "../statics/css/commonView.css";

const DetailView = ({
  selectedUser,
  setSelectedUser,
  setEdit,
  setEditState,
  setPopUp,
  detailType,
}) => {
  const { setAlert } = useContext(AlertContext);
  return (
    <Grid container justify="center" className="adminStudent_popUpContainer">
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
                  ? configs.PUBLIC_FILES_PATH + "/" + selectedUser.profile_image
                  : defaultProfile
              }
              alt="profile-image"
              addStyles="adminStudent_displayProfileImage"
            />
          </Grid>
          <Grid item className="adminStudent_displayContainer">
            <Grid container direction="row">
              <Grid item className="adminStudent_displayDetails">
                <p className="adminStudent_fieldTitle">Name:</p>{" "}
                {selectedUser.name}
              </Grid>
              <Grid item className="adminStudent_displayDetails">
                <p className="adminStudent_fieldTitle">Address: </p>{" "}
                {selectedUser.address}
              </Grid>
              {detailType === "student" ? (
                <Grid item className="adminStudent_displayDetails">
                  <p className="adminStudent_fieldTitle">Program: </p>
                  {selectedUser.programName}
                </Grid>
              ) : (
                <Grid item className="adminStudent_displayDetails">
                  <p className="adminStudent_fieldTitle">Department: </p>
                  {selectedUser.department}
                </Grid>
              )}
              <Grid item className="adminStudent_displayDetails">
                <p className="adminStudent_fieldTitle">Year Joined: </p>
                {selectedUser.join_year}
              </Grid>
              <Grid item className="adminStudent_displayDetails">
                <p className="adminStudent_fieldTitle">Date of Birth: </p>
                {selectedUser.dob}
              </Grid>
              <Grid item className="adminStudent_displayDetails">
                <p className="adminStudent_fieldTitle">Email: </p>
                {selectedUser.email}
              </Grid>
              <Grid item className="adminStudent_displayDetails">
                <p className="adminStudent_fieldTitle">Cotnact No: </p>
                {selectedUser.contact_number}
              </Grid>
              {!selectedUser.is_active ? (
                <Grid
                  item
                  xs={12}
                  className="adminStudent_resendButtonContainer"
                >
                  <Button
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
  );
};

export default DetailView;
