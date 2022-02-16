import React, { useState, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import { ImCross } from "react-icons/im";
import colorscheme from "../../../utils/colors";
import CustomTextField from "./../../../components/CustomTextField";
import Options from "./Options";
import { FileUpload } from "../../../components/FileUpload";
import { QuizContext } from "../QuizContext";
import { MdExpandMore } from "react-icons/md";
import "./statics/css/questions.css";

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

  return (
    <>
      <Grid
        container
        key={index + 1}
        direction="column"
        wrap="nowrap"
        className="questions_mainContainer"
      >
        <Grid item>
          <Grid
            container
            directon="row"
            alignItems="center"
            wrap="nowrap"
            className="questions_questionTitleContainer"
          >
            <Grid item className="minimizeContainer">
              <MdExpandMore
                size={30}
                color={colorscheme.grey4}
                className="minimizeicon"
                onClick={() => {
                  setMinimized(!minimized);
                }}
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
            </Grid>

            <Grid item className="questions_questionNumberContainer">
              <p className="questions_questionNumber">Question #{index + 1}</p>
            </Grid>
            <Grid item>
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="center"
                className="questions_questionMarksContainer"
              >
                <Grid item>
                  <p className="questions_marks">Marks</p>
                </Grid>
                <Grid item>
                  <CustomTextField
                    name={`${name}[${index}].marks`}
                    type="number"
                    addStyles="questions_marksField"
                    size="small"
                    InputProps={{
                      inputProps: {
                        max: 999,
                        min: 0,
                      },
                    }}
                    autoComplete="off"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item className="questions_upload" xs={3}>
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

            <Grid item className="questions_removeContainer">
              <button
                type="button"
                title="Remove Question"
                className="questions_remove"
                onClick={() => {
                  questionHelper.remove(index);
                  answerList.splice(index, 1);
                }}
              >
                <ImCross size={17} color={colorscheme.red2} />
              </button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            container
            direction="column"
            justify="center"
            style={{ display: minimized ? "none" : "" }}
          >
            <Grid item>
              <CustomTextField
                name={`${name}[${index}].question_text`}
                addStyles="questions_questionTitle"
                type="text"
                placeHolder="Question Title"
                autoComplete="off"
              />
            </Grid>
            <Grid item>
              <Options
                optionName={name}
                question={question}
                index={index}
                answer={answerList}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default QuestionForm;
