import React, { useState, useRef, useContext, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { Field, FieldArray } from "formik";
import "../statics/css/quizCreator.css";
import { ImCross } from "react-icons/im";
import colorscheme from "../../../utils/colors";
import CustomTextField from "./../../../components/CustomTextField";
import Checkbox from "./../../../components/Checkbox";
import { QuizContext, QuizOptionContext } from "../QuizContext";
import { FileUpload } from "../../../components/FileUpload";
import { IndeterminateCheckBox } from "@material-ui/icons";
import ResourceIcons from "./../../../components/ResourceIcons";


const Options = ({ optionName, question, index }) => {
  const { optionFile, setOptionFile } = useContext(QuizOptionContext);

  const handleOptionUploadSave = (files, optionIndex) => {
		let newOption = { ...optionFile[index], [optionIndex]: files };
		setOptionFile({
			...optionFile,
			[index]: newOption,
		});
	};

  const onDeleteUploadItem = (index) => {
    // let temp = [...selectFile];
    // temp.splice(index, 1);
    // setSelectedFile(temp);
  };
  return (
		<FieldArray name={`${optionName}[${index}].options`}>
			{(newHelper) => (
				<>
					<Grid
						container
						direction="column"
						alignItems="center"
						justify="center"
					>
						<Grid item>
							<button
								type="button"
								className="quizCreator_addOptions"
								onClick={() => {
									newHelper.push("");
								}}
							>
								Add Options
							</button>
						</Grid>
						<Grid item>
							<p className="quizCreator_please">
								*Please fill the checkbox for correct answers
							</p>
						</Grid>
					</Grid>

					{question.options &&
						question.options.length !== 0 &&
						question.options.map((option, optionIndex) => (
							<div key={optionIndex}>
								<Grid
									container
									direction="row"
									alignItems="center"
									justify="center"
									className="quizCreator_optionContainer"
									wrap="nowrap"
								>
									<Grid item xs={1} className="quizCreator_optionCheckbox">
										<Checkbox
											id={optionIndex}
											name={`${optionName}[${index}].answer[${optionIndex}]`}
										/>
									</Grid>
									<Grid item xs={7} className="quizCreator_optiontextFIeld">
										{!(
											optionFile[index] &&
											optionFile[index][optionIndex] &&
											optionFile[index][optionIndex].length
										) ? (
											<CustomTextField
												addStyles="quizCreator_option"
												name={`${optionName}[${index}].options[${optionIndex}]`}
												placeHolder={`Option ${optionIndex + 1}`}
												autoComplete="off"
											/>
										) : (
											<>
												<Grid container alignItems="center" justify="center" className="quizCreator_filenameinner">
													<Grid item>
														<ResourceIcons iconType="image" />
													</Grid>
													<Grid item>
														{console.log(optionFile[index][optionIndex])}
														<div className="options_fileuploadedtext">
															{optionFile[index][optionIndex][optionIndex].name}
														</div>
													</Grid>
												</Grid>
											</>
										)}
									</Grid>

									<Grid item className="quizCreator_fileUploadContainer">
										<FileUpload
											label=""
											acceptedFiles={["image/jpeg", "image/png"]}
											handleSave={(files) => {
												handleOptionUploadSave(files, optionIndex);
											}}
											maxFiles={1}
										/>
									</Grid>
									<Grid item xs={1} className="quizCreator_removeContainer">
										<button
											type="button"
											title="Remove Option"
											className="quizCreator_remove"
											onClick={() => {
												newHelper.remove(optionIndex);
											}}
										>
                      <ImCross size={15} color={colorscheme.red2} style={{
                        position: "relative",
                        top:"2px"
                      }}/>
										</button>
									</Grid>
								</Grid>
							</div>
						))}
				</>
			)}
		</FieldArray>
	);
};

export default Options;
