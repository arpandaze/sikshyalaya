import React from "react";
import Grid from "@material-ui/core/Grid";
import "./statics/css/onlineBox.css";
import Profile from "./../../assets/pp.jpg";
import Online from "./Online";

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
];

const OnlineBox = () => {
  return (
		<Grid
			container
			direction="row"
			className="onlineBox_root"
			wrap="nowarp"
			alignItems="center"
		>
			<Grid item className="online_titleBar">
				<Grid container direction="row">
					<Grid item>
						<div className="onlineBox_greenDot"></div>
					</Grid>
					<Grid item>
						<p className="onlineBox_courseTextTitle">Online Users</p>
					</Grid>
				</Grid>
			</Grid>

			<Grid item xs={12} className="onlineBox_userlistContainerOuter">
				<Grid
					container
					direction="column"
					className="onlineBox_userlistContainer"
				>
					{users.map((user) => (
						<Grid item className="onlineBox_userList">
							<Online
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
	);
};

export default OnlineBox;
