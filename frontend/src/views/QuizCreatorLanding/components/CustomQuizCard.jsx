import React, { useState, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { AiOutlineClockCircle } from "react-icons/ai";
import CardContent from "@material-ui/core/CardContent";
import Image from "../../../components/Image";
import "./statics/css/customQuizCard.css";
import colorscheme from "../../../utils/colors";
import { format } from "date-fns";
import { ImCross } from "react-icons/im";
import useAPI from "../../../utils/useAPI";
import Button from "@material-ui/core/Button";
import pp from "../../../assets/default-profile.svg";

import callAPI from "../../../utils/API";
import { AlertContext } from "../../../components/DashboardLayout/AlertContext";

const CustomQuizCard = ({ quiz, image, onClick }) => {
  const [pop, setPop] = useState(false);
  const [resultPopUp, setResultPopUp] = useState(false);
  const dateConverter = (date) => format(new Date(date), "PPP");
  const timeConverter = (time) => format(new Date(time), "hh:mm aaa");
  const { setAlert } = useContext(AlertContext);
  const [buttonType, setButtonType] = useState(true);
  const [resultList, setResultList] = useState([]);

  const onDeleteHandler = async () => {
    let deleteResponse = null;
    try {
      deleteResponse = await callAPI({
        endpoint: `/api/v1/quiz/${quiz.id}/`,
        method: "DELETE",
      });
    } catch (e) {
      console.log(e);
    }
    if (deleteResponse.status && deleteResponse.status == 200) {
      setPop(false);
      setAlert({
        severity: "success",
        message: "Successfully deleted " + quiz.title + ' "',
      });
      setTimeout(() => {
        setAlert(null);
      }, 2000);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      setAlert({
        severity: "error",
        message: "Error Occurred while Deleting",
      });
      setTimeout(() => {
        setAlert(null);
      }, 2000);
    }
  };

  return (
    <>
      <Card className="quizCard_root" variant="outlined" onClick={onClick}>
        <CardContent className="quizCard_imageContainer">
          <Image src={image} addStyles="quizCard_image" />
        </CardContent>
        <div className="quizCard_infoContainer">
          <Grid container direction="row" className="quizCard_titleContainer">
            <p className="quizCard_title">{quiz.title}</p>
            <Grid item className="quizCard_timerContainer">
              <Grid container direction="row" alignItems="center">
                <AiOutlineClockCircle
                  color={colorscheme.red4}
                  className="quizCard_timerIcon"
                />
                <p className="quizCard_timerTime">
                  {parseInt(quiz.totalTime[0]) !== 0 &&
                    parseInt(quiz.totalTime[0]) + " hours "}
                  {parseInt(quiz.totalTime[1]) !== 0 &&
                    parseInt(quiz.totalTime[1]) + " min"}
                </p>
              </Grid>
            </Grid>
          </Grid>
          <p className="quizCard_course">
            {quiz.course_code} ({quiz.total_marks} marks)
          </p>
          <p className="quizCard_date">{dateConverter(quiz.date)}</p>
          <div className="quizCard_descriptionContainer">
            <p className="quizCard_description">{quiz.description}</p>
          </div>
          <Grid container direction="row" className="quizCard_footer">
            <p className="quizCard_time">
              Start Time: {timeConverter(quiz.start_time)}
            </p>
            <Grid item className="quizCard_footerInnerContainer">
              <Grid container direction="column" alignItems="flex-end">
                <p className="quizCard_instructorTitle"> Instructors : </p>
                {quiz.instructor.map((instructor) => (
                  <p key={instructor.id} className="quizCard_instructor">
                    {instructor.full_name}
                  </p>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </div>
        <div className="quizCard_crossButtonContainer">
          <Button
            onMouseOver={() => {
              setButtonType(false);
            }}
            onMouseOut={() => {
              setButtonType(true);
            }}
            variant={buttonType ? "outlined" : "contained"}
            color="primary"
            onClick={async () => {
              const tempResponse = await callAPI({
                endpoint: `/api/v1/quizanswer/${quiz.id}/getAnswersAsTeacher/`,
                method: "GET",
              });
              if (tempResponse.data.length) {
                setResultList([...tempResponse.data]);
              }
              setResultPopUp(true);
            }}
            className="quizCard_crossbutton"
          >
            View Results
          </Button>
          <Button
            onMouseOver={() => {
              setButtonType(false);
            }}
            onMouseOut={() => {
              setButtonType(true);
            }}
            variant={buttonType ? "outlined" : "contained"}
            color="primary"
            onClick={() => {
              setPop(true);
            }}
            className="quizCard_crossbutton"
          >
            Remove
          </Button>
        </div>
      </Card>
      {resultPopUp ? (
        <div className="quizCard_popup">
          <Grid
            container
            className="resultPopUp_root"
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Grid
              item
              xs={1}
              onClick={() => {
                setResultPopUp(false);
              }}
            >
              <div className="popUp_crossButton">
                <ImCross size={18} color={colorscheme.red4} />
              </div>
            </Grid>
            <Grid item className="popUp_resultSection">
              <Grid
                item
                container
                direction="column"
                className="popUp_resultItemContainer"
              >
                <Grid container item className="popUp_TitleContainer">
                  <p className="popUp_Title1">Name</p>
                  <p className="popUp_Title2">Marks Obtained</p>
                </Grid>
                {resultList.length ? (
                  resultList.map((item, index) => (
                    <Grid item className="popUp_resultItem">
                      <Grid container direction="row" alignItems="center">
                        <div className="popUp_resultProfileImageContainer">
                          <Image
                            src={pp}
                            className="popUp_resultProfileImage"
                          />
                        </div>
                        <p key={index} className="popUp_resultName">
                          {item.student.full_name}
                        </p>
                        <p key={index} className="popUp_resultMarks">
                          {item.marks_obtained}
                        </p>
                      </Grid>
                    </Grid>
                  ))
                ) : (
                  <></>
                )}
              </Grid>
            </Grid>
          </Grid>
        </div>
      ) : (
        <></>
      )}
      {pop ? (
        <div className="quizCard_popup">
          <Grid
            container
            className="popUp_root"
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Grid
              item
              xs={1}
              onClick={() => {
                setPop(false);
              }}
            >
              <div className="popUp_crossButton">
                <ImCross size={18} color={colorscheme.red4} />
              </div>
            </Grid>
            <Grid item className="popUp_midbar">
              <a className="popUp_areYouSure">
                Are you sure you want to remove <b>"{quiz.title}"</b> from the
                list of upcoming quizzes?
              </a>
              <p>
                *deleting the quiz will lose <b>everything</b> related to the
                quiz
              </p>
            </Grid>
            <div className="popUp_line"></div>
            <Grid item className="popUp_botbar">
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="center"
                spacing={2}
              >
                <Grid item>
                  <button
                    type="button"
                    title="Add Other Instructor"
                    className="popUp_cancel"
                    onClick={() => {
                      setPop(false);
                    }}
                  >
                    Cancel
                  </button>
                </Grid>
                <Grid item>
                  <button
                    type="button"
                    title="Add Other Instructor"
                    className="popUp_confirm"
                    onClick={() => {
                      onDeleteHandler();
                      setPop(false);
                    }}
                  >
                    Confirm
                  </button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
export default CustomQuizCard;
