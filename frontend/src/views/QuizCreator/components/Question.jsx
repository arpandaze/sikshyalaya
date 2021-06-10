import React, { useState, useRef, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { Field, FieldArray } from "formik";
import "../statics/css/quizCreator.css";
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
  };
  return (
    <Field name={name}>
      {({ field }) => (
        <FieldArray name={name}>
          {(questionHelper) => (
            <>
              {val &&
                val.length !== 0 &&
                val.map((question, index) => (
                  <>
                    <Grid container direction="column" wrap="nowrap">
                      <div key={index + 1}>
                        <QuestionForm
                          name={name}
                          index={index}
                          question={question}
                          questionHelper={questionHelper}
                          answerList={answerList}
                        />
                      </div>
                    </Grid>
                  </>
                ))}
              <Grid item className="quizCreator_addQuestionButtonContainer">
                <button
                  type="button"
                  className="quizCreator_addQuestionButton"
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
      )}
    </Field>
  );
};

export default Questions;
