import React, { useContext } from "react";
import { Formik, Form } from "formik";
import CustomButton from "../../components/CustomButton";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import Login from "./Login";
import "./statics/css/loginCommon.css";
import Checkbox from "../../components/Checkbox";
import { UserContext } from "../../utils/Contexts/UserContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import callAPI from "../../utils/API";
import CustomTextField from "./../../components/CustomTextField";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(4, "Minimum 4 characters")
    .required("Password is required"),
});
const StudentLoginBox = () => {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const onSubmit = async (values) => {
    let data = {
      username: values.email,
      password: values.password,
      remember_me: values.remember_me,
    };

    let resp = await callAPI({
      endpoint: "/api/v1/auth/web",
      method: "POST",
      data: data,
    });
    if (resp.status === 200) {
      setUser(resp.data);
    } else {
      throw "Login failed!";
    }
  };
  return (
		<Login>
			<Grid
				container
				direction="column"
				justify="center"
				alignItems="center"
				className="loginCommon_loginBoxContainer"
			>
				<Grid item>
					<h1 className="loginCommon_label">Login</h1>
				</Grid>
				<Grid item xs={12}>
					<Formik
						initialValues={{
							email: "",
							password: "",
							remember_me: false,
						}}
						validationSchema={validationSchema}
						onSubmit={onSubmit}
					>
						<Form>
							<Grid container direction="column" alignItems="flex-start">
								<Grid item xs={12}>
									<CustomTextField
										id="email"
										name="email"
										placeHolder="Email"
										addStyles="loginCommon_inputButton"
									/>
								</Grid>

								<Grid item>
									<CustomTextField
										type="password"
										id="password"
										name="password"
										placeHolder="Password"
										addStyles="loginCommon_inputButton"
									/>
								</Grid>
								<Grid
									item
									xs={12}
									className="loginCommon_rememberMeCheckContainer"
								>
									<Checkbox
										name="remember_me"
										label="Remember me"
										value="remember_me"
									/>
								</Grid>
							</Grid>
							<Grid
								container
								spacing={1}
								direction="column"
								justify="center"
								alignItems="center"
							>
								<Grid item>
									<CustomButton
										type="submit"
										name="Login"
										addStyles="loginCommon_loginButton"
									/>
								</Grid>
								<Grid item>
									<CustomButton
										type="submit"
										name="Signup"
										addStyles="loginCommon_signupButton"
										onClicked={() => {
											history.push("/signup");
										}}
									/>
								</Grid>
								<Grid item>
									<p
										onClick={() => {
											history.push("/reset");
										}}
										className="loginCommon_forgetButton"
									>
										Forgot Password?
									</p>
								</Grid>
							</Grid>
						</Form>
					</Formik>
				</Grid>
			</Grid>
		</Login>
	);
};

export default StudentLoginBox;
