import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { FieldArray } from "formik";
import "../statics/css/quizCreator.css";
import "./statics/css/questions.css";
import QuestionForm from "./QuestionForm";

const Questions = ({ name, val, answerList, reference, ...rest }) => {
  const handleScroll = () => {
    if (reference.current) {
      reference.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    handleScroll();
  }, [val && val.length]);

  const questionInitialValue = {
    question_text: "",
    question_image: "",
    options: [],
    answer: [],
  };
  return (
    <FieldArray name={name}>
      {(questionHelper) => (
        <>
          {val &&
            val.length !== 0 &&
            val.map((question, index) => (
              <>
                <QuestionForm
                  name={name}
                  index={index}
                  question={question}
                  questionHelper={questionHelper}
                  answerList={answerList}
                />
              </>
            ))}
          <Grid item className="questions_addQuestionButtonContainer">
            <button
              type="button"
              className="questions_addQuestionButton"
              onClick={() => {
                questionHelper.push(questionInitialValue);
                answerList.push([]);
              }}
            >
              Add Question
            </button>
          </Grid>
        </>
      )}
    </FieldArray>
  );
};

export default Questions;
