import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Field } from "formik";

const GroupBox = ({ name, groupList, quizInfo }) => {
  const [newOption, setNewOption] = useState([]);
  const handleDisable = (value) => {
    if (value && value.length) {
      let filtered = groupList.filter(
        (item) => value[0].course !== item.course
      );
      setNewOption(filtered);
    } else {
      setNewOption([]);
    }
  };

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
                  getOptionLabel={(option) => {
                    return option.name;
                  }}
                  getOptionDisabled={(option) => newOption.includes(option)}
                  onChange={(e, value) => {
                    setFieldValue(name, value);
                    handleDisable(value);
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
