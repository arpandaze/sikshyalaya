import React, { useState, useEffect, useContext, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import colorscheme from "../../utils/colors";
import Image from "../Image";
import { UserContext } from "../../utils/Contexts/UserContext";
import "./statics/css/online.css";
import configs from "../../utils/configs";
import MiniProfile from "./MiniProfile";

const Online = ({
  id,
  username,
  src,
  program,
  semester,
  year,
  online,
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
      <Grid item className="online_miniProfile">
        <MiniProfile
          id={id}
          username={username}
          src={src}
          year={year}
          semester={semester}
          online={online}
          program={program}
          className="online_miniprofileinner"
        />
      </Grid>
    </Grid>
  );
};

export default Online;
