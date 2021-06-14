import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { AiOutlineClockCircle } from "react-icons/ai";
import CardContent from "@material-ui/core/CardContent";
import Image from "../../../components/Image";
import "./statics/css/customQuizCard.css";
import colorscheme from "../../../utils/colors";

const CustomQuizCard = ({ quiz, image, onClick }) => {
  return (
    <Card className="quizCard_root" variant="outlined" onClick={onClick}>
      <CardContent className="quizCard_imageContainer">
        <Image src={image} addStyles="quizCard_image" />
      </CardContent>
      <div className="quizCard_infoContainer">
        <Grid container direction="row" className="quizCard_titleContainer">
          <p className="quizCard_title">{quiz.quiz_title}</p>
          <Grid item className="quizCard_timerContainer">
            <Grid container direction="row" alignItems="center">
              <AiOutlineClockCircle
                color={colorscheme.red4}
                className="quizCard_timerIcon"
              />
              <p className="quizCard_timerTime">50 minutes</p>
            </Grid>
          </Grid>
        </Grid>
        <p className="quizCard_course">{quiz.quiz_course} (50 marks)</p>
        <p className="quizCard_date">{quiz.date}</p>
        <div className="quizCard_descriptionContainer">
          <p className="quizCard_description">{quiz.quiz_description}</p>
        </div>
        <Grid container direction="row" className="quizCard_footer">
          <p className="quizCard_time">Start Time: {quiz.start_time}</p>
          <Grid item className="quizCard_footerInnerContainer">
            <Grid container direction="column" alignItems="flex-end">
              <p className="quizCard_instructorTitle"> Instructors : </p>
              <p className="quizCard_instructor">{quiz.quiz_instructor}</p>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Card>
  );
};
export default CustomQuizCard;
