import React, { useState, useEffect } from "react";
import colorscheme from "../utils/colors";
import Grid from "@material-ui/core/Grid";
import Image from "./Image";
import FancyButton from "./FancyButton";
import { Link } from "react-router-dom";
import { StylesProvider } from "@material-ui/core/styles";
import "./statics/css/profileBox.css";
import profile from "../assets/pp.jpg";

const ProfileBox = ({ user, ...rest }) => {
  const currentUser = user[0];

  return (
    <StylesProvider injectFirst>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className="profileBox_root"
      >
        <Grid item sm={5} xl={5} className="profileBox_imageSide">
          <div className="profileBox_profileImage">
            <Image
              src={currentUser.image}
              alt={currentUser.image}
              addStyles="profileBox_image"
            />
          </div>
        </Grid>
        <Grid item sm={7} xl={7} className="profileBox_textSide">
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="flex-start"
          >
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Grid xs={9} item className="profileBox_textBox1">
                <p className="profileBox_profileText">{currentUser.name}</p>
              </Grid>
              <Grid xs={2} item className="profileBox_buttonContainer">
                <Link to="/profile">
                  <FancyButton color={colorscheme.yellow} />
                </Link>
              </Grid>
            </Grid>
            <Grid item className="profileBox_textBox3">
              <p className="profileBox_departmentText">
                {currentUser.department}
                <br />
                {currentUser.year} Year / 
                {currentUser.semester} Semester
              </p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </StylesProvider>
  );
};

export default ProfileBox;
