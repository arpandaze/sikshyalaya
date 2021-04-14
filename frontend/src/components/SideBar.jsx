import React, { useState } from "react";
import Button from "../components/Button";
import theme from "../utils/colors";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiFillDashboard } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

const styleSheet = {
	sidebarClose: {
		width: "60px",
		height: "100vh",
		backgroundColor: theme.white,
		display: "flex",
		backgroundColor: "transparent",
		transition: "500ms",
		boxShadow: "2px 2px 13px -3px rgba(0,0,0,0.32)",
	},
	sidebarOpen: {
		width: "150px",
		height: "100vh",
		backgroundColor: theme.white,
		display: "flex",
		backgroundColor: "transparent",
		justifyContent: "right",
		boxShadow: "2px 2px 13px -3px rgba(0,0,0,0.32)",
		transition: "500ms",
	},
	iconStyle: {},
};

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
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const sidebarHandler = () => {
		!sidebarOpen ? setSidebarOpen(true) : setSidebarOpen(false);
	};
	return (
		<Grid
			container
			direction="column"
			justify="center"
			alignItems="flex-start"
			style={styleSheet.sidebarClose}
		>
			<Box>
				<GiHamburgerMenu size="25" onClick={sidebarHandler} />
				{console.log(sidebarOpen)}
			</Box>
		</Grid>

		// {/* <List display="flex-start">
		//       <ListItem button onClick={sidebarHandler} style={sidebarOpen?styleSheet.sidebarOpen:styleSheet.sidebarClose}>
		//             <ListItemIcon disableRipple={true}>
		//                   {sidebarOpen?<FaArrowLeft size="25" style={styleSheet.hamburgerIcon}/>:<GiHamburgerMenu size="25"/>}
		//             </ListItemIcon>
		//       </ListItem>
		// </List> */}
	);
};

export default SideBar;
