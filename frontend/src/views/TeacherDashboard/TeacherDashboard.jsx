import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import "./statics/css/teacherDashboard.css";
import Profile from "./../../assets/pp.jpg";
import colorscheme from "../../utils/colors";
import { ImCross } from "react-icons/im";
import Student from "./components/Student";
import callAPI from "../../utils/API";

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

const TeacherDashbaord = ({ match }) => {
	const [popup, setPopup] = useState(false);
	const classDetailsDefault = {
		id: null,
		title: null,
		titleDescription: null,
		title2: null,
		title2Description: null,
		bottomText: null,
		button: null,
	};

	const [classDetails, setClassDetails] = useState(classDetailsDefault);

	const classSessionFormatter = (value) => {
		if (!value.data.length) {
			return [];
		}
		let active_class_session = value.data.filter((item) => {
			let start_time = new Date(item.start_time + "+05:45");
			let end_time = new Date(item.end_time + "+05:45");
			if (
				end_time.getTime() > Date.now() &&
				start_time.getTime() < Date.now()
			) {
				return item;
			}
		});
		return active_class_session[0];
	};

	useEffect(async () => {
		let class_details = null;
		if (match.params.classID) {
			const req = await callAPI({
				endpoint: `/api/v1/class_session/${match.params.classID}/`,
			});
			class_details = req.data;
		} else {
			const req = await callAPI({
				endpoint: `/api/v1/class_session/`,
			});
			class_details = classSessionFormatter(req);
		}
		if (class_details) {
			let instructors_name = class_details.instructor
				.map((instructor) => {
					return instructor.full_name;
				})
				.join(" and ");

			setClassDetails({
				id: class_details.id,
				title: class_details.course.course_code,
				titleDescription: class_details.course.course_name,
				title2: "Today's Topic",
				title2Description: class_details.description,
				bottomText: instructors_name,
				button: true,
			});
		} else {
		}
	}, []);

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
				<Grid item className="teacherDash_topBar"></Grid>
				<Grid item className="teacherDash_botBar">
					<Grid container direction="row" justify="center" alignItems="center">
						<Grid item className="teacherDash_leftContainer" xs={4}>
							<Grid
								container
								direction="column"
								justify="center"
								alignItems="center"
							>
								<Grid item className="teacherDash_activeClassBoxContainer">
									<Grid
										container
										direction="column"
										className="teacherDash_activeClassBoxInside"
									>
										<Grid item>
											<Grid
												container
												direction="row"
												alignItems="center"
												className="teacherDash_activeClassBoxTop"
											>
												<div className="teacherDash_smallRedBox"></div>
												<h1 className="teacherDash_activeClassTitle">
													Active Class
												</h1>
											</Grid>
										</Grid>
										<Grid item>
											<Grid
												container
												direction="column"
												alignItems="flex-start"
												className="teacherDash_activeClassBoxBottom"
											>
												<Grid item>
													<Grid
														container
														direction="row"
														alignItems="flex-start"
														className="teacherDash_activeClassListContainer"
													>
														<Grid
															item
															className="teacherDash_activeClassListrow1"
														>
															<Grid
																container
																direction="column"
																justify="center"
																alignItems="flex-start"
																className="teacherDash_activeClassListrow_col_box"
															>
																<Grid
																	item
																	className="teacherDash_activeClassListrow_col_1"
																>
																	<p className="teacherDash_activeClassListrow_col_1_bold">
																		{classDetails.title}
																	</p>

																	<p className="teacherDash_activeClassListrow_col_1_light">
																		{classDetails.titleDescription}
																	</p>
																</Grid>
																<Grid
																	item
																	className="teacherDash_activeClassListrow_col_2"
																>
																	<p className="teacherDash_activeClassListrow_col_2_bold">
																		{classDetails.title2}
																	</p>
																	<p className="teacherDash_activeClassListrow_col_2_light">
																		{classDetails.title2Description}
																	</p>
																</Grid>
															</Grid>
														</Grid>
													</Grid>
												</Grid>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
								<Grid item className="teacherDash_attendanceContainer"></Grid>
							</Grid>
						</Grid>
						<Grid item className="teacherDash_rightContainer" xs={8}>
							<div className="teacherDash_discussionBoxContainer"></div>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</DashboardLayout>
	);
};

export default TeacherDashbaord;
