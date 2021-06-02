import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Formik, Form, FieldArray, Field } from "formik";
import CustomTextField from "../../components/CustomTextField";
import DashboardLayout from "../../components/DashboardLayout";
import Button from "../../components/Button";
import DateFnsUtils from "@date-io/date-fns";
import { BiMinus } from "react-icons/bi";
import { GoPlus } from "react-icons/go";
import { format } from "date-fns";
import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker,
	KeyboardDatePicker,
} from "@material-ui/pickers";
import { BiTimeFive } from "react-icons/bi";
import colorscheme from "../../utils/colors";
import "./statics/css/classSessionCreator.css";

const ClassSessionCreator = () => {
	const [startTime, setStartTime] = useState(new Date());
	const [endTime, setEndTime] = useState(new Date());
	const [selectFile, setSelectedFile] = useState();
	const [tempFile, setTempFile] = useState();
	const [isPicked, setIsPicked] = useState(false);

	const onFileUpload = async (e) => {
		let reader = new FileReader();
		reader.readAsDataURL(e.target.files[0]);
		reader.onload = () => {
			setTempFile(reader.result);
		};
		setIsPicked(true);
		setSelectedFile(e.target.files[0]);
	};
	return (
		<>
			<DashboardLayout>
				<Grid
					container
					direction="column"
					alignItems="flex-start"
					justify="flex-start"
					className="classSession_root"
				>
					<Grid item className="classSession_heading">
						<a className="classSession_headingText">Create Class Session</a>
					</Grid>
					<Grid item className="classSession_body">
						<Formik
							enableReinitialize={true}
							initialValues={{
								start_time: "",
								end_time: "",
								group: "",
								description: "",
							}}
							onSubmit={(values) =>
								setTimeout(() => {
									alert(JSON.stringify(values, null, 2));
								}, 500)
							}
						>
							{({ values, setFieldValue }) => (
								<>
									<Form>
										<Grid
											item
											className="classSession_dateTimePickerContainerOuter"
										>
											<MuiPickersUtilsProvider utils={DateFnsUtils}>
												<Grid
													container
													direction="row"
													alignItems="center"
													justify="center"
													className="classSession_dateTimePickerContainer"
													spacing={3}
												>
													<Grid item>
														<KeyboardTimePicker
															margin="normal"
															id="start_time"
															label="Start time"
															inputVariant="outlined"
															value={startTime}
															onChange={(value) => {
																setFieldValue("start_time", value);
																setStartTime(value);
															}}
															KeyboardButtonProps={{
																"aria-label": "change time",
															}}
															keyboardIcon={<BiTimeFive />}
														/>
													</Grid>
													<Grid item>
														<KeyboardTimePicker
															margin="normal"
															id="end_time"
															label="End time"
															inputVariant="outlined"
															value={endTime}
															onChange={(value) => {
																setFieldValue("end_time", value);
																setEndTime(value);
															}}
															KeyboardButtonProps={{
																"aria-label": "change time",
															}}
															keyboardIcon={<BiTimeFive />}
														/>
													</Grid>
												</Grid>
											</MuiPickersUtilsProvider>
										</Grid>
										<Grid
											item
											className="classSession_instructorContainerOuter"
										>
											<Grid
												container
												direction="column"
												alignItems="center"
												justify="center"
												className="classSession_instructorContainer"
											>
												<FieldArray name="instructors">
													{(arrayHelpers) => (
														<>
															{values.instructors &&
																values.instructors.length !== 0 &&
																values.instructors.map((instructor, index) => (
																	<>
																		<div key={index}>
																			<Grid
																				item
																				className="classSession_instructorFieldOuter"
																			>
																				<Grid
																					container
																					direction="row"
																					className="classSession_instructorField"
																					alignItems="center"
																					justify="center"
																				>
																					<Grid
																						item
																						xs={10}
																						className="classSession_instructorFieldInner"
																					>
																						<CustomTextField
																							name={`instructors[${index}]`}
																							placeHolder="Add Instructors"
																							addStyles="classSession_inputField"
																						/>
																					</Grid>

																					<Grid item xs={2}>
																						<button
																							type="button"
																							onClick={() =>
																								arrayHelpers.remove(index)
																							}
																							className="classSession_removeButton"
																						>
																							<BiMinus
																								size={20}
																								color={colorscheme.red2}
																							/>
																						</button>
																					</Grid>
																				</Grid>
																			</Grid>
																		</div>
																	</>
																))}
															<Grid item>
																<button
																	type="button"
																	title="Add Instructor"
																	onClick={() => arrayHelpers.push()}
																	className="classSession_addInstructor"
																>
																	Add Instructor
																</button>
															</Grid>
														</>
													)}
												</FieldArray>
												<Grid
													container
													direction="column"
													alignItems="center"
													justify="center"
												>
													<Grid item>
														<CustomTextField
															name="group"
															placeHolder="Group"
															addStyles="classSession_inputField"
														/>
													</Grid>
													<Grid item className="classSession_description">
														<CustomTextField
															name="description"
															placeHolder="Enter description"
															addStyles="classSession_inputField"
														/>
													</Grid>
													<Grid item className="classSession_upload">
														<label for="resources">
															<p className="classSession_uploadText">
																Upload resources:
															</p>
														</label>
														<input
															id="resources"
															name="resources"
															type="file"
															onChange={onFileUpload}
															accept=".jpg,.jpeg,.png,.pdf,.pptx,.ppt,.7z,.zip,.rar,.doc,.docx"
														></input>
													</Grid>
												</Grid>

												<Grid item>
													<Button
														name="Submit"
														type="submit"
														addStyles="classSession_submit"
													/>
												</Grid>
											</Grid>
										</Grid>
									</Form>
								</>
							)}
						</Formik>
					</Grid>
				</Grid>
			</DashboardLayout>
		</>
	);
};

export default ClassSessionCreator;
