import React, { useState } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import { Field } from "formik";
import Image from "../../../components/Image";
import configs from "../../../utils/configs";
import "./statics/css/quizAnswer.css";

const QuizAnswer = ({ options, onPopUp, name, multiple = false, ...rest }) => {
  const [value, setValue] = useState();

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return !multiple ? (
    <>
      <Field name={name}>
        {({ field, form }) => (
          <div className="quizAnswer_root">
            <RadioGroup
              aria-label="gender"
              name={name}
              value={value}
              onChange={handleChange}
              {...rest}
              {...field}
            >
              {options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={index.toString()}
                  control={<Radio color="primary" />}
                  label={
                    option.image != "" ? (
                      <Image
                        src={configs.PUBLIC_FILES_PATH + "/" + option.image}
                        className="quizAnswer_optionImage"
                        onClick={() => {
                          onPopUp(option.image);
                        }}
                      />
                    ) : (
                      option.text
                    )
                  }
                  className={
                    !option.image
                      ? "quizAnswer_answerContainer"
                      : "quizAnswer_whenImageContainer"
                  }
                />
              ))}
            </RadioGroup>
          </div>
        )}
      </Field>
    </>
  ) : (
    <>
      <Field name={name} {...rest}>
        {({ field, form }) => (
          <div className="quizAnswer_root">
            {options.map((option, index) => (
              <FormControlLabel
                key={index}
                label={
                  option.image != "" ? (
                    <Image
                      src={configs.PUBLIC_FILES_PATH + "/" + option.image}
                      className="quizAnswer_optionImage"
                      onClick={() => {
                        onPopUp(option.image);
                      }}
                    />
                  ) : (
                    option.text
                  )
                }
                className={
                  !option.image
                    ? "quizAnswer_answerContainer"
                    : "quizAnswer_whenImageContainer"
                }
                control={
                  <Checkbox
                    name={`${name}.${index}`}
                    checked={field.value[index]}
                    color="primary"
                    onChange={field.onChange}
                  />
                }
                {...field}
              />
            ))}
          </div>
        )}
      </Field>
    </>
  );
};

export default QuizAnswer;
