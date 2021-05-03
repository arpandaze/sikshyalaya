import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import Button from "../../components/Button";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import colorscheme from "../../utils/colors";
import DashboardLayout from "../../components/DashboardLayout";

const styleSheet = {
	root: {
		width: "95%",
		height: "100vh",
		margin: "0px auto",
		position: "relative",
		left: "-20px",
		flexGrow: "1",
	},
	inputButton: {
		outline: "none",
		width: "500px",
		height: "50px",
		marginTop: "30px",
		borderTop: "0px",
		borderLeft: "0px",
		borderRight: "0px",
		borderBottom: "2px solid " + colorscheme.grey2,
		fontSize: "1.3em",
		background: colorscheme.white,
	},

	titleContainer: {
		width: "1200px",
		margin: "0px auto",
		position: "relative",
		top: "50px",
	},
	activeTitle: {
		display: "inline-block",
		marginBottom: "20px",
		marginLeft: "10px",
	},
	formBoxContainer: {
		height: "750px",
		position: "relative",
		top: "30px",
	},
	formBox: {
		width: "92%",
		margin: "20px auto",
	},
	profileBoxContainer: {
		width: "1200px",
		height: "750",
		margin: "0px auto",
		position: "relative",
		top: "80px",
	},
	profileBox: {
		borderRadius: "25px",
		background: colorscheme.white,
		boxShadow: "2px 2px 10px -3px rgba(0,0,0,0.2)",
	},
	saveButton: {
		width: "200px",
		height: "50px",
		backgroundColor: colorscheme.red4,
		color: colorscheme.white,
		marginTop: "60px",
		position: "relative",
		fontSize: "1.2em",
		borderRadius: "15px",
	},
	buttonContainer: {
		position: "relative",
		margin: "0px auto",
	},
	optionBox: {
		padding: "10px",
		background: colorscheme.white,
		outline: "none",
		border: "none",
		fontSize: "1.2em",
		color: colorscheme.grey1,
		height: "60px",
		marginTop: "25px",
		borderBottom: "2px solid " + colorscheme.grey2,
	},
	optionList: {
		marginTop: "4px",
		background: "#fff",
		boxShadow:
			"rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px",
		transform: "scaleY(1)",
		transformOrigin: "left top 0px",
		maxHeight: "200px",
		overflowY: "auto",
	},
};

const studentName = "Yugesh Luitel CS 2019";

const program = [
	{
		id: 1,
		name: "Department of Computer Science and Engineering",
	},
	{
		id: 2,
		name: "Department of Mechanical Engineering",
	},
];

const validationSchema = yup.object({
	firstName: yup.string("Enter your name").required("First Name is required"),
	lastName: yup
		.string("Enter your Last Name")
		.required("Last Name is required"),
	email: yup
		.string("Enter your email")
		.email("Enter a valid email")
		.required("Email is required"),
	password: yup
		.string("Enter your password")
		.min(8, "Minimum 8 characters")
		.required("Password is required"),
	passwordConfirmation: yup
		.string()
		.oneOf([yup.ref("password"), null], "Password must match")
		.required("Password confirmation is required!"),
	address: yup.string("Enter your address").required("Address is required"),
});

const Profile = () => {
	return (
		<DashboardLayout>
			<Grid
				container
				direction="column"
				alignItems="flex-start"
				justify="flex-start"
				wrap="nowrap"
				style={styleSheet.root}
			>
				<Grid item style={styleSheet.titleContainer}>
					<h1 style={styleSheet.activeTitle}>{studentName}</h1>
				</Grid>
				<Grid item style={styleSheet.profileBoxContainer}>
					<Grid
						container
						direction="row"
						alignItems="center"
						wrap="nowrap"
						style={styleSheet.profileBox}
					>
						<Grid item style={styleSheet.formBoxContainer}>
							<Formik
								initialValues={{
									firstName: "",
									middleName: "",
									lastName: "",
									email: "",
									password: "",
									confirmPassword: "",
									address: "",
								}}
								validationSchema={validationSchema}
							>
								<Form>
									<Grid
										container
										direction="row"
										alignItems="flex-start"
										style={styleSheet.formBox}
										spacing={5}
									>
										<Grid item xs={6}>
											<Field
												id="firstname"
												name="firstname"
												placeholder="First Name"
												style={styleSheet.inputButton}
											/>
										</Grid>
										<Grid item xs={6}>
											<Field
												id="middlename"
												name="middlename"
												placeholder="Middle Name"
												style={styleSheet.inputButton}
											/>
										</Grid>
										<Grid item xs={6}>
											<Field
												id="lastname"
												name="lastname"
												placeholder="Last Name"
												style={styleSheet.inputButton}
											/>
										</Grid>
										<Grid item xs={6}>
											<Field
												id="email"
												name="email"
												placeholder="Email Address"
												style={styleSheet.inputButton}
											/>
										</Grid>
										<Grid item xs={6}>
											<Field
												id="password"
												type="password"
												name="password"
												placeholder="Password"
												style={styleSheet.inputButton}
											/>
										</Grid>
										<Grid item xs={6}>
											<Field
												id="confirmpassword"
												type="password"
												name="confirmpassword"
												placeholder="Confirm Password"
												style={styleSheet.inputButton}
											/>
										</Grid>
										<Grid item xs={6}>
											<Field
												id="address"
												name="address"
												placeholder="Address"
												style={styleSheet.inputButton}
											/>
										</Grid>
										<Grid item xs={6}>
											<Field
												as="select"
												name="department"
												style={styleSheet.optionBox}
											>
												{program.map((item) => (
													<option
														value={item.name}
														style={styleSheet.optionList}
													>
														{item.name}
													</option>
												))}
											</Field>
										</Grid>
										<Grid item style={styleSheet.buttonContainer}>
											<Button name="Save" colorStyles={styleSheet.saveButton} />
										</Grid>
									</Grid>
								</Form>
							</Formik>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</DashboardLayout>
	);
};

export default Profile;
