import React from "react";
import Grid from "@material-ui/core/Grid";
import { Formik, Form, Field, FieldArray } from "formik";
import "./statics/css/questions.css";
import { GoPlus } from "react-icons/go";
import { BsCloudUpload } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import colorscheme from "../../../utils/colors";
import CustomTextField from "./../../../components/CustomTextField";

let answerList = [];

const Questions = ({ question, index, ...rest }) => {
  const questionInitialValue = {
    question_text: "",
    question_type: "",
    options: [],
  };
  return (
    <Grid
      container
      direction="column"
      className="questions_root"
      alignItems="flex-start"
      spacing={2}
    >
      <Grid item className="questions_innerContainer">
        <Grid container direction="column" alignItems="flex-start">
          <Grid item className="questions_titleTextContainer">
            <p className="questions_titleText">Question #{index + 1}</p>
          </Grid>

          <Grid item className="questions_questionTitleConatiner">
            <CustomTextField
              name={`questions[${index}].question_text`}
              type="text"
              placeHolder="Question Title"
            />
          </Grid>
          <Grid item className="questions_optionsContainer">
            <p className="questions_optionsText">
              <FieldArray name={`questions[${index}].options`}>
                {(newHelper) => (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        newHelper.push();
                        answerList[index].push({
                          name: `Option ${question.options.length + 1}`,
                          value: question.options.length + 1,
                        });
                      }}
                    >
                      Add Options
                    </button>
                    {question.options &&
                      question.options.length !== 0 &&
                      question.options.map((option, optionIndex) => (
                        <div key={optionIndex}>
                          <div>
                            <CustomTextField
                              name={`questions[${index}].options[${optionIndex}]`}
                              placeHolder={`Option ${optionIndex + 1}`}
                            />
                          </div>
                        </div>
                      ))}

                    <CustomTextField
                      dropdown={true}
                      name={`questions[${index}].answer`}
                      menuItems={answerList[index] || []}
                      placeHolder="Choose correct Option"
                    />
                  </>
                )}
              </FieldArray>
            </p>
          </Grid>
        </Grid>
      </Grid>

      <Grid item className="questions_MenuContainer">
        <Grid
          container
          direction="column"
          alignItems="flex-start"
          justify="center"
          classname="questions_Menu"
          spacing={3}
        >
          <Grid item className="questions_plus">
            <GoPlus color={colorscheme.green2} size={30} />
          </Grid>
          <Grid item className="questions_fileUpload">
            <BsCloudUpload color={colorscheme.purple2} size={30} />
          </Grid>
          <Grid item className="questions_removeQuestion">
            <ImCross color={colorscheme.red2} size={25} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Questions;
