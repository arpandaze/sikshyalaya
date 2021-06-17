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
  value,
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
            <TextField
              error={meta.touched && meta.error ? true : false}
              id={name}
              type={type}
              margin="normal"
              label={placeHolder}
              value={value}
              variant="outlined"
              className={addStyles}
              {...rest}
              {...field}
              helperText={meta.touched && meta.error}
            />
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
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              {...rest}
              {...field}
              variant="outlined"
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
