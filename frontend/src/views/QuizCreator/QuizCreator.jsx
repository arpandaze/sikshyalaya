import React, { useState, useRef, useContext, useEffect } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import Button from "../../components/Button";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import * as yup from "yup";
import Checkbox from "./../../components/Checkbox";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import { formatISO } from "date-fns";
import "./statics/css/quizCreator.css";
import colorscheme from "../../utils/colors";
import { UserContext } from "../../utils/Contexts/UserContext";
import callAPI from "../../utils/API";
import useAPI from "../../utils/useAPI";
import configs from "../../utils/configs";
import { DatePicker, TimePicker } from "../../components/CustomDateTime";
import CustomTextField from "../../components/CustomTextField";
import Question from "./components/Question";

const validationSchema = yup.object({
  quiz_title: yup.string("Enter the title of the quiz"),
  quiz_description: yup.string("Enter description"),
  whoseQuizInfo: yup.object().required().typeError("Group required"),
});

let answerList = [];

const groupFormatter = (response) => {
  if (!response.data.length) {
    return [];
  }
  let responseData = [];
  responseData = response.data.map((data) => {
    let formattedData = {
      id: data.id,
      semester: data.sem,
      program_id: data.program.id,
      program_name: data.program.name,
      course_id: data.course[0].id,
      course_code: data.course[0].course_code,
      course_name: data.course[0].course_name,
    };

    return formattedData;
  });

  return responseData;
};

const QuizCreator = () => {
  const { user } = useContext(UserContext);
  const endPage = useRef(null);
  const groupList = [];
  const [groups, groupsComplete] = useAPI(
    { endpoint: "/api/v1/group/" },
    groupFormatter
  );

  if (groups && groups.length && groupsComplete) {
    groups.map((group, index) => {
      groupList.push({
        name: `${group.program_name}, Sem ${group.semester} [Course ${group.course_code}]`,
        value: { group: group.id, course: group.course_id },
      });
    });
  }

  const handleSubmit = (values) => {
    console.log(values);
  };
  const [selectImage, setSelectedImage] = useState({});
  const [tempImage, setTempImage] = useState({});
  const [isPicked, setIsPicked] = useState({});

  const onFileUpload = async (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setTempImage({ ...tempImage, [e.target.id]: reader.result });
    };
    setIsPicked(true);
    setSelectedImage({ ...selectImage, [e.target.id]: e.target.files[0] });
    console.log(e.target.files);
  };

  const quizPostFormatter = (quiz) => {
    const postquizValues = {
      end_time: formatISO(quiz.end_time, { representation: "time" }),
      start_time: formatISO(quiz.start_time, { representation: "time" }),
      date: formatISO(quiz.quiz_date, { representation: "date" }),
      title: quiz.quiz_title,
      description: quiz.quiz_description,
      is_randomized: quiz.isRandomized,
      display_individual: false,
      group: [quiz.whoseQuizInfo.group],
      instructor: [user.id],
      course_id: quiz.whoseQuizInfo.course,
    };

    return postquizValues;
  };

  const quizQuestionPostFormatter = (question, index, newQuizId) => {
    question.question_image = null;
    let newAnswers = [];
    if (question.answer && question.answer.length) {
      // question.answer = question.answer.fill(false);
      question.answer.map((boolVal, index) => {
        if (boolVal === true) {
          newAnswers.push(index);
        }
      });
    } else {
      newAnswers = [];
    }
    console.log(question.answer);
    question.answer = newAnswers;

    console.log(question.answer);
    if (question.options && question.options.length) {
      let newOption = [];

      question.options.map((option) => {
        let formattedOption = {
          image: "",
          text: option,
        };
        newOption.push(formattedOption);
      });

      question.options = JSON.stringify(newOption);
    }
    question.quiz_id = newQuizId;
    return question;
  };

  const onSubmitHandler = async (values) => {
    let quiz = values;
    let questions = quiz.questions;
    delete quiz.questions;

    quiz = quizPostFormatter(quiz);

    let newQuizId = null;

    let postResponse = await callAPI({
      endpoint: `/api/v1/quiz/`,
      method: "POST",
      data: quiz,
    });
    newQuizId = postResponse.data.id;

    if (postResponse.status === 200 && newQuizId) {
      if (questions) {
        questions.map(async (question, index) => {
          let postQuestion = quizQuestionPostFormatter(
            question,
            index,
            newQuizId
          );

          console.log("Formatted Questions", questions);
          if (question) {
            postResponse = await callAPI({
              endpoint: `/api/v1/quiz/${newQuizId}/question`,
              method: "POST",
              data: postQuestion,
            });

            let newquestionId = postResponse.data.id;
            let questionImageData = new FormData();
            if (postResponse.status === 200 && selectImage[`${index}`]) {
              questionImageData.append("files", selectImage[`${index}`]);

              let imageResponse = await callAPI({
                endpoint: `/api/v1/quiz/${newQuizId}/question/${newquestionId}/question_image/`,
                method: "POST",
                data: questionImageData,
                headers: { "Content-Type": "multipart/form-data" },
              });

              console.log(imageResponse);
            }
          }
        });
      }
    }
    answerList = [];
    setSelectedImage({});
  };

  return (
    <DashboardLayout>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className="quizCreator_root"
      >
        <Grid item className="quizCreator_header">
          <a className="quizCreator_titleText">Quiz Creation Menu</a>
        </Grid>
        <Grid item className="quizCreator_body">
          <Grid item className="quizCreator_outerContainer">
            <Formik
              initialValues={{
                quiz_title: "",
                quiz_description: "",
                quiz_date: new Date(),
                start_time: new Date(),
                end_time: new Date(),
                isRandomized: false,
                whoseQuizInfo: null,
              }}
              validationSchema={validationSchema}
              onSubmit={onSubmitHandler}
            >
              {({ values, setFieldValue }) => (
                <>
                  <Form className="quizCreator_formBox">
                    <Grid
                      container
                      direction="column"
                      alignItems="center"
                      justify="center"
                      className="quizCreator_innerContainer"
                      spacing={1}
                    >
                      <Grid
                        item
                        xs={12}
                        className="quizCreator_titleFieldContainer"
                      >
                        <CustomTextField
                          id="quiz_title"
                          name="quiz_title"
                          placeholder="Enter the title of the quiz"
                          className="quizCreator_titleField"
                          autoComplete="off"
                        />
                      </Grid>
                      <Grid
                        item
                        className="quizCreator_descriptionFieldContainer"
                      >
                        <CustomTextField
                          id="quiz_description"
                          name="quiz_description"
                          placeholder="Description of the quiz"
                          className="quizCreator_descriptionField"
                          autoComplete="off"
                        />
                      </Grid>
                      <Grid item className="quizCreator_groupBoxOuter">
                        <CustomTextField
                          name="whoseQuizInfo"
                          dropdown={true}
                          menuItems={groupList}
                          addStyles="quizCreator_groupBox"
                          placeHolder="Choose your group"
                          className="quizCreator_dateTimePickerContainer"
                        />
                      </Grid>
                      <Grid item>
                        <Grid
                          container
                          direction="row"
                          alignItems="center"
                          justify="center"
                          className="quizCreator_dateTimePickerContainer"
                          spacing={2}
                        >
                          <Grid item className="quizCreator_quizStartTime">
                            <TimePicker id="start_time" label="Start Time" />
                          </Grid>
                          <Grid item className="quizCreator_quizEndTime">
                            <TimePicker id="end_time" label="End Time" />
                          </Grid>
                          <Grid item className="quizCreator_quizDateField">
                            <DatePicker
                              id="quiz_date"
                              label="Choose quiz date"
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        justify="center"
                        className="quizCreator_randomContainer"
                        wrap="nowrap"
                      >
                        <Grid item className="quizCreator_check">
                          <Checkbox
                            id="is_randomized"
                            name="isRandomized"
                            label="Randomize Questions"
                            className="quizCreator_randomCheckBox"
                          />
                        </Grid>
                      </Grid>

                      <Grid item className="submission">
                        <Grid container alignItems="center" justify="center">
                          <Question
                            name="questions"
                            val={values.questions}
                            answerList={answerList}
                            reference={endPage}
                          />
                        </Grid>
                        <Grid
                          container
                          alignItems="center"
                          justify="center"
                          direction="row"
                        >
                          <Grid
                            item
                            className="quizCreator_submitButtonContainer"
                          >
                            <button
                              type="submit"
                              className="quizCreator_submitButton"
                            >
                              Submit
                            </button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Form>
                </>
              )}
            </Formik>
            <div ref={endPage}></div>
          </Grid>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default QuizCreator;
