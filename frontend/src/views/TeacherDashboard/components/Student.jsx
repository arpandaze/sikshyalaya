import React, { useState, useEffect, useContext, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Image from "../../../components/Image";
import Checkbox from "../../../components/Checkbox";
import "./statics/css/students.css";
import { Formik, Form } from "formik";

const Student = ({ id, username, src, program, semester, year, ...rest }) => {
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
      <Formik
        initialValues={{
          isPresent: false,
        }}
      >
        <Form>
          <Grid item className="student_check">
            <Checkbox
              id="is_present"
              name="isPresent"
              label=""
              className="student_randomCheckBox"
            />
          </Grid>
        </Form>
      </Formik>
    </Grid>
  );
};

export default Student;
