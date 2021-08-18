import React, { useContext } from "react";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import { AlertContext } from "../../../components/DashboardLayout/AlertContext";
import CustomTextField from "../../../components/CustomTextField";
import { DatePicker } from "../../../components/CustomDateTime";
import CustomButton from "../../../components/CustomButton";
import colorscheme from "../../../utils/colors";
import useAPI from "../../../utils/useAPI";
import { ImCross } from "react-icons/im";
import { Formik, Form } from "formik";

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

const CreateAccount = ({
  selectedUser,
  setSelectedUser,
  setEdit,
  setEditState,
  setPopUp,
  onSubmit,
  detailType,
}) => {
  const { setAlert } = useContext(AlertContext);
  const programFormatter = (value) =>
    value.data.map((item) => ({
      name: item.name,
      value: item.id,
    }));

  const [program] = useAPI({ endpoint: "/api/v1/program/" }, programFormatter);
  return (
    <Grid container justify="center" className="adminStudent_popUpContainer">
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
                    dob: new Date(),
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
                {detailType === "student" ? (
                  <>
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
                  </>
                ) : (
                  <></>
                )}
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
  );
};

export default CreateAccount;
