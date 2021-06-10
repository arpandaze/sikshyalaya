import React, { useState, useRef, useEffect } from "react";
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

const QuestionForm = ({
  name,
  index,
  question,
  questionHelper,
  answerList,
}) => {
  const [selectImage, setSelectedImage] = useState({});
  const [tempImage, setTempImage] = useState({});
  const [isPicked, setIsPicked] = useState({});
  const [uploadPopUp, setUploadPopUp] = useState(false);
  const [selectFile, setSelectedFile] = useState([]);
  const [optionImage, setOptionImage] = useState([]);

  const [minimized, setMinimized] = useState(false);
  const handleUploadOpen = () => {
    setUploadPopUp(true);
  };
  const handleUploadClose = () => {
    setUploadPopUp(false);
  };

  const handleUploadSave = (files) => {
    setSelectedFile([...selectFile, ...files]);
    setUploadPopUp(false);
    console.log(selectFile);
  };

  const handleOptionUpload = (files) => {
    setOptionImage([...optionImage, [...files]]);
    setUploadPopUp(false);
    console.log(optionImage);
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
              className="quizCreator_uploadIconContainer"
              onClick={handleUploadOpen}
            >
              <p className="quizCreator_uploadIconText">Upload Files</p>
              <BsFilePlus className="quizCreator_uploadIcon" />
            </Grid>

            <DropzoneDialog
              open={uploadPopUp}
              maxFileSize={10000000}
              onSave={handleUploadSave}
              acceptedFiles={["image/jpeg", "image/png"]}
              showPreviews={true}
              onClose={handleUploadClose}
            />
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
