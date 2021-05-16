import React from "react";
import { Field } from "formik";
import "./statics/css/customTextField.css";

const CustomTextField = ({ name, type, placeHolder, addStyles, ...rest }) => {
  return (
    <Field name={name}>
      {({ field, form: { touched, errors }, meta }) => (
        <div>
          <input
            type={type}
            placeholder={placeHolder}
            className={addStyles}
            {...field}
          />
          {meta.touched && meta.error && (
            <div className="error">{meta.error}</div>
          )}
        </div>
      )}
    </Field>
  );
};

export default CustomTextField;
