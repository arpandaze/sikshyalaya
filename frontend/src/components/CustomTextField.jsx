import React, { useState, useEffect } from "react";
import { Field } from "formik";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import "./statics/css/customTextField.css";

const CustomTextField = ({
  name,
  dropdown = false,
  type,
  placeHolder,
  menuItems,
  addStyles,
  ...rest
}) => {
  const isDropdown = dropdown;
  const [option, setOption] = useState("");

  const handleChange = (e) => {
    setOption(e.target.value);
  };

  return !isDropdown ? (
    <>
      <Field name={name} {...rest}>
        {({ field, form: { touched, errors }, meta }) => (
          <div>
            <input
              type={type}
              placeholder={placeHolder}
              className={addStyles}
              {...rest}
              {...field}
            />
            {meta.touched && meta.error && (
              <div className="error">{meta.error}</div>
            )}
          </div>
        )}
      </Field>
    </>
  ) : (
    <>
      <Field name={name}>
        {({ field, form: { touched, errors }, meta }) => (
          <FormControl className={addStyles}>
            <InputLabel id={name}>{placeHolder}</InputLabel>
            <Select
              labelId={name}
              id={name}
              value={option}
              onChange={handleChange}
              {...field}
            >
              {menuItems.map((item, index) => (
                <MenuItem value={item.value}>{item.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Field>
    </>
  );
};

export default CustomTextField;
