import React, { useState, useEffect } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import Button from "../../components/Button";
import DashboardLayout from "../../components/DashboardLayout";
import * as yup from "yup";
import CustomTextField from "./../../components/CustomTextField";
import Grid from "@material-ui/core/Grid";
import QuizQuestion, { questionInitialValues } from "./QuizQuestion";
// import QuizQuestions from "./QuizQuestions";

const validationSchema = yup.object({
  quiz_title: yup.string("Enter the title of the quiz"),
  quiz_description: yup.string("Enter description"),
});

const questionType = [
  {
    name: "Text",
    value: 1,
  },
  {
    name: "Image",
    value: 2,
  },
];

const QuizCreator = () => {
  // const [pressed, setPressed] = useState(false);
  // const [addQuestion, setAddQuestion] = useState({
  //   // quiz_title: "",
  //   // quiz_description: "",
  //   // question: [
  //   //   {
  //   //     question_type: "",
  //   //     question_text: "",
  //   //     answer_type: "",
  //   //     option: [],
  //   //     answer: "",
  //   //   },
  //   // ],
  // });

  // const handleAddQuestion = (e) => {
  //   const { value } = e.target;
  //   setAddQuestion(value);
  //   setAddQuestion(
  //     ...addQuestion,
  //     addQuestion.question.push({
  //       question_type: "",
  //       question_text: "",
  //       answer_type: "",
  //       option: [],
  //       answer: "",
  //     })
  //   );
  // };
  // const handleInputChange = (e, index) => {
  //   const { name, value } = e.target;
  //   const list = [...addQuestion];
  //   list[index][name] = value;
  //   setAddQuestion(list);
  // };

  // const handleRemoveQuestion = (index) => {
  //   const list = [...addQuestion];
  //   list.splice(index, 1);
  //   setAddQuestion(list);
  // };

  return (
    <DashboardLayout>
      <Grid container direction="row" alignItems="flex-start">
        <Grid item>
          <Formik
            initialValues={{
              quiz_title: "",
              quiz_description: "",
              question: [],
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              alert(JSON.stringify(values, null, 2));
            }}
          >
            {({ values }) => (
              <Form>
                <Grid container direction="column" alignItems="flex-start">
                  <Grid item>
                    <Field
                      id="quiz_title"
                      name="quiz_title"
                      placeholder="Enter the title of the quiz"
                    />
                  </Grid>
                  <Grid item>
                    <Field
                      id="quiz_description"
                      name="quiz_description"
                      placeholder="Description"
                    />
                  </Grid>
                  <Grid item>
                    <FieldArray
                      name="question"
                      render={(arrayHelpers) => (
                        <div>
                          {values.question && values.question.length > 0 ? (
                            values.question.map((question, index) => (
                              <div key={index}>
                                <CustomTextField
                                  dropdown={true}
                                  name={`question[${index}].question_type`}
                                  menuItems={questionType}
                                  placeHolder="Question Type"
                                />
                                <CustomTextField
                                  name={`question[${index}].question_text`}
                                  placeHolder="Question Text"
                                  type="text"
                                />
                                <CustomTextField
                                  dropdown={true}
                                  name={`question[${index}].answer_type`}
                                  menuItems={questionType}
                                  placeHolder="Answer Type"
                                />
                                <CustomTextField
                                  dropdown={true}
                                  name={`question[${index}].answer`}
                                  menuItems={questionType}
                                  placeHolder="Answer Type"
                                />
                                <button
                                  type="button"
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  -
                                </button>
                                <button
                                  type="button"
                                  onClick={() => arrayHelpers.push()}
                                >
                                  +
                                </button>
                              </div>
                            ))
                          ) : (
                            <button
                              type="button"
                              onClick={() => arrayHelpers.push()}
                            >
                              Add a Question
                            </button>
                          )}
                          <div>
                            <button type="submit">Submit</button>
                          </div>
                        </div>
                      )}
                    />
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default QuizCreator;
