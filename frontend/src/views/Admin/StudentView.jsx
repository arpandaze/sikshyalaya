import React, { useState } from "react";
import Button from "../../components/Button";
import Grid from "@material-ui/core/Grid";
import colorscheme from "../../utils/colors";
import DashboardLayout from "../../components/DashboardLayout";
import NotificationButton from "../../components/NotificationButton";
import Students from "../../components/Student";
import { GoPlus } from "react-icons/go";

const styleSheet = {
	root: {
		width: "95%",
		height: "100vh",
		margin: "0px auto",
		position: "relative",
		left: "-20px",
		flexGrow: "1",
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
	mainContainer: {
		height: "810px",
	},
	innerContainer: {
		width: "95%",
		height: "780px",
		marginLeft: "35px",
		overflow: "scroll",
		overflowX: "hidden",
	},
	departText: {
		fontWeight: "bold",
		fontSize: "3em",
		float: "left",
		marginLeft: "40px",
	},
	plusIcon: {
		float: "right",
		marginRight: "100px",
		marginTop: "10px",
		cursor: "pointer",
	},
};
const selectedCLass = [
	{
		name: "CS 2019",
	},
];

const students = [
	{
		id: "1",
		name: "Aatish Shrestha",
	},
	{
		id: "2",
		name: "Yugesh Upadhyaya Luitel",
	},
	{
		id: "3",
		name: "Rushab  Humagain",
	},
	{
		id: "4",
		name: "Arpan Koirala",
	},
	{
		id: "5",
		name: "Abiral Banjade",
	},
	{
		id: "6",
		name: "Ishan Pant",
	},
	{
		id: "7",
		name: "Mulyankan Sharma",
	},
	{
		id: "8",
		name: "Sangarsha Paudel",
	},
	{
		id: "9",
		name: "Pawan Khatri",
	},
	{
		id: "10",
		name: "Nwang Choegyap Gurung",
	},
	{
		id: "11",
		name: "Heriz Bista",
	},
	{
		id: "12",
		name: "Anish Joshi",
	},
	{
		id: "13",
		name: "Paribesh Panta",
	},
	{
		id: "14",
		name: "Luniva Chitrakar",
	},
	{
		id: "15",
		name: "Lahana Kansakar",
	},
	{
		id: "16",
		name: "Sushma Lamsal",
	},
	{
		id: "17",
		name: "Abhijeet Poudel",
	},
	{
		id: "18",
		name: "Utkrista Thapa",
	},
	{
		id: "19",
		name: "Niranjan Pandey",
	},
];

const StudentView = ({ depart, ...rest }) => {
	const [clicked, setClicked] = useState(false);
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
					<Grid item>
						<a style={styleSheet.departText}>
							{selectedCLass[0].name}
						</a>
					</Grid>
					<Grid item style={styleSheet.plusIcon}>
						<GoPlus size={40} color={colorscheme.green3} />
					</Grid>
				</Grid>

				<Grid item style={styleSheet.botBar}>
					<Grid item style={styleSheet.mainContainer} xs={12}>
						<Grid
							container
							direction="row"
							justify="flex-start"
							alignItems="Flex-start"
							spacing={1}
							style={styleSheet.innerContainer}
						>
							{students.map((item) => (
								<Grid item>
									<Students name={item.name} />
								</Grid>
							))}
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</DashboardLayout>
	);
};

export default StudentView;
