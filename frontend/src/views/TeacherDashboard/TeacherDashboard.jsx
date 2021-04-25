import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import { Route, Switch, Redirect } from "react-router-dom";
import Button from "../../components/Button";
import * as yup from "yup";
import Tab from "../../components/Tab";
import Grid from "@material-ui/core/Grid";
import Image from "../../components/Image";
import profile from "../../assets/pp.jpg";
import SideBar from "../../components/SideBar";
import Questions from "../../components/Questions";
import colorscheme from "../../utils/colors";
import ProfileBar from "../../components/ProfileBar";
import DashboardLayout from "../../components/DashboardLayout";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { GiBookshelf } from "react-icons/gi";

const styleSheet = {
	root: {
		width: "95%",
		height: "100vh",
		margin: "0px auto",
		position: "relative",
		left: "-20px",
		flexGrow: "1",
	},
	notificationButtonContainer: {
		width: "35px",
		height: "35px",
		float: "right",
		position: "relative",
		top: "5px",
		right: "20px",
	},
	notificationIcon: {
		position: "absolute",
	},
	classQuestionText: {
		position: "relative",
		fontWeight: "bold",
		fontSize: "2.5em",
		cursor: "text",
		position: "relative",
		left: "500px",
	},
	notificationButton: {
		width: "35px",
		height: "35px",
		borderRadius: "50%",
		backgroundColor: colorscheme.red6,
	},
	topBar: {
		width: "1350px",
		height: "50px",
		marginTop: "50px",
	},
	botBar: {
		width: "1350px",
		height: "810px",
		marginTop: "20px",
	},
	leftContainer: {
		height: "810px",
	},

	activeClassBoxContainer: {
		width: "400px",
		height: "250px",
		background: colorscheme.white,
		borderRadius: "15px",
		boxShadow: "2px 2px 10px -3px rgba(0,0,0,0.2)",
	},
	classResourcesBoxContainer: {
		width: "400px",
		height: "510px",
		marginTop: "40px",
		background: colorscheme.white,
		borderRadius: "15px",
		boxShadow: "2px 2px 10px -3px rgba(0,0,0,0.2)",
	},
	questionsContainer: {
		padding: "20px",
		width: "850px",
		height: "800px",
		margin: "0px auto",
		background: colorscheme.white,
		borderRadius: "15px",
		boxShadow: "2px 2px 10px -3px rgba(0,0,0,0.2)",
		overflow: "scroll",
		overflowX: "hidden",
	},
	activeContainer: {
		width: "400px",
		height: "250px",
		background: colorscheme.white,
		borderRadius: "15px",
		boxShadow: "2px 2px 10px -3px rgba(0,0,0,0.2)",
	},
	quizBoxContainer: {
		width: "400px",
		height: "250px",
		background: colorscheme.white,
		borderRadius: "15px",
		marginTop: "25px",
		boxShadow: "2px 2px 10px -3px rgba(0,0,0,0.2)",
	},
	classResourceContainer: {
		width: "400px",
		height: "250px",
		background: colorscheme.white,
		borderRadius: "15px",
		marginTop: "25px",
		boxShadow: "2px 2px 10px -3px rgba(0,0,0,0.2)",
	},

	activeclassText: {
		height: "100%",
		position: "relative",
		fontWeight: "500",
		fontSize: "1.5em",
		cursor: "text",
		marginLeft: "10px",
	},
	classText: {
		height: "100%",
		float: "left",
		marginTop: "30px",
		marginLeft: "30px",
		position: "relative",
		fontWeight: "bold",
		fontSize: "3.2em",
		cursor: "text",
	},
	classTextInner: {
		height: "100%",
		float: "left",
		marginTop: "10px",
		marginLeft: "30px",
		position: "relative",
		fontWeight: "500",
		color: colorscheme.grey2,
		fontSize: "0.9em",
		cursor: "text",
		wordwrap: "normal",
		overflow: "hidden",
	},
	batchText: {
		position: "relative",
		float: "right",
		fontSize: "1.5em",
		fontWeight: "10",
		color: colorscheme.green3,
		marginRight: "40px",
		marginTop: "20px",
	},
	sideBoxIcons: {
		marginLeft: "20px",
		marginTop: "20px",
	},
	smallRedBox: {
		marginLeft: "20px",
		marginTop: "20px",
		display: "inline-block",
		width: "20px",
		height: "20px",
		borderRadius: "50%",
		background: colorscheme.red4,
	},
	quizText: {
		marginLeft: "10px",
		fontWeight: "500",
		fontSize: "1.5em",
	},
	rescourcesText: {
		marginLeft: "10px",
		fontWeight: "500",
		fontSize: "1.5em",
	},
};
const activeClass = [
	{
		id: "1",
		classCode: "MCSC401",
		className: "Discrete Mathematics",
		batch: "CS2019",
	},
];
const questions = [
	{
		id: "1",
		question: "Toilet break 10 min please!?",
		student: "Aatish Shrestha  ",
	},
	{
		id: "2",
		question: "Toilet break 10 min please!?",
		student: "Aatish Shrestha  ",
	},
	{
		id: "3",
		question:
			"Toilet break 10 min please!?Toilet break 10 min please!?Toilet break 10 min please!?Toilet break 10 min please!?",
		student: "Aatish Shrestha  ",
	},
	{
		id: "4",
		question: "Toilet break 10 min please!?",
		student: "Aatish Shrestha  ",
	},
	{
		id: "5",
		question: "Toilet break 10 min please!?",
		student: "Aatish Shrestha  ",
	},
	{
		id: "6",
		question: "Toilet break 10 min please!?",
		student: "Aatish Shrestha  ",
	},
	{
		id: "7",
		question: "Toilet break 10 min please!?",
		student: "Aatish Shrestha  ",
	},
	{
		id: "8",
		question: "Toilet break 10 min please!?",
		student: "Aatish Shrestha  ",
	},
	{
		id: "9",
		question: "Toilet break 10 min please!?",
		student: "Aatish Shrestha  ",
	},
];

const TeacherDashboard = () => {
	return (
		<DashboardLayout>
			<Grid
				container
				direction="column"
				justify="flex-start"
				alignItems="center"
				style={styleSheet.root}
				wrap="nowrap"
			>
				<Grid item style={styleSheet.topBar}>
					<a style={styleSheet.classQuestionText}>Class Questions</a>
					<div style={styleSheet.notificationButtonContainer}>
						<IoMdNotificationsOutline
							size={35}
							color={colorscheme.red4}
							style={styleSheet.notificationIcon}
						></IoMdNotificationsOutline>
						<Button colorStyles={styleSheet.notificationButton} />
					</div>
				</Grid>
				<Grid item style={styleSheet.botBar}>
					<Grid
						container
						direction="row"
						justify="center"
						alignItems="center"
					>
						<Grid item style={styleSheet.leftContainer} xs={4}>
							<Grid
								container
								direction="column"
								justify="center"
								alignItems="center"
								style={styleSheet.xdd}
							>
								<Grid
									container
									direction="column"
									justify="center"
									alignItems="center"
									style={styleSheet.xdd}
								>
									<Grid
										item
										style={styleSheet.activeContainer}
									>
										<Grid
											container
											direction="column"
											justify="flex-start"
											alignitems="center"
											wrap="nowrap"
										>
											<Grid item xs={12}>
												<div
													style={
														styleSheet.smallRedBox
													}
												></div>
												<a
													style={
														styleSheet.activeclassText
													}
												>
													Active class
												</a>
											</Grid>
											<Grid item xs={12}>
												<a style={styleSheet.classText}>
													{activeClass[0].classCode}
												</a>
											</Grid>
											<Grid item xs={12}>
												<a
													style={
														styleSheet.classTextInner
													}
												>
													{activeClass[0].className}
												</a>
											</Grid>
											<Grid item xs={12}>
												<a style={styleSheet.batchText}>
													{activeClass[0].batch}
												</a>
											</Grid>
										</Grid>
									</Grid>
									<Grid
										item
										style={styleSheet.quizBoxContainer}
									>
										<Grid item>
											<RiQuestionAnswerLine
												size={25}
												color={colorscheme.grey1}
												style={styleSheet.sideBoxIcons}
											/>
											<a style={styleSheet.quizText}>
												Quizzes
											</a>
										</Grid>
									</Grid>
									<Grid
										item
										style={
											styleSheet.classResourceContainer
										}
									>
										<Grid item>
											<GiBookshelf
												size={25}
												color={colorscheme.grey1}
												style={styleSheet.sideBoxIcons}
											/>
											<a
												style={
													styleSheet.rescourcesText
												}
											>
												Resources
											</a>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
						<Grid item style={styleSheet.questionsContainer}>
							<Grid
								container
								direction="column"
								justify="flex-start"
							>
								{questions.map((quest) => (
									<Grid>
										<Questions
											question={quest.question}
											student={quest.student}
										/>
									</Grid>
								))}
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</DashboardLayout>
	);
};

export default TeacherDashboard;
