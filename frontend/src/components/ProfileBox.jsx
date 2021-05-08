import React from "react";
import colorscheme from "../utils/colors";
import Grid from "@material-ui/core/Grid";
import Image from "./Image";
import FancyButton from "./FancyButton";
import { Link } from "react-router-dom";
import { StylesProvider } from "@material-ui/core/styles";
import "./statics/css/profileBox.css";

const ProfileBox = ({ user, ...rest }) => {
  return (
    <StylesProvider injectFirst>
      <div className="profileBox_root">
        <Grid
          container
          direction="row"
          justify="center"
          className="profileBox_container"
        >
          <Grid item xs={5} className="profileBox_imageSide">
            <div className="profileBox_profileImage">
              <Image
                src={user[0].image}
                alt={user[0].image}
                addStyles="profileBox_image"
              />
            </div>
          </Grid>
          <Grid item xs={7} className="profileBox_textSide">
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
                  <p className="profileBox_profileText">{user[0].name}</p>
                </Grid>
                <Grid xs={2} item className="profileBox_buttonContainer">
                  <Link to="/profile">
                    <FancyButton color={colorscheme.yellow} />
                  </Link>
                </Grid>
              </Grid>
              <Grid item className="profileBox_textBox3">
                <p className="profileBox_departmentText">
                  {user[0].department}
                  <br />
                  {user[0].year} Year / 
                  {user[0].semester} Semester
                </p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </StylesProvider>
  );
};

export default ProfileBox;
