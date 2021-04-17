import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import colorscheme from "../utils/colors";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Image from "./Image";
import profile from "../assets/pp.jpg";
import Button from "./Button";
import { BsArrowRightShort } from "react-icons/bs";
import { Link } from "react-router-dom";

const styleSheet = {
	root: { flexGrow: "1" },
	image: {
		borderRadius: "50%",
	},
	imageSide: {
		height: "20vh",
		position: "relative",
		top: "4px",
	},
	textSide: {
		height: "20vh",
		position: "relative",
		top: "4px",
		left: "-10px",
	},
	profileImage: {
		width: "13vh",
		position: "relative",
		top: "2.8vh",
		left: "2.5vh",
	},
	profileText: {
		fontSize: "1.3em",
		fontWeight: "bold",
	},
	textBox1: {
		width: "85%",
		position: "relative",
		top: "2vh",
	},
	textBox2: {
		width: "85%",
		position: "relative",
		top: "5vh",
	},
	textBox3: {
		width: "85%",
		position: "relative",
		top: "7vh",
		clear: "both",
	},
	departmentText: {
		fontWeight: "400",
		fontSize: "1.2em",
		color: colorscheme.red4,
	},
	buttonContainer: {
		position: "absolute",
		top: "1.2vh",
		right: "0.6vh",
	},
	profileButton: {
		width: "40px",
		height: "40px",
		backgroundColor: colorscheme.yellow2,
		borderRadius: "50%",
	},
	profileButtonIcon: {
		position: "absolute",
	},
};
const ProfileBox = ({ user, ...rest }) => {
	return (
		<Grid
			container
			spacing={1}
			direction="row"
			justify="center"
			alignItems="flex-start"
			style={styleSheet.root}
		>
			<Grid item xs={5} style={styleSheet.imageSide}>
				<div style={styleSheet.profileImage}>
					<Image
						src={user[0].image}
						alt={user[0].image}
						addStyles={styleSheet.image}
					/>
				</div>
			</Grid>
			<Grid item xs={7} style={styleSheet.textSide}>
				<Grid
					container
					direction="column"
					justify="center"
					alignItems="flex-start"
				>
					<Grid
						container
						direction="row"
						justify="flex-start"
						alignItems="flex-start"
					>
						<Grid xs={9} item style={styleSheet.textBox1}>
							<a style={styleSheet.profileText}>{user[0].name}</a>
						</Grid>
						<Grid xs={2} item style={styleSheet.buttonContainer}>
							<Link to="/profile">
								<BsArrowRightShort
									size={40}
									color={colorscheme.yellow}
									style={styleSheet.profileButtonIcon}
								/>
								<Button
									colorStyles={styleSheet.profileButton}
								></Button>
							</Link>
						</Grid>
					</Grid>
					<Grid item style={styleSheet.textBox3}>
						<a style={styleSheet.departmentText}>
							{user[0].department}
							<br />
							{user[0].year} Year / 
							{user[0].semester} Semester
						</a>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default ProfileBox;
