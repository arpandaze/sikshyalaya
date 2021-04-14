import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "../components/Button";
import colorscheme from "../utils/colors";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiFillDashboard } from "react-icons/ai";
import { BiChevronsLeft } from "react-icons/bi";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "60px",
		height: "100vh",
	},
	sidebarClose: {
		display: "flex",
		margin: "0px",
		width: "60px",
		height: "100vh",
		backgroundColor: colorscheme.white,
		display: "flex",
		transition: "300ms",
		boxShadow: "2px 2px 10px -3px rgba(0,0,0,0.2)",
	},
	sidebarOpen: {
		margin: "0px",
		display: "flex",
		width: "150px",
		height: "100vh",
		backgroundColor: colorscheme.white,
		display: "flex",
		boxShadow: "2px 2px 10px -3px rgba(0,0,0,0.2)",
		transition: "300ms",
	},
}));

const sidebarItems = [
	{
		title: "Dashboard",
		route: "/dashboard",
		icon: <AiFillDashboard size={25} />,
	},
	{
		title: "Dashboard",
		route: "/dashboard",
		icon: <AiFillDashboard size={25} />,
	},
	{
		title: "Dashboard",
		route: "/dashboard",
		icon: <AiFillDashboard size={25} />,
	},
];

const SideBar = () => {
	const theme = useTheme();
	const classes = useStyles(theme);
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const sidebarHandler = () => {
		!sidebarOpen ? setSidebarOpen(true) : setSidebarOpen(false);
	};
	return (
		<div className={classes.root}>
			<Grid
				container
				direction="column"
				alignItems="flex-start"
				className={classes.sidebarClose}
				spacing={2}
			>
				<Grid
					container
					item
					justify="center"
					onClick={sidebarHandler}
					className={
						sidebarOpen ? classes.sidebarOpen : classes.sidebarClose
					}
				>
					{sidebarOpen ? (
						<BiChevronsLeft size="25" color={colorscheme.black} />
					) : (
						<GiHamburgerMenu size="25" color={colorscheme.black} />
					)}
				</Grid>
			</Grid>
		</div>
	);
};

export default SideBar;
