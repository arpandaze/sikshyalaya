import React, { useState, useContext } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import Button from "../../components/Button";
import DashboardLayout from "../../components/DashboardLayout";
import * as yup from "yup";
import CustomTextField from "./../../components/CustomTextField";
import Grid from "@material-ui/core/Grid";
import Options from "./Options";
import { QuizContext } from "./QuizContext";

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
	const [questionIndex, setQuestionIndex] = useState(0);
	return (
		<DashboardLayout>
			{/* <QuizContext.Provider value={{ initialValue, setInitialValue, questionIndex, setQuestionIndex }}> */}
			<Grid container direction="row" alignItems="flex-start">
				<Grid item>
					<Formik
						enableReinitialize={true}
						initialValues={{
							quiz_title: "",
							quiz_description: "",
							questions: [{ question_text: "", question_type: "", options: [""] }],
						}}
						validationSchema={validationSchema}
						onSubmit={(values) => {
							alert(JSON.stringify(values, null, 2));
						}}
					>
						{({ values }) => (
							<Form>
								<Grid container direction="column" alignItems="flex-start">
									<Grid item>
										<Field id="quiz_title" name="quiz_title" placeholder="Enter the title of the quiz" />
									</Grid>
									<Grid item>
										<Field id="quiz_description" name="quiz_description" placeholder="Description" />
									</Grid>
									<Grid item>
										<Field name="questions">
											{(fieldProps) => (
												<>
													<FieldArray
														name="questions"
														render={(arrayHelpers) => (
															<div>
																<div>
																	<button type="button" onClick={() => arrayHelpers.push()}>
																		Add Question
																	</button>
																</div>
																{values.questions.map((question, index) => (
																	<>
																		<div key={index}>
																			<button
																				type="button"
																				title="Remove Question"
																				onClick={() => arrayHelpers.remove(index)}
																			>
																				-
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
																		{/* TODO: Options lai milaune */}
																		<FieldArray name={`questions[${index}].options`}>
																			{(arrayHelpers) => (
																				<>
																					<button
																						type="button"
																						onClick={() => {
																							arrayHelpers.push();
																						}}
																					>
																						+
																					</button>
																					{values.questions.map((option, index) => (
																						<div key={index}>
																							<div>
																								<CustomTextField
																									name={`questions[${index}].options[${index}]`}
																									placeHolder={`Option ${index + 1}`}
																								/>
																							</div>
																						</div>
																					))}
																				</>
																			)}
																		</FieldArray>
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
			{/* </QuizContext.Provider> */}
		</DashboardLayout>
	);
};

export default QuizCreator;
