import React from "react";
import Grid from "@material-ui/core/Grid";
import "./statics/css/onlineBox.css";
import Profile from "./../../assets/pp.jpg";
import Online from "./Online";

const users = [
	{
		id: 1,
		username: "Yugesh Upadhyaya Luitel",
		imagesrc: Profile,
	},
	{
		id: 2,
		username: "Yugesh Upadhyaya Luitel",
		imagesrc: Profile,
	},
	{
		id: 3,
		username: "Yugesh Upadhyaya Luitel",
		imagesrc: Profile,
	},
	{
		id: 4,
		username: "Yugesh Upadhyaya Luitel",
		imagesrc: Profile,
	},
	{
		id: 5,
		username: "Yugesh Upadhyaya Luitel",
		imagesrc: Profile,
	},
	{
		id: 6,
		username: "Yugesh Upadhyaya Luitel",
		imagesrc: Profile,
	},
	{
		id: 7,
		username: "Yugesh Upadhyaya Luitel",
		imagesrc: Profile,
	},
	{
		id: 8,
		username: "Yugesh Upadhyaya Luitel",
		imagesrc: Profile,
	},
	{
		id: 9,
		username: "Yugesh Upadhyaya Luitel",
		imagesrc: Profile,
	},
	{
		id: 10,
		username: "Yugesh Upadhyaya Luitel",
		imagesrc: Profile,
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
						<p className="onlineBox_courseTextTitle">Online</p>
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
								username={user.username}
								src={user.imagesrc}
							/>
						</Grid>
					))}
				</Grid>
			</Grid>
		</Grid>
	);
};

export default OnlineBox;
