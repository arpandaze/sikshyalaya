import React, { useState, useContext } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import Button from "../../components/Button";
import DashboardLayout from "../../components/DashboardLayout";
import * as yup from "yup";
import CustomTextField from "./../../components/CustomTextField";
import Grid from "@material-ui/core/Grid";

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

const QuizCreator = () => {
	const questionInitialValue = {
		question_text: "",
		question_type: "",
		options: [],
	};
	const [answer, setAnswer] = useState([{ name: "", value: "" }]);
	const handleSubmit = (values) => {
		console.log(values);
	};

	return (
		<DashboardLayout>
			<Grid container direction="row" alignItems="flex-start">
				<Grid item>
					<Formik
						enableReinitialize={true}
						initialValues={{
							quiz_title: "",
							quiz_description: "",
							questions: [
								{
									question_text: "",
									question_type: "",
									options: [],
								},
							],
						}}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
					>
						{({ values }) => (
							<Form>
								<Grid container direction="column" alignItems="flex-start">
									<Grid item>
										<Field
											id="quiz_title"
											name="quiz_title"
											placeholder="Enter the title of the quiz"
										/>
									</Grid>
									<Grid item>
										<Field
											id="quiz_description"
											name="quiz_description"
											placeholder="Description"
										/>
									</Grid>
									<Grid item>
										<Field name="questions">
											{() => (
												<>
													<FieldArray
														name="questions"
														render={(questionHelper) => (
															<div>
																<div>
																	<button
																		type="button"
																		onClick={() => {
																			questionHelper.push(questionInitialValue);
																		}}
																	>
																		Add Question
																	</button>
																</div>
																{values.questions &&
																	values.questions.length !== 0 &&
																	values.questions.map((question, index) => (
																		<>
																			<div key={index + 1}>
																				<button
																					type="button"
																					title="Remove Question"
																					onClick={() =>
																						questionHelper.remove(index)
																					}
																				>
																					Remove Question
																				</button>
																				<h4>Question #{index + 1}</h4>
																				<CustomTextField
																					name={`questions[${index}].question_text`}
																					type="text"
																					placeHolder="Question Title"
																				/>
																				<CustomTextField
																					dropdown={true}
																					name={`questions[${index}].question_type`}
																					menuItems={questionType}
																					placeHolder="Question Type"
																				/>
																			</div>
																			<FieldArray
																				name={`questions[${index}].options`}
																				render={(newHelper) => (
																					<>
																						{/**Fix arrayHelper returning actual lenght minus 1 */}
																						<button
																							type="button"
																							onClick={() => {
																								newHelper.push();
																								setAnswer([
																									...answer,
																									{
																										name: `Option ${
																											question.options.length +
																											1
																										}`,
																										value:
																											question.options.length +
																											1,
																									},
																								]);
																							}}
																						>
																							Add Options
																						</button>
																						{question.options &&
																							question.options.length !== 0 &&
																							question.options.map(
																								(option, optionIndex) => (
																									<div key={optionIndex}>
																										<div>
																											<CustomTextField
																												name={`questions[${index}].options[${optionIndex}]`}
																												placeHolder={`Option ${
																													optionIndex + 1
																												}`}
																											/>
																										</div>
																									</div>
																								)
																							)}

																						<CustomTextField
																							dropdown={true}
																							name={`questions[${index}].answer`}
																							menuItems={answer || []}
																							placeHolder="Question Type"
																						/>
																					</>
																				)}
																			></FieldArray>
																		</>
																	))}
															</div>
														)}
													/>
												</>
											)}
										</Field>
										<div>
											<button type="submit">Submit</button>
										</div>
									</Grid>
								</Grid>
							</Form>
						)}
					</Formik>
				</Grid>
			</Grid>
		</DashboardLayout>
	);
};

export default QuizCreator;
