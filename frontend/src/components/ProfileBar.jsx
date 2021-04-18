import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import colorscheme from "../utils/colors";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Image from "./Image";
import CourseBox from "./CourseBox";
import profile from "../assets/pp.jpg";
import ProfileBox from "./ProfileBox";

const styleSheet = {
	root: { flexGrow: "1" },
	profileBar: {
		height: "100vh",
	},
	profileBox: {
		width: "90%",
		height: "20vh",
		position: "relative",
		top: "60px",
		borderRadius: "25px",
		background: colorscheme.white,
		boxShadow: "2px 2px 10px -3px rgba(0,0,0,0.2)",
	},
	courseBox: {
		width: "90%",
		height: "62vh",
		position: "relative",
		top: "11vh",
		borderRadius: "25px",
		background: colorscheme.white,
		boxShadow: "2px 2px 10px -3px rgba(0,0,0,0.2)",
	},
	courseTextTitle: {
		fontSize: "2em",
		fontWeight: "bold",
		position: "relative",
		top: "25px",
		left: "40px",
	},
	courseDetailBoxContainer: {
		position: "relative",
		top: "40px",
	},
	courseDetailBox: {
		height: "3.4vw",
		padding: "2px",
	},
	courseTextCode: {
		fontSize: "1.5em",
		fontWeight: "bold",
		position: "relative",
		top: "20px",
		left: "40px",
		lineHeight: "0.95em",
		listStyleType: "none",
	},
	courseTextCodeSelected: {
		fontSize: "1.5em",
		fontWeight: "bold",
		position: "relative",
		top: "20px",
		left: "40px",
		lineHeight: "0.95em",
		listStyleType: "none",
		color: colorscheme.red4,
	},
	courseTextName: {
		fontSize: "0.6em",
		fontWeight: "600",
		position: "relative",
		listStyleType: "none",
		color: colorscheme.grey1,
	},
	courseTextCredit: {
		fontSize: "0.8em",
		fontWeight: "400",
		position: "absolute",
		top: "15px",
		right: "80px",
		listStyleType: "none",
		color: colorscheme.grey1,
	},
};
const user = [
	{
		name: "Yugesh Upadhyaya Luitel",
		department: "Computer Science",
		year: "II",
		semester: "I",
		image: profile,
	},
];
const courses = [
	{
		sn: "1",
		code: "MATH 208",
		name: "Statistics and Probability",
		credit: "3",
	},
	{
		sn: "2",
		code: "MCSC 201",
		name: "Discrete Mathematics/Structure",
		credit: "3",
	},
	{ sn: "3", code: "EEEG 202", name: "Digital Logic", credit: "3" },
	{
		sn: "4",
		code: "EEEG 211",
		name: "Electronics Engineering",
		credit: "3",
	},
	{
		sn: "5",
		code: "COMP 202",
		name: "Data Structure and Algorithm",
		credit: "3",
	},
	{ sn: "6", code: "COMP 206", name: "Computer Project I", credit: "2" },
	{ sn: "7", code: "COMP 208", name: "Laboratory Work", credit: "1" },
];
const ProfileBar = ({ selected }) => {
	return (
		<Grid
			container
			direction="column"
			justify="center"
			alignItems="flex-end"
		>
			<Grid item style={styleSheet.profileBox}>
				<ProfileBox user={user} />
			</Grid>
			<Grid item style={styleSheet.courseBox}>
				<CourseBox courseList={courses} selected={1} />
			</Grid>
		</Grid>
	);
};

export default ProfileBar;
