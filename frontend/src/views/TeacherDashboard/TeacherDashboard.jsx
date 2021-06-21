import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import "./statics/css/teacherDashboard.css";
import * as yup from "yup";
import Profile from "./../../assets/pp.jpg";
import colorscheme from "../../utils/colors";
import Button from "../../components/Button";
import { ImCross } from "react-icons/im";
import { Formik, Form } from "formik";
import CustomTextField from "../../components/CustomTextField";
import Student from "./components/Student";

const users = [
	{
		id: 1,
		name: "Yughyaya Luitel",
		image: Profile,
		program: "Computer Science",
		year: "1st",
		semester: "II",
	},
	{
		id: 2,
		name: "Yugesh Upadhyitel",
		image: Profile,
		program: "Computer Science",
		year: "1st",
		semester: "II",
	},
	{
		id: 3,
		name: "Yugesh Upaya Luitel",
		image: Profile,
		program: "Computer Science",
		year: "1st",
		semester: "II",
	},
	{
		id: 4,
		name: "Yugesh Upadh",
		image: Profile,
		program: "Computer Science",
		year: "1st",
		semester: "II",
	},
	{
		id: 5,
		name: "Yugesh Upadhyaitel",
		image: Profile,
		program: "Computer Science",
		year: "1st",
		semester: "II",
	},
	{
		id: 6,
		name: "Yugesh Upadhytel",
		image: Profile,
		program: "Computer Science",
		year: "1st",
		semester: "II",
	},
	{
		id: 7,
		name: "Yugesh Upadteasdlsasasadasdadadas",
		image: Profile,
		program: "Computer Science",
		year: "1st",
		semester: "II",
	},
	{
		id: 8,
		name: "Yugeadhyaya Luitel",
		image: Profile,
		program: "Computer Science",
		year: "1st",
		semester: "II",
	},
	{
		id: 9,
		name: "Yugesh Upa Luitel",
		image: Profile,
		program: "Computer Science",
		year: "1st",
		semester: "II",
	},
	{
		id: 10,
		name: "Yuga Luitel",
		image: Profile,
		program: "Computer Science",
		year: "1st",
		semester: "II",
	},
	{
		id: 11,
		name: "Yuga Luitel",
		image: Profile,
		program: "Computer Science",
		year: "1st",
		semester: "II",
	},
	{
		id: 12,
		name: "Yuga Luitel",
		image: Profile,
		program: "Computer Science",
		year: "1st",
		semester: "II",
	},
	{
		id: 13,
		name: "Yuga Luitel",
		image: Profile,
		program: "Computer Science",
		year: "1st",
		semester: "II",
	},
	{
		id: 14,
		name: "Yuga Luitel",
		image: Profile,
		program: "Computer Science",
		year: "1st",
		semester: "II",
	},
];

const TeacherDashbaord = () => {
	const [popup, setPopup] = useState(false);
	return (
		<DashboardLayout>
			<Grid
				container
				direction="column"
				justify="flex-start"
				alignItems="center"
				wrap="nowrap"
				className="teacherDash_root"
			>
				<Grid item className="teacherDash_topBar">
					<div
						className="teacherDash_attendanceButton"
						onClick={() => {
							setPopup(true);
						}}
					>
						Attendance
					</div>
				</Grid>
				<Grid item className="teacherDash_botBar">
					<Grid container direction="row" justify="center" alignItems="center">
						<Grid item className="teacherDash_leftContainer" xs={4}>
							<Grid
								container
								direction="column"
								justify="center"
								alignItems="center"
							>
								<Grid
									item
									className="teacherDash_activeClassBoxContainer"
								></Grid>
								<Grid item className="teacherDash_quizBoxContainer"></Grid>
								<Grid item className="teacherDash_resourceBoxContainer"></Grid>
							</Grid>
						</Grid>
						<Grid item className="teacherDash_middleContainer" xs={8}>
							<div className="teacherDash_discussionBoxContainer"></div>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			{popup ? (
				<Grid
					container
					justify="center"
					alignItems="center"
					className="teacherDash_popUpContainer"
				>
					<Grid item className="teacherDash_popUpBox">
						<Grid
							container
							className="teacherDash_popUptopBar"
							alignItems="center"
							justify="center"
						>
							<Grid item xs={9} className="teacherDash_popupTitleContainer">
								<p className="teacherDash_popupTitle">Attendance</p>
							</Grid>
							<Grid item xs={1} className="teacherDash_closeButtonContainer">
								<ImCross
									color={colorscheme.red3}
									className="teacherDash_closeButton"
									onClick={() => {
										setPopup(false);
									}}
								/>
							</Grid>
						</Grid>
						<Grid container direction="column" className="teacherDash_formBox">
							<Grid
								container
								direction="column"
								alignItems="center"
								justify="center"
							>
								<Grid
									item
									xs={12}
									className="teacherDash_userlistContainerOuter"
								>
									<Grid
										container
										direction="column"
										className="teacherDash_userlistContainer"
										alignItems="center"
										wrap="nowrap"
									>
										{users.map((user) => (
											<Grid item className="teacherDash_userList">
												<Student
													id={user.id}
													username={user.name}
													src={user.image}
													year={user.year}
													semester={user.semester}
													program={user.program}
												/>
											</Grid>
										))}
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			) : (
				<></>
			)}
		</DashboardLayout>
	);
};

export default TeacherDashbaord;
