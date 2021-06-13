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
import { QuizContext, QuizOptionContext } from "../QuizContext";
import { FileUpload } from "../../../components/FileUpload";
import { IndeterminateCheckBox } from "@material-ui/icons";

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
          <Grid container direction="row" alignItems="center" justify="center">
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
                    {!(
                      optionFile[index] &&
                      optionFile[index][optionIndex] &&
                      optionFile[index][optionIndex].length
                    ) && (
                      <CustomTextField
                        addStyles="quizCreator_option"
                        name={`${optionName}[${index}].options[${optionIndex}]`}
                        placeHolder={`Option ${optionIndex + 1}`}
                        autoComplete="off"
                      />
                    )}
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
                        handleSave={(files) => {
                          handleOptionUploadSave(files, optionIndex);
                        }}
                        maxFiles={1}
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
