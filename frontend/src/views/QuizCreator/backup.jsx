<Grid
	container
	direction="column"
	alignItems="center"
	justify="center"
	className="quizCreator_root"
>
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
					<Form>
						<Grid
							container
							direction="column"
							alignItems="center"
							justify="center"
							className="quizCreator_innerContainer"
						>
							<Grid item className="quizCreator_titleField">
								<Field
									id="quiz_title"
									name="quiz_title"
									placeholder="Enter the title of the quiz"
								/>
							</Grid>
							<Grid item className="quizCreator_descriptionField">
								<Field
									id="quiz_description"
									name="quiz_description"
									placeholder="Description"
								/>
							</Grid>

							<MuiPickersUtilsProvider utils={DateFnsUtils}>
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
										onChange={(value) => {
											setFieldValue(
												"quiz_date",
												format(value, "MM/dd/yyyy")
											);
											setQuizDate(value);
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
										onChange={(value) => {
											setFieldValue(
												"start_time",
												format(value, "hh:mm a")
											);
											setStartTime(value);
										}}
										KeyboardButtonProps={{
											"aria-label": "change time",
										}}
										keyboardIcon={<BiTimeFive />}
									/>
								</Grid>
								<Grid item className="quizCreator_quizEndTime">
									<KeyboardTimePicker
										margin="normal"
										id="end_time"
										label="End time"
										inputVariant="outlined"
										value={endTime}
										onChange={(value) => {
											setFieldValue(
												"end_time",
												format(value, "hh:mm a")
											);
											setEndTime(value);
										}}
										KeyboardButtonProps={{
											"aria-label": "change time",
										}}
										keyboardIcon={<BiTimeFive />}
									/>
								</Grid>
							</MuiPickersUtilsProvider>
							<Grid item className="quizCreator_randomLabel">
								<Checkbox
									id="is_randomized"
									name="isRandomized"
								/>
								<label htmlFor="is_randomized">
									Random Question
								</label>
							</Grid>
							<Grid item className="lol">
								<Field name="questions">
									{() => (
										<>
											<FieldArray name="questions">
												{(questionHelper) => (
													<div>
														<Grid
															item
															className="quizCreator_addQuestionButton"
														>
															<button
																type="button"
																onClick={() => {
																	questionHelper.push(
																		questionInitialValue
																	);
																	answerList.push(
																		[]
																	);
																}}
															>
																Add Question
															</button>
														</Grid>
														{values.questions &&
															values.questions
																.length !== 0 &&
															values.questions.map(
																(
																	question,
																	index
																) => (
																	<>
																		<div
																			key={
																				index +
																				1
																			}
																		>
																			<h4>
																				Question
																				#
																				{index +
																					1}
																			</h4>
																			<button
																				type="button"
																				title="Remove Question"
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
																				Remove
																				Question
																			</button>
																			<CustomTextField
																				name={`questions[${index}].question_text`}
																				type="text"
																				placeHolder="Question Title"
																			/>
																			<CustomTextField
																				dropdown={
																					true
																				}
																				name={`questions[${index}].question_type`}
																				menuItems={
																					questionType
																				}
																				placeHolder="Question Type"
																			/>
																		</div>
																		<FieldArray
																			name={`questions[${index}].options`}
																		>
																			{(
																				newHelper
																			) => (
																				<>
																					<button
																						type="button"
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
																									<div>
																										<CustomTextField
																											name={`questions[${index}].options[${optionIndex}]`}
																											placeHolder={`Option ${
																												optionIndex +
																												1
																											}`}
																										/>
																									</div>
																								</div>
																							)
																						)}

																					<CustomTextField
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
																				</>
																			)}
																		</FieldArray>
																	</>
																)
															)}
													</div>
												)}
											</FieldArray>
										</>
									)}
								</Field>
								<Grid item className="quizCreator_submitButton">
									<button type="submit">Submit</button>
								</Grid>
							</Grid>
						</Grid>
					</Form>
				</>
			)}
		</Formik>
	</Grid>
</Grid>;
