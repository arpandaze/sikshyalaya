import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Image from "../../../components/Image";
import Checkbox from "@material-ui/core/Checkbox";
import "./statics/css/students.css";
import { Formik, Form } from "formik";
import { ImCross } from "react-icons/im";

const Student = ({ id, username, src, idSet, userIdArray, doneClicked }) => {
  const [checked, setChecked] = useState(false);
  const onChangeHandler = (e) => {
    setChecked(e.target.checked);
    if (e.target.checked) {
      idSet([...userIdArray, id]);
    } else {
      idSet(userIdArray.filter((item) => item != id));
    }
  };
  useEffect(() => {
    if (doneClicked != 0) {
      setChecked(false);
    }
  }, [doneClicked]);

  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="center"
      className="student_root"
    >
      <Grid item className="student_ImageRoot">
        <Image src={src} addStyles="student_Image" />
      </Grid>
      <Grid item className="student_nameContainer">
        <p className="student_name">{username}</p>
      </Grid>

      <Grid item className="student_check">
        <Checkbox
          id={id}
          name="isPresent"
          label=""
          className="student_randomCheckBox"
          onChange={onChangeHandler}
          checked={checked}
        />
      </Grid>
    </Grid>
  );
};

export default Student;
