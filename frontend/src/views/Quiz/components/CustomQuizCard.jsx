import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { AiOutlineClockCircle } from "react-icons/ai";
import CardContent from "@material-ui/core/CardContent";
import Image from "../../../components/Image";
import "./statics/css/customQuizCard.css";
import colorscheme from "../../../utils/colors";
import { format } from "date-fns";

const CustomQuizCard = ({ quiz, image, onClick }) => {
  const dateConverter = (date) => format(new Date(date), "PPP");
  const timeConverter = (time) => format(new Date(time), "HH:mm aaaa");
  return (
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
              <p className="quizCard_timerTime">50 min</p>
            </Grid>
          </Grid>
        </Grid>
        <p className="quizCard_course">{quiz.quiz_course} (50 marks)</p>
        <p className="quizCard_date">{dateConverter(quiz.date)}</p>
        <div className="quizCard_descriptionContainer">
          <p className="quizCard_description">{quiz.description}</p>
        </div>
        <Grid container direction="row" className="quizCard_footer">
          <p className="quizCard_time">
            Start Time: {timeConverter(quiz.date + " " + quiz.start_time)}
          </p>
          <Grid item className="quizCard_footerInnerContainer">
            <Grid container direction="column" alignItems="flex-end">
              <p className="quizCard_instructorTitle"> Instructors : </p>
              {quiz.instructor.map((instructor) => (
                <p key={instructor.id} className="quizCard_instructor">
                  {instructor.id}
                </p>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Card>
  );
};
export default CustomQuizCard;
