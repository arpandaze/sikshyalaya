import React from "react";
import Grid from "@material-ui/core/Grid";
import Image from "../Image";
import "./statics/css/miniProfile.css";

const MiniProfile = ({ id, username, src, year, semester, program }) => {
  return (
    <Grid container direction="row" className="mini_root" alignItems="center">
      <Grid item className="mini_imageRoot">
        <Image src={src} addStyles="mini_image" />
      </Grid>
      <Grid item className="mini_nameContainer">
        <Grid container direction="column">
          <p className="mini_nameText">{username}</p>
          <p className="mini_nameText">
            {year} Year {semester} Semester
          </p>
          <p className="mini_nameText">{program}</p>
        </Grid>
      </Grid>
      <Grid item></Grid>
    </Grid>
  );
};

export default MiniProfile;
