import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import colorscheme from "../utils/colors";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Image from "./Image";
import profile from "../assets/pp.jpg";
import Button from "./Button";
import { BsArrowRightShort } from "react-icons/bs";
import { Link } from "react-router-dom";

const styleSheet = {
  root: { flexGrow: "1" },
  container: {
    margin: "0px auto",
    width: "85%",
    height: "200px",
    maxHeight: "200px",
    borderRadius: "25px",
    background: colorscheme.white,
    boxShadow: "2px 2px 10px -3px rgba(0,0,0,0.2)",
  },
  image: {
    borderRadius: "50%",
  },
  imageSide: {
    height: "100%",
    position: "relative",
  },
  textSide: {
    position: "relative",
  },
  profileImage: {
    width: "80%",
    position: "relative",
    top: "30px",
    left: "15px",
  },
  profileText: {
    fontSize: "1.3em",
    fontWeight: "bold",
  },
  textBox1: {
    width: "85%",
    position: "relative",
    top: "10px",
  },
  textBox3: {
    width: "85%",
    position: "absolute",
    bottom: "10px",
  },
  departmentText: {
    fontWeight: "400",
    fontSize: "1.2em",
    color: colorscheme.red4,
  },
  buttonContainer: {
    width: "40px",
    height: "40px",
    position: "absolute",
    top: "10px",
    right: "15px",
  },
  profileButton: {
    width: "40px",
    height: "40px",
    backgroundColor: colorscheme.yellow2,
    borderRadius: "50%",
  },
  profileButtonIcon: {
    width: "40px",
    height: "40px",
    position: "absolute",
  },
};
const ProfileBox = ({ user, ...rest }) => {
  return (
    <div style={styleSheet.root}>
      <Grid
        container
        direction="row"
        justify="center"
        style={styleSheet.container}
      >
        <Grid item xs={5} style={styleSheet.imageSide}>
          <div style={styleSheet.profileImage}>
            <Image
              src={user[0].image}
              alt={user[0].image}
              addStyles={styleSheet.image}
            />
          </div>
        </Grid>
        <Grid item xs={7} style={styleSheet.textSide}>
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
              <Grid xs={9} item style={styleSheet.textBox1}>
                <a style={styleSheet.profileText}>{user[0].name}</a>
              </Grid>
              <Grid xs={2} item style={styleSheet.buttonContainer}>
                <Link to="/profile">
                  <BsArrowRightShort
                    size={40}
                    color={colorscheme.yellow}
                    style={styleSheet.profileButtonIcon}
                  />
                  <Button colorStyles={styleSheet.profileButton}></Button>
                </Link>
              </Grid>
            </Grid>
            <Grid item style={styleSheet.textBox3}>
              <a style={styleSheet.departmentText}>
                {user[0].department}
                <br />
                {user[0].year} Year / 
                {user[0].semester} Semester
              </a>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfileBox;
