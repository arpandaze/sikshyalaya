import React, { useState } from "react";
import { Field } from "formik";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { BiTimeFive } from "react-icons/bi";
import { formatISO } from "date-fns";

const DatePicker = ({ id, label, ...rest }) => {
  return (
    <Field name={id} {...rest}>
      {({ field, form: { setFieldValue } }) => (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            {...field}
            id={id}
            margin="normal"
            label={label}
            inputVariant="outlined"
            format="MM/dd/yyyy"
            value={field.value}
            onChange={(value) => setFieldValue(id, value)}
            KeyboardButtonProps={{
              "aria-label": "change time",
            }}
            InputLabelProps={{ shrink: true }}
            {...rest}
          />
        </MuiPickersUtilsProvider>
      )}
    </Field>
  );
};

const DateTimePicker = ({ id, label, ...rest }) => {
  return (
    <Field name={id} {...rest}>
      {({ field, form: { setFieldValue } }) => (
        <>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDateTimePicker
              {...field}
              margin="normal"
              id={id}
              label={label}
              minutesStep={5}
              inputVariant="outlined"
              value={!field.value ? new Date() : field.value}
              onChange={(value) => setFieldValue(id, value)}
              KeyboardButtonProps={{
                "aria-label": "change time",
              }}
              keyboardIcon={<BiTimeFive />}
              {...rest}
            />
          </MuiPickersUtilsProvider>
        </>
      )}
    </Field>
  );
};

const TimePicker = ({ id, label, ...rest }) => {
  return (
    <Field name={id} {...rest}>
      {({ field, form: { setFieldValue } }) => (
        <>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
              {...field}
              margin="normal"
              id={id}
              label={label}
              minutesStep={5}
              inputVariant="outlined"
              value={field.value}
              onChange={(value) => setFieldValue(id, value)}
              KeyboardButtonProps={{
                "aria-label": "change time",
              }}
              keyboardIcon={<BiTimeFive />}
              {...rest}
            />
          </MuiPickersUtilsProvider>
        </>
      )}
    </Field>
  );
};
export { DatePicker, DateTimePicker, TimePicker };
