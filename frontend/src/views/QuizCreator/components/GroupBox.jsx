import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Field } from "formik";
import { ImCross } from "react-icons/im";
import colorscheme from "../../../utils/colors";

const GroupBox = ({ name, groupList, quizInfo }) => {
  return (
    <Field name={name}>
      {({ field, form: { setFieldValue } }) => (
        <Grid container direction="column" alignItems="center" justfiy="center">
          <Grid item>
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
            >
              <Grid item>
                <Autocomplete
                  {...field}
                  multiple
                  id={name}
                  options={groupList}
                  getOptionLabel={(option) => option.name}
                  onChange={(option, value) => {
                    setFieldValue(name, value);
                    console.log(value);
                    groupList.filter((opt) => opt.course !== value[0].course);
                    console.log(groupList);
                  }}
                  style={{ width: 400 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name={name}
                      variant="outlined"
                      label="Group"
                      placeholder="Add Group"
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Field>
  );
};

export default GroupBox;
