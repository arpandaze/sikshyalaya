import React, { useState, useEffect, useContext, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Image from "../Image";
import { Formik, Form } from "formik";
import CustomTextField from "../../components/Checkbox";
import "./statics/css/online.css";

const Online = ({
  id,
  username,
  src,
  program,
  semester,
  year,
  online,
  miniProfile,
  size,
  ...rest
}) => {
  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="center"
      className="online_root"
    >
      <Grid item className="online_ImageRoot">
        <div className="online_greenDot" hidden={!online}></div>
        <Image src={src} addStyles="online_Image" />
      </Grid>
      <Grid item className="online_nameContainer">
        <p className="online_name">{username}</p>
      </Grid>
      {/* {miniProfile ? (
        <Grid item className="online_miniProfile">
          <MiniProfile
            id={id}
            username={username}
            src={src}
            year={year}
            semester={semester}
            program={program}
            className="online_miniprofileinner"
          />
        </Grid>
      ) : (
        <Formik
          initialValues={{
            isPresent: false,
          }}
        >
          <Form>
            <Grid item className="online_check">
              <Checkbox
                id="is_present"
                name="isPresent"
                label=""
                className="online_randomCheckBox"
              />
            </Grid>
          </Form>
        </Formik>
      )} */}
    </Grid>
  );
};

export default Online;
