import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import "../TeacherDashboard/statics/css/teacherDashboard.css";
import ClassResource from "../Dashboard/components/ClassResource";
import callAPI from "../../utils/API";
import DiscussionBox from "../../components/DiscussionBox.jsx";
import ConditionalRendering from "../../components/ConditionalRendering";
import Student from "./components/Student";
import Button from "@material-ui/core/Button";
import { GoPlus } from "react-icons/go";
import configs from "../../utils/configs";

const getFileType = (item) => {
	switch (item) {
		case "application/msword":
			return "document";
			break;
		case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
			return "document";
			break;
		case "image/jpeg":
			return "image";
			break;
		case "image/png":
			return "image";
			break;
		case "application/pdf":
			return "pdf";
			break;
		case "application/vnd.ms-powerpoint":
			return "presentation";
			break;
		case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
			return "presentation";
			break;
		case "application/vnd.rar":
			return "zip";
			break;
		case "application/x-tar":
			return "zip";
			break;
		case "application/zip":
			return "zip";
			break;
		case "application/x-7z-compressed":
			return "zip";
			break;
	}
};

const students = [];
let groupID = null;

const Dashboard = ({ match }) => {
	const [buttonType, setButtonType] = useState(true);

	const [pageState, setPageState] = useState(0);

	const classDetailsDefault = {
		id: null,
		title: null,
		titleDescription: null,
		title2: null,
		title2Description: null,
		bottomText: null,
		button: null,
		resources: [],
		groupID: null,
		teachers: [],
		classID: null,
	};

	const [classDetails, setClassDetails] = useState(classDetailsDefault);

	const classSessionFormatter = (value) => {
		if (!value.data.length) {
			return null;
		}
		const currentDateTime = new Date();
		let active_class_session = value.data.filter((item) => {
			let start_time = new Date(
				new Date(item.start_time).toLocaleString() + " UTC"
			);
			let end_time = new Date(
				new Date(item.end_time).toLocaleString() + " UTC"
			);
			if (end_time > currentDateTime && start_time < currentDateTime) {
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
			let resources = class_details.files.map((item, index) => {
				return {
					id: index,
					name: item.name,
					url: `/${item.path}/${item.name}`,
					type: getFileType(item.file_type),
					time: item.uploaded_datetime,
				};
			});
			setClassDetails({
				id: class_details.id,
				title: class_details.course.course_code,
				titleDescription: class_details.course.course_name,
				title2: "Today's Topic",
				title2Description: class_details.description,
				bottomText: instructors_name,
				button: true,
				resources: resources,
				groupID: class_details.group_id,
				teachers: class_details.instructor,
				classID: class_details.id,
			});
		} else {
			setPageState(1);
		}
	}, []);
	groupID = classDetails.groupID;
	console.log(groupID);

	useEffect(async () => {
		let class_details = null;
		try {
			const req = await callAPI({
				endpoint: `/api/v1/group/9/student/`,
			});
			class_details = req.data;
		} catch (e) {
			console.log(e);
		}

		if (class_details) {
			class_details.student.map((student) => {
				students.push({
					id: student.id,
					name: student.full_name,
					profile_image:
						configs.PUBLIC_FILES_PATH + "/" + student.profile_image,
				});
			});
		}
	}, []);
	console.log(students);
	const [ids, setIDs] = useState([]);
	const [state, setState] = useState(true);

	const postAttendance = async () => {
		let data = null;

		data = {
			attendant: [],
		};
		const postAttendants = await callAPI({
			endpoint: `/api/v1/class_session/${groupID}/attendance`,
			method: "PUT",
			data: data,
		});
	};

	// const handleChange = (event, a) => {
	// 	setChecked(event.target.checked);
	// };

	// const onClickHandler = (a) => {
	// 	console.log(checked);
	// 	if (checked) {
	// 		setIDs((prevIDs) => [...prevIDs, a]);
	// 	} else {
	// 		let x = ids.filter((b) => a != b);
	// 		setIDs(x);
	// 	}
	// };

	return (
		<DashboardLayout rightbar={null}>
			<ConditionalRendering condition={pageState == 0}>
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
						<Grid
							container
							direction="row"
							justify="center"
							alignItems="center"
						>
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
									<Grid item className="teacherDash_classResourcesBoxContainer">
										<Grid
											container
											direction="column"
											className="teacherDash_classResourceBoxInside"
										>
											<Grid item>
												<Grid
													container
													direction="row"
													alignItems="center"
													className="teacherDash_classResourceBoxTop"
												>
													<div className="teacherDash_smallPurpleBox"></div>
													<h1 className="teacherDash_classResourceTitle">
														Attendance
													</h1>
													<Button
														onMouseOver={() => {
															setButtonType(false);
														}}
														onMouseOut={() => {
															setButtonType(true);
														}}
														variant={buttonType ? "outlined" : "contained"}
														color="primary"
														onClick={postAttendance}
														className="teacherDash_addsessionButton"
													>
														Done
													</Button>
												</Grid>
											</Grid>
											<Grid item>
												<Grid
													container
													direction="column"
													alignItems="center"
													className="teacherDash_classResourceBoxBottom"
													wrap="nowrap"
												>
													{students.map((user) => (
														<Student
															id={user.id}
															username={user.name}
															src={user.profile_image}
															// currentState={checked}
															onClick={(e) => {
																// setChecked(e.target.checked);
																if (e.target.checked) {
																	setState([...ids, user.id]);
																} else {
																	setState(
																		ids.filter((item) => item != user.id)
																	);
																}
																console.log(e);
															}}
														/>
													))}
												</Grid>
												{console.log(ids)}
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
							<Grid item className="teacherDash_middleContainer" xs={8}>
								<DiscussionBox classDetails={classDetails} />
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</ConditionalRendering>
			<ConditionalRendering condition={pageState == 1}>
				<h1>No class session active right now!</h1>
			</ConditionalRendering>
		</DashboardLayout>
	);
};

export default Dashboard;
