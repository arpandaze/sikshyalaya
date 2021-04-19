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
import colorscheme from "../../utils/colors";
import ProfileBar from "../../components/ProfileBar";
import DashboardLayout from "../../components/DashboardLayout";
import Note from "../../components/Note";
import SideNotes from "../../components/SideNotes";
import { GoPlus } from "react-icons/go";
import { BiSquare } from "react-icons/bi";
import { CgMenuGridR } from "react-icons/cg";

const styleSheet = {
	notepad: {
		flexGrow: "1",
		width: "95%",
		margin: "0px auto",
		position: "absolute",
		left: "39%",
		top: "15.5%",
	},
	sideNotes: {
		position: "relative",
		left: "30%",
	},
	sideNoteContainer: {
		position: "absolute",
		top: "15.5% ",
	},
	notesText: {
		position: "absolute",
		top: "8%",
		left: "6%",
		fontWeight: "bold",
		fontSize: "2.5em",
		cursor: "text",
	},
	plusIcon: {
		position: "absolute",
		top: "6%",
		left: "28%",
		cursor: "pointer",
	},
	gridIconsContainer: {
		flexGrow: "1",
		position: "absolute",
		right: "10%",
		top: "11%",
		cursor: "pointer",
	},
};
const typing = true;
const note = {
	title: "Title goes here.",
	content: "Content goes here",
	state: typing ? "Typing..." : "Saved",
};
const sideNotes = [
	{
		id:"1",
		title: "Test",
		content: "hello hi there",
	},
	{
		id:"2",
		title: "Hello",
		content:"heeeeelllo",
		
	},
	
]
const Dashboard = () => {
	const [typing,setTyping] =useState(false)
	return (
		<DashboardLayout>
			<Grid container style={styleSheet.sideBarSuperContainer}>
				<Grid
					container
					xs={2}
					spacing={8}
					direction="row"
					justify="flex-start"
				>
					<Grid item>
						<div style={styleSheet.notesText}>Notes</div>
					</Grid>
					<Grid item style={styleSheet.plusIcon}>
						<GoPlus size={30} color={colorscheme.green2} />
					</Grid>
				</Grid>
				<Grid
					container
					xs={2}
					spacing={4}
					direction="column"
					justify="flex-start"
					style={styleSheet.sideNoteContainer}
				>
					{sideNotes.map((notes) => (
						<Grid item key={notes.id} style={styleSheet.sideNotes}>
							<SideNotes
								title={notes.title}
								content={notes.content}
							/>
						</Grid>
					))}
					;
				</Grid>
			</Grid>
			<Grid
				container
				xs={1}
				direction="row"
				justify="flex-end"
				alignItems="flex-start"
				spacing={1}
				style={styleSheet.gridIconsContainer}
			>
				<Grid item>
					<BiSquare size={30} color={colorscheme.grey1} />
				</Grid>
				<Grid item>
					<CgMenuGridR size={30} color={colorscheme.grey1} />
				</Grid>
			</Grid>
			<Grid
				container
				direction="column"
				justify="center"
				alignItems="flex-start"
				style={styleSheet.notepad}
			>
				<Note title={note.title} content={note.content} />
			</Grid>
		</DashboardLayout>
	);
};

export default Dashboard;
