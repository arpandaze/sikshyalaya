import React, { useState, useRef, useEffect, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import { Field, FieldArray } from "formik";
import "../statics/css/quizCreator.css";
import { GoPlus } from "react-icons/go";
import { ImCross } from "react-icons/im";
import colorscheme from "../../../utils/colors";
import CustomTextField from "./../../../components/CustomTextField";
import { BsFilePlus } from "react-icons/bs";
import { DropzoneDialog } from "material-ui-dropzone";
import Options from "./Options";
import { FileUpload } from "../../../components/FileUpload";
import { QuizContext } from "../QuizContext";
import { MdExpandMore } from "react-icons/md";

const QuestionForm = ({
  name,
  index,
  question,
  questionHelper,
  answerList,
}) => {
  const { selectFile, setSelectedFile } = useContext(QuizContext);
  const [minimized, setMinimized] = useState(false);

  const handleUploadSave = (files) => {
    let newValue = [];
    if (selectFile[index] && selectFile[index].length) {
      newValue.push(...selectFile[index]);
    }
    newValue.push(...files);
    setSelectedFile({ ...selectFile, [index]: newValue });
  };

  const onDeleteUploadItem = (index) => {
    let temp = [...selectFile];
    temp.splice(index, 1);
    setSelectedFile(temp);
  };
  return (
		<>
			<Grid item>
				<Grid
					container
					directon="row"
					justify="center"
					alignItems="center"
					wrap="nowrap"
					className="quizCreator_questionTitleContainer"
					onClick={() => {
						setMinimized(!minimized);
					}}
				>
					<MdExpandMore
						size={30}
						color={colorscheme.grey4}
						className="minimizeicon"
						style={
							minimized
								? {
										transform: "rotate(-90deg)",
										transition: "350ms ease",
								  }
								: {
										transform: "rotate(0deg)",
										transition: "350ms ease",
								  }
						}
					/>
					<Grid item xs={12}>
						<h4 className="quizCreator_questionNumber">
							Question #{index + 1}
						</h4>
					</Grid>
					<Grid item className="quizCreator_upload" xs={3}>
						<Grid
							container
							direction="row"
							alignItems="center"
							justify="center"
						>
							<FileUpload
								label="Upload File"
								acceptedFiles={["image/jpeg", "image/png"]}
								handleSave={(files) => {
									handleUploadSave(files);
								}}
								maxFiles={4}
							/>
						</Grid>
					</Grid>

					<Grid item xs={1} className="quizCreator_removeContainer">
						<button
							type="button"
							title="Remove Question"
							className="quizCreator_remove"
							onClick={() => {
								questionHelper.remove(index);
								answerList.splice(index, 1);
							}}
						>
							<ImCross size={20} color={colorscheme.red2} />
						</button>
					</Grid>
				</Grid>
			</Grid>
			<div style={{ display: minimized ? "none" : "" }}>
				<Grid item xs={12} className="quizCreator_questionTitleOuter">
					<CustomTextField
						name={`${name}[${index}].question_text`}
						addStyles="quizCreator_questionTitle"
						type="text"
						placeHolder="Question Title"
						autoComplete="off"
					/>
				</Grid>
				<Grid container direction="column" alignItems="center" justify="center">
					<Options
						optionName={name}
						question={question}
						index={index}
						answer={answerList}
					/>
				</Grid>
			</div>
		</>
	);
};

export default QuestionForm;
