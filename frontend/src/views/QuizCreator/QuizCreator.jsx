import React, { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import Button from "../../components/Button";
import DashboardLayout from "../../components/DashboardLayout";
import * as yup from "yup";
import CustomTextField from "./../../components/CustomTextField";
import Checkbox from "./../../components/Checkbox";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import { ImCross } from "react-icons/im";
import { format } from "date-fns";
import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker,
	KeyboardDatePicker,
} from "@material-ui/pickers";
import { BiTimeFive } from "react-icons/bi";
import "./statics/css/quizCreator.css";
import colorscheme from "../../utils/colors";

const validationSchema = yup.object({
	quiz_title: yup.string("Enter the title of the quiz"),
	quiz_description: yup.string("Enter description"),
});

const questionType = [
	{
		name: "Text",
		value: 1,
	},
	{
		name: "Image",
		value: 2,
	},
];

let answerList = [];

const QuizCreator = () => {
	const questionInitialValue = {
		question_text: "",
		question_type: "",
		options: [],
	};
	const handleSubmit = (values) => {
		console.log(values);
	};
	const [startTime, setStartTime] = useState(new Date());
	const [endTime, setEndTime] = useState(new Date());
	const [quizDate, setQuizDate] = useState(new Date());

	return (
		<DashboardLayout>
			<Grid
				container
				direction="column"
				justify="center"
				alignItems="center"
				className="quizCreator_root"
			>
				<Grid item className="quizCreator_header">
					<a className="quizCreator_titleText">Quiz Creation Menu</a>
				</Grid>
				<Grid item className="quizCreator_body">
					<Grid item className="quizCreator_outerContainer">
						<Formik
							enableReinitialize={true}
							initialValues={{
								quiz_title: "",
								quiz_description: "",
								quiz_date: "",
								start_time: "",
								end_time: "",
								isRandomized: false,
							}}
							validationSchema={validationSchema}
							onSubmit={(values) =>
								setTimeout(() => {
									alert(JSON.stringify(values, null, 2));
								}, 500)
							}
						>
							{({ values, setFieldValue }) => (
								<>
									{console.log(values)}
									<Form className="quizCreator_formBox">
										<Grid
											container
											direction="column"
											alignItems="center"
											justify="center"
											className="quizCreator_innerContainer"
											spacing={3}
										>
											<Grid
												item
												xs={12}
												className="quizCreator_titleFieldContainer"
											>
												<Field
													id="quiz_title"
													name="quiz_title"
													placeholder="Enter the title of the quiz"
													className="quizCreator_titleField"
												/>
											</Grid>
											<Grid
												item
												className="quizCreator_descriptionFieldContainer"
											>
												<Field
													id="quiz_description"
													name="quiz_description"
													placeholder="Description of the quiz"
													className="quizCreator_descriptionField"
												/>
											</Grid>

											<MuiPickersUtilsProvider
												utils={DateFnsUtils}
											>
												<Grid
													container
													direction="row"
													alignItems="center"
													justify="center"
													className="quizCreator_dateTimePickerContainer"
													spacing={3}
												>
													<Grid
														item
														className="quizCreator_quizDateField"
													>
														{/**TODO: Add date restriction */}
														<KeyboardDatePicker
															value={startTime}
															margin="normal"
															id="quiz_date"
															label="Choose quiz date"
															inputVariant="outlined"
															format="MM/dd/yyyy"
															value={quizDate}
															onChange={(
																value
															) => {
																setFieldValue(
																	"quiz_date",
																	format(
																		value,
																		"MM/dd/yyyy"
																	)
																);
																setQuizDate(
																	value
																);
															}}
														/>
													</Grid>
													<Grid
														item
														className="quizCreator_quizStartTime"
													>
														<KeyboardTimePicker
															margin="normal"
															id="start_time"
															label="Start time"
															inputVariant="outlined"
															value={startTime}
															onChange={(
																value
															) => {
																setFieldValue(
																	"start_time",
																	format(
																		value,
																		"hh:mm a"
																	)
																);
																setStartTime(
																	value
																);
															}}
															KeyboardButtonProps={{
																"aria-label":
																	"change time",
															}}
															keyboardIcon={
																<BiTimeFive />
															}
														/>
													</Grid>
													<Grid
														item
														className="quizCreator_quizEndTime"
													>
														<KeyboardTimePicker
															margin="normal"
															id="end_time"
															label="End time"
															inputVariant="outlined"
															value={endTime}
															onChange={(
																value
															) => {
																setFieldValue(
																	"end_time",
																	format(
																		value,
																		"hh:mm a"
																	)
																);
																setEndTime(
																	value
																);
															}}
															KeyboardButtonProps={{
																"aria-label":
																	"change time",
															}}
															keyboardIcon={
																<BiTimeFive />
															}
														/>
													</Grid>
												</Grid>
											</MuiPickersUtilsProvider>
											<Grid
												container
												direction="row"
												alignItems="center"
												justify="center"
												className="quizCreator_randomContainer"
												wrap="nowrap"
											>
												<Grid
													item
													className="quizCreator_randomLabel"
												>
													<label
														htmlFor="is_randomized"
														className="quizCreator_randomText"
													>
														Randomize Questions
													</label>
												</Grid>
												<Grid
													item
													className="quizCreator_check"
												>
													<Checkbox
														id="is_randomized"
														name="isRandomized"
														className="quizCreator_randomCheckBox"
													/>
												</Grid>
											</Grid>

											<Grid item className="submission">
												<Grid
													container
													className="quizCreator_addQuestion"
													alignItems="center"
													justify="center"
												>
													<Field name="questions">
														{() => (
															<>
																<FieldArray name="questions">
																	{(
																		questionHelper
																	) => (
																		<>
																			<Grid
																				item
																				className="quizCreator_addQuestionButtonContainer"
																			>
																				<button
																					type="button"
																					className="quizCreator_addQuestionButton"
																					onClick={() => {
																						questionHelper.push(
																							questionInitialValue
																						);
																						answerList.push(
																							[]
																						);
																					}}
																				>
																					Add
																					Question
																				</button>
																			</Grid>
																			{values.questions &&
																				values
																					.questions
																					.length !==
																					0 &&
																				values.questions.map(
																					(
																						question,
																						index
																					) => (
																						<>
																							<Grid
																								container
																								direction="column"
																								wrap="nowrap"
																								className="quizCreator_questionRemovecontainer"
																							>
																								<div
																									key={
																										index +
																										1
																									}
																								>
																									<Grid
																										container
																										directon="row"
																										justify="center"
																										alignItems="center"
																										wrap="nowrap"
																									>
																										<Grid
																											item
																											xs={
																												7
																											}
																										>
																											<h4 className="quizCreator_questionNumber">
																												Question
																												#
																												{index +
																													1}
																											</h4>
																										</Grid>
																										<Grid
																											item
																											xs={
																												5
																											}
																											className="quizCreator_removeContainer"
																										>
																											<button
																												type="button"
																												title="Remove Question"
																												className="quizCreator_remove"
																												onClick={() => {
																													questionHelper.remove(
																														index
																													);
																													answerList.splice(
																														index,
																														1
																													);
																												}}
																											>
																												<ImCross size={20} color={colorscheme.red2} />
																											</button>
																										</Grid>
																									</Grid>
																									<Grid
																										item
																										xs={
																											12
																										}
																									>
																										<CustomTextField
																											name={`questions[${index}].question_text`}
																											addStyles="quizCreator_questionTitle"
																											type="text"
																											placeHolder="Question Title"
																										/>
																									</Grid>
																									<Grid
																										item
																										xs={
																											12
																										}
																									>
																										<CustomTextField
																											addStyles="quizCreator_dropdown"
																											dropdown={
																												true
																											}
																											name={`questions[${index}].question_type`}
																											menuItems={
																												questionType
																											}
																											placeHolder="Question Type"
																										/>
																									</Grid>
																								</div>
																							</Grid>
																							<Grid
																								container
																								direction="column"
																								alignItems="center"
																								justify="center"
																							>
																								<FieldArray
																									name={`questions[${index}].options`}
																								>
																									{(
																										newHelper
																									) => (
																										<>
																											<button
																												type="button"
																												className="quizCreator_addOptions"
																												onClick={() => {
																													newHelper.push();
																													answerList[
																														index
																													].push(
																														{
																															name: `Option ${
																																question
																																	.options
																																	.length +
																																1
																															}`,
																															value:
																																question
																																	.options
																																	.length +
																																1,
																														}
																													);
																												}}
																											>
																												Add
																												Options
																											</button>
																											{question.options &&
																												question
																													.options
																													.length !==
																													0 &&
																												question.options.map(
																													(
																														option,
																														optionIndex
																													) => (
																														<div
																															key={
																																optionIndex
																															}
																														>
																															<Grid
																																item
																															>
																																<CustomTextField
																																	addStyles="quizCreator_option"
																																	name={`questions[${index}].options[${optionIndex}]`}
																																	placeHolder={`Option ${
																																		optionIndex +
																																		1
																																	}`}
																																/>
																															</Grid>
																														</div>
																													)
																												)}
																											<Grid
																												item
																												className="quizCreator_final"
																												xs={12}
																											>
																												
																													<CustomTextField
																														addStyles="quizCreator_correct"
																														dropdown={
																															true
																														}
																														name={`questions[${index}].answer`}
																														menuItems={
																															answerList[
																																index
																															] ||
																															[]
																														}
																														placeHolder="Choose correct Option"
																													/>
																											
																											</Grid>
																										</>
																									)}
																								</FieldArray>
																							</Grid>
																						</>
																					)
																				)}
																		</>
																	)}
																</FieldArray>
															</>
														)}
													</Field>
												</Grid>
												<Grid
													container
													alignItems="center"
													justify="center"
													direction="row"
												>
													<Grid
														item
														className="quizCreator_submitButtonContainer"
													>
														<button
															type="submit"
															className="quizCreator_submitButton"
														>
															Submit
														</button>
													</Grid>
												</Grid>
											</Grid>
										</Grid>
									</Form>
								</>
							)}
						</Formik>
					</Grid>
				</Grid>
			</Grid>
		</DashboardLayout>
	);
};

export default QuizCreator;
