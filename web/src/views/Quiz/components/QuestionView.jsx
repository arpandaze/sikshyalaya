import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import "./statics/css/questionView.css";
import "../../../components/CustomCheckboxComponent";
import QuizAnswer from "./QuizAnswer";
import { ImCross } from "react-icons/im";
import Image from "../../../components/Image";
import configs from "../../../utils/configs";
import colorscheme from "../../../utils/colors";

const QuestionView = ({
  data,
  position,
  length,
  multiple,
  completed,
  ...rest
}) => {
  const [isPopUp, setIsPopUp] = useState(false);
  const [popUpImage, setPopUpImage] = useState("");
  const handleImagePopUp = (image) => {
    setIsPopUp(true);
    setPopUpImage(configs.PUBLIC_FILES_PATH + "/" + image);
  };
  return (
    <>
      <Grid container direction="column" className="questionView_root">
        <Grid item className="questionView_top">
          <Grid
            container
            direction="column"
            justify="center"
            className="questionView_topInside"
          >
            <Grid item className="questionView_questionTitleMarkContainer">
              <Grid container>
                <Grid item className="questionView_titleLabel">
                  Question {position + 1} of {length}
                </Grid>

                <Grid item className="questionView_questionMarks">
                  {data.marks} marks
                </Grid>
              </Grid>
            </Grid>
            <Grid item className="questionView_questionTitle">
              {data.question_text}
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          className={
            data.question_image && data.question_image.length
              ? "questionView_questionImageContainer"
              : "questionView_questionImageContainerDisabled"
          }
        >
          <Grid
            container
            direction="row"
            justify="center"
            className="questionView_questionImageContainerRed"
          >
            {data.question_image && data.question_image.length ? (
              data.question_image.map((image, index) => (
                <Grid
                  item
                  key={index}
                  className="questionView_questionImageContainerInside"
                >
                  <Image
                    src={configs.PUBLIC_FILES_PATH + "/" + image}
                    className="questionView_questionImage"
                    onClick={() => {
                      handleImagePopUp(image);
                    }}
                  />
                </Grid>
              ))
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
        <Grid item className="questionView_bot">
          <Grid container direction="column">
            <Grid container direction="column" alignItems="flex-start">
              {!multiple ? (
                <>
                  <p className="questionView_quizOptionTitle">
                    Select One Option
                  </p>
                  <QuizAnswer
                    options={data.options}
                    onPopUp={handleImagePopUp}
                    name={`questions.${data.id}`}
                  />
                </>
              ) : (
                <>
                  <p className="questionView_quizOptionTitle">
                    Select Multiple Option(s)
                  </p>
                  <QuizAnswer
                    options={data.options}
                    onPopUp={handleImagePopUp}
                    name={`questions.${data.id}`}
                    multiple={true}
                    completed={completed}
                  />
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {isPopUp ? (
        <Grid
          container
          justify="center"
          className="questionView_popUpContainer"
        >
          <Grid item className="questionView_popUpBox">
            <Grid container direction="column">
              <Image
                src={popUpImage !== "" ? popUpImage : ""}
                className="questionView_questionPopUpImage"
              />

              <Grid item className="questionView_closeButtonContainer">
                <ImCross
                  color={colorscheme.red3}
                  className="questionView_closeButton"
                  onClick={() => {
                    setIsPopUp(false);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <></>
      )}
    </>
  );
};

export default QuestionView;
