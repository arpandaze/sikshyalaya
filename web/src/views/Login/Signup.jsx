import React, { useState } from "react";
import { Formik, Form } from "formik";
import CustomButton from "../../components/CustomButton";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import Login from "./Login";
import "./statics/css/signup.css";
import { useHistory } from "react-router-dom";
import callAPI from "../../utils/API";
import colorscheme from "../../utils/colors";
import CustomTextField from "./../../components/CustomTextField";
import useAPI from "../../utils/useAPI";
import DelayedRedirect from "../../components/DelayedRedirect";
import { DatePicker } from "../../components/CustomDateTime";
import { format } from "date-fns";
import Image from "../../components/Image";
import signupImg from "../../assets/signupImg.svg";

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

const validationSchema = yup.object({
  first_name: yup.string("Enter your name").required("First Name is required"),
  middle_name: yup.string("Enter your Middle Name"),
  last_name: yup
    .string("Enter your Last Name")
    .required("Last Name is required"),
  address: yup.string("Enter your address").required("Address is required"),
  join_year: yup.string("Enter Joined Year").required("Join year is required"),
  dob: yup.string("Enter Date of Birth").required("Date of Birth is required"),
  phone_number: yup.number().typeError("Not a valid phone number"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email!")
    .required("Email is required"),

  password: yup
    .string("Enter your password")
    .min(8, "Minimum 8 characters")
    .required("Password is required"),
  semester: yup.number().required("Semester is required"),
  program: yup.number().required("Program is required"),
  confirm_password: yup.string().when("password", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: yup
      .string()
      .oneOf([yup.ref("password")], "Both password need to be the same"),
  }),
});
const Signup = () => {
  const history = useHistory();
  const [submitState, setSubmitState] = useState({ code: 1, message: "" });

  const programFormatter = (value) =>
    value.data.map((item) => ({
      name: item.name,
      value: item.id,
    }));

  const groupFormatter = (value) => {
    return value.data;
  };

  const [program] = useAPI({ endpoint: "/api/v1/program/" }, programFormatter);

  const [group] = useAPI({ endpoint: "/api/v1/group/all/" }, groupFormatter);

  const onSubmit = async (data, { setErrors }) => {
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
      full_name: [data.first_name, data.middle_name, data.last_name]
        .join(" ")
        .replace("  ", " "),
      address: data.address,
      group_id: group_id,
      contact_number: data.phone_number,
      dob: date,
      join_year: parseInt(data.join_year),
      password: data.password,
    };
    let response = await callAPI({
      endpoint: "/api/v1/auth/signup",
      method: "POST",
      data: req_data,
    });

    if (response.status === 200) {
      setSubmitState({
        code: 2,
        message: "Check your email for verification!",
      });
    } else {
      setSubmitState({ code: 4, message: response.data.detail.msg });
    }
  };

  return (
    <Login>
      {submitState.code === 1 ? (
        <Grid
          container
          direction="column"
          justify="center"
          className="signup_container"
        >
          <Grid item>
            <h1 className="signup_label">Signup</h1>
          </Grid>
          <Grid item>
            <Formik
              initialValues={{
                first_name: "",
                middle_name: "",
                last_name: "",
                address: "",
                program: "",
                semester: "",
                join_year: "",
                dob: null,
                email: "",
                password: "",
                confirm_password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              <Form>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="flex-start"
                  className="signup_formContainer"
                >
                  <Grid item xs={6} style={{ padding: "0px 20px 0px 0px" }}>
                    <CustomTextField
                      name="first_name"
                      type="text"
                      placeHolder="First Name"
                      id="first_name"
                      addStyles="signup_inputButton"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CustomTextField
                      name="middle_name"
                      type="text"
                      placeHolder="Middle Name"
                      id="middle_name"
                      addStyles="signup_inputButton"
                    />
                  </Grid>
                  <Grid item xs={6} style={{ padding: "0px 20px 0px 0px" }}>
                    <CustomTextField
                      name="last_name"
                      type="text"
                      placeHolder="Last Name"
                      id="last_name"
                      addStyles="signup_inputButton"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CustomTextField
                      name="address"
                      type="text"
                      placeHolder="Address"
                      id="address"
                      addStyles="signup_inputButton"
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
                      addStyles="signup_inputButton"
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
                      addStyles="signup_inputButton"
                      style={{ maxWidth: "20" }}
                    />
                  </Grid>
                  <Grid item xs={6} style={{ padding: "0px 20px 0px 0px" }}>
                    <CustomTextField
                      id="join_year"
                      name="join_year"
                      label="Join year"
                      type="text"
                      placeHolder="Join Year"
                      className="signup_inputButton"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <DatePicker
                      id="dob"
                      label="Date of Birth"
                      className="signup_inputButton"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextField
                      name="phone_number"
                      type="text"
                      placeHolder="Phone Number"
                      id="phone_number"
                      addStyles="signup_inputButton"
                      autoComplete="on"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextField
                      name="email"
                      type="text"
                      placeHolder="Email"
                      id="email"
                      addStyles="signup_inputButton"
                      autoComplete="on"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextField
                      name="password"
                      type="password"
                      placeHolder="Password"
                      id="password"
                      addStyles="signup_inputButton"
                      autoComplete="new-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextField
                      name="confirm_password"
                      type="password"
                      placeHolder="Confirm Password"
                      id="confirm_password"
                      addStyles="signup_inputButton"
                      autoComplete="new-password"
                    />
                  </Grid>
                  <Grid item className="signup_buttonContainer">
                    <CustomButton
                      name="Signup"
                      type="submit"
                      addStyles="signup_button"
                    />
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </Grid>
          <Grid
            container
            item
            direction="row"
            justify="center"
            alignItems="center"
          >
            <p
              style={{
                margin: "0px",
              }}
            >
              Already have an account?
            </p>
            <p
              onClick={() => {
                history.push("/login");
              }}
              style={{
                margin: "10px",
                cursor: "pointer",
                textDecoration: "none",
                color: colorscheme.red4,
              }}
            >
              Login
            </p>
          </Grid>
        </Grid>
      ) : (
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid xs={6}>
            <Image src={signupImg} />
          </Grid>
          <DelayedRedirect timeout={5} to="/login" />
          <h1>{submitState.message}</h1>
          <h1>Redirecting in few seconds!</h1>
        </Grid>
      )}
    </Login>
  );
};

export default Signup;
