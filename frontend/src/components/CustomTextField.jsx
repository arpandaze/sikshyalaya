import React, { useState } from "react";
import { Field } from "formik";
import MenuItem from "@material-ui/core/MenuItem";
import { TextField } from "@material-ui/core";
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
          <div className="customField_root">
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
      <Field name={name} {...rest}>
        {({ field, form, meta }) => (
          <div className="customField_root">
            <TextField
              label={placeHolder}
              name={name}
              select
              placeholder={placeHolder}
              fullWidth
              InputLabelProps={{ shrink: true }}
              {...rest}
              {...field}
            >
              <MenuItem key={""} value={""}>
                None
              </MenuItem>
              {menuItems &&
                menuItems.length != 0 &&
                menuItems.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    {item.name}
                  </MenuItem>
                ))}
            </TextField>
            {meta.touched && meta.error && (
              <div className="error">{meta.error}</div>
            )}
          </div>
        )}
      </Field>
    </>
  );
};

export default CustomTextField;
