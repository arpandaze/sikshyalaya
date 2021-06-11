import React, { useState, useRef, useContext, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { Field, FieldArray } from "formik";
import "../statics/css/quizCreator.css";
import { GoPlus } from "react-icons/go";
import { BsCloudUpload } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import colorscheme from "../../../utils/colors";
import CustomTextField from "./../../../components/CustomTextField";
import Checkbox from "./../../../components/Checkbox";
import { BsFilePlus } from "react-icons/bs";
import { DropzoneDialog } from "material-ui-dropzone";
import QuizContext from "../QuizContext";
import { FileUpload } from "../../../components/FileUpload";

const Options = ({ optionName, question, index, answer }) => {
  const { selectFile, setSelectedFile } = useContext(QuizContext);
  const [optionImage, setOptionImage] = useState([]);

  const handleOptionUploadSave = (files) => {
    setSelectedFile(files);
  };

  const handleOptionUpload = (files) => {
    setOptionImage([...optionImage, [...files]]);
  };

  const onDeleteUploadItem = (index) => {
    let temp = [...selectFile];
    temp.splice(index, 1);
    setSelectedFile(temp);
  };
  return (
    <FieldArray name={`${optionName}[${index}].options`}>
      {(newHelper) => (
        <>
          <Grid container direction="row" alignItems="center" justify="center">
            <Grid item>
              <button
                type="button"
                className="quizCreator_addOptions"
                onClick={() => {
                  newHelper.push([]);
                  answer[index].push({
                    name: `Option ${question.options.length + 1}`,
                    value: question.options.length + 1,
                  });
                }}
              >
                Add Options
              </button>
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
                >
                  <Grid item xs={7}>
                    <CustomTextField
                      addStyles="quizCreator_option"
                      name={`${optionName}[${index}].options[${optionIndex}]`}
                      placeHolder={`Option ${optionIndex + 1}`}
                      autoComplete="off"
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Checkbox
                      id={optionIndex}
                      name={`${optionName}[${index}].answer[${optionIndex}]`}
                      label="Correct Answer"
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      justify="center"
                    >
                      <FileUpload
                        label="Upload Image"
                        acceptedFiles={["image/jpeg", "image/png"]}
                        handleSave={handleOptionUploadSave}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={1} className="quizCreator_removeContainer">
                    <button
                      type="button"
                      title="Remove Option"
                      className="quizCreator_remove"
                      onClick={() => {
                        newHelper.remove(optionIndex);

                        answer[index].splice(optionIndex, 1);
                        if (answer[index] == null) {
                          answer[index] = [];
                        }
                      }}
                    >
                      <ImCross size={15} color={colorscheme.red2} />
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
