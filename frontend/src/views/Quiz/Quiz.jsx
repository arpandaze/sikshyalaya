import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import "./statics/css/quiz.css";
import { BsCalendar } from "react-icons/bs";
import colorscheme from "../../utils/colors";
import CustomQuizCard from "./components/CustomQuizCard";
import boxes from "../../assets/boxes.png";
import circles from "../../assets/circles.png";
import cycle from "../../assets/cycle.png";
import stripes from "../../assets/stripes.png";
import sun from "../../assets/sun.png";

const imageList = [boxes, cycle, circles, sun, stripes];

const datas = [
  {
    quiz_title: "Aatish Internal Test",
    quiz_description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet sem sodales, sagittis sapien sit amet, sagittis nunc. Cras commodo sapien a magna vehicula congue. 1.Pellentesque sodales vel nibh sed condimentum. 2.In pulvinar posuere lacus imperdiet gravida.3. Donec eget scelerisque orci, eget tempus mi. 4. Fusce iaculis ligula a interdum euismod. Sed velit quam, placerat sed ultricies id, porta vel loremsssss. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet sem sodales, sagittis sapien sit amet, sagittis nunc. Cras commodo sapien a magna vehicula congue. 1.Pellentesque sodales vel nibh sed condimentum. 2.In pulvinar posuere lacus imperdiet gravida.3. Donec eget scelerisque orci, eget tempus mi. 4. Fusce iaculis ligula a interdum euismod. Sed velit quam, placerat sed ultricies id, porta vel lorem.",
    quiz_course: "COMP 102",
    quiz_instructor: "Dr. Dil Bahadur Gurung",
    start_time: "12:00 am",
    end_time: "2:00 am",
    date: "14th June 2021",
    isRandomized: "True",
    questions: [
      {
        question_text: "Rushab k ramro nai ho ta?",
        question_type: "1",
        options: ["True", "False"],
        answer: "1",
        marks: "10",
      },
    ],
  },
  {
    quiz_title: "Abhijeet Internal Test",
    quiz_description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet sem sodales, sagittis sapien sit amet, sagittis nunc. Cras commodo sapien a magna vehicula congue. 1.Pellentesque sodales vel nibh sed condimentum. 2.In pulvinar posuere lacus imperdiet gravida.3. Donec eget scelerisque orci, eget tempus mi. 4. Fusce iaculis ligula a interdum euismod. Sed velit quam, placerat sed ultricies id, porta vel lorem. ",
    quiz_course: "COMP 102",
    quiz_instructor: "Dr. Dil Bahadur Gurung",
    start_time: "12:00 am",
    end_time: "2:00 am",
    date: "14th June 2021",
    isRandomized: "True",
    questions: [
      {
        question_text: "Rushab k ramro nai ho ta?",
        question_type: "1",
        options: ["True", "False"],
        answer: "1",
        marks: "10",
      },
    ],
  },
  {
    quiz_title: "Yugesh Internal Test",
    quiz_description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet sem sodales, sagittis sapien sit amet, sagittis nunc. Cras commodo sapien a magna vehicula congue. 1.Pellentesque sodales vel nibh sed condimentum. 2.In pulvinar posuere lacus imperdiet gravida.3. Donec eget scelerisque orci, eget tempus mi. 4. Fusce iaculis ligula a interdum euismod. Sed velit quam, placerat sed ultricies id, porta vel lorem. ",
    quiz_course: "COMP 102",
    quiz_instructor: "Dr. Dil Bahadur Gurung",
    start_time: "12:00 am",
    end_time: "2:00 am",
    date: "14th June 2021",
    isRandomized: "True",
    questions: [
      {
        question_text: "Rushab k ramro nai ho ta?",
        question_type: "1",
        options: ["True", "False"],
        answer: "1",
        marks: "10",
      },
    ],
  },
  {
    quiz_title: "Rushab Internal Test",
    quiz_description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet sem sodales, sagittis sapien sit amet, sagittis nunc. Cras commodo sapien a magna vehicula congue. 1.Pellentesque sodales vel nibh sed condimentum. 2.In pulvinar posuere lacus imperdiet gravida.3. Donec eget scelerisque orci, eget tempus mi. 4. Fusce iaculis ligula a interdum euismod. Sed velit quam, placerat sed ultricies id, porta vel lorem. ",
    quiz_course: "COMP 102",
    quiz_instructor: "Dr. Dil Bahadur Gurung",
    start_time: "12:00 am",
    end_time: "2:00 am",
    date: "14th June 2021",
    isRandomized: "True",
    questions: [
      {
        question_text: "Rushab k ramro nai ho ta?",
        question_type: "1",
        options: ["True", "False"],
        answer: "1",
        marks: "10",
      },
    ],
  },
  {
    quiz_title: "Arpan Internal Test",
    quiz_description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet sem sodales, sagittis sapien sit amet, sagittis nunc. Cras commodo sapien a magna vehicula congue. 1.Pellentesque sodales vel nibh sed condimentum. 2.In pulvinar posuere lacus imperdiet gravida.3. Donec eget scelerisque orci, eget tempus mi. 4. Fusce iaculis ligula a interdum euismod. Sed velit quam, placerat sed ultricies id, porta vel lorem. ",
    quiz_course: "COMP 102",
    quiz_instructor: "Dr. Dil Bahadur Gurung",
    start_time: "12:00 am",
    end_time: "2:00 am",
    date: "14th June 2021",
    isRandomized: "True",
    questions: [
      {
        question_text: "Rushab k ramro nai ho ta?",
        question_type: "1",
        options: ["True", "False"],
        answer: "1",
        marks: "10",
      },
    ],
  },
];

const onClick = () => {};
const Quiz = () => {
  return (
    <DashboardLayout>
      <Grid container direction="column" className="quiz_root" wrap="nowrap">
        <Grid item className="quiz_row">
          <div className="quiz_smallRedBox"></div>
          <h1 className="quiz_activeTitle">Active Quiz</h1>
          <div className="quiz_currentContainer">{/* asds */}</div>
        </Grid>
        <Grid item className="quiz_row2">
          <Grid container direction="row" alignItems="center">
            <BsCalendar
              size={35}
              color={colorscheme.black}
              className="quiz_pastIcon"
            />
            <h1 className="quiz_pastText">Past Quizzes</h1>
          </Grid>
          <br />
          <br />
          <Grid container direction="row" className="quiz_pastContainer">
            {datas.map((data, index) => (
              <Grid item className="quiz_pastInside">
                <CustomQuizCard
                  quiz={data}
                  image={imageList[index % 5]}
                  onClick={onClick}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </DashboardLayout>
    // <DashboardLayout>
    //   <Grid
    //     container
    //     direction="column"
    //     justify="flex-start"
    //     alignItems="center"
    //     className="quiz_root"
    //   >
    //     <Grid item className="quiz_quizCardContainer">
    //       <Grid container>
    //         {datas.map((data, index) => (
    //           <Grid item className="quiz_quizCardContainer">
    //             <QuizCard qData={data} color={colorPattern[index % 4]} />
    //           </Grid>
    //         ))}
    //       </Grid>
    //       <br />
    //       <br />
    //       <br />
    //     </Grid>
    //   </Grid>
    // </DashboardLayout>
  );
};

export default Quiz;
