import React, { useContext, useEffect, useState } from "react";
import colorscheme from "../utils/colors";
import Grid from "@material-ui/core/Grid";
import Image from "./Image";
import FancyButton from "./FancyButton";
import { Link } from "react-router-dom";
import { StylesProvider } from "@material-ui/core/styles";
import "./statics/css/profileBox.css";
import defaultProfile from "../assets/default-profile.svg";
import { UserContext } from "../utils/Contexts/UserContext";
import { Tooltip } from "@material-ui/core";

var end = ["st", "nd", "rd", "th", "th"];

const ProfileBox = () => {
  const { user } = useContext(UserContext);
  const [userState, setUserState] = useState({
    name: null,
    program: null,
    year: null,
    semester: null,
    image: null,
  });
  useEffect(() => {
    try {
      let year = Math.floor(user.group.sem / 2);
      const formattedData = {
        name: user.full_name,
        department: null,
        year: String(year) + end[year - 1],
        semester: user.group.sem % 2 == 1 ? "I" : "II",
        image: user.profile_image,
      };
      setUserState(formattedData);
    } catch (e) {}
  }, [JSON.stringify(user)]);
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
              src={userState.image ? userState.image : defaultProfile}
              alt={userState.image ? userState.image : defaultProfile}
              addStyles="profileBox_image"
            />
          </div>
        </Grid>
        <Grid item sm={7} xl={7} className="profileBox_textSide">
          <Grid container direction="column" justify="center">
            <Grid item className="profileBox_textBoxTop">
              <Grid container direction="row">
                <Grid item className="profileBox_textBox1">
                  <p className="profileBox_profileText">{userState.name}</p>
                </Grid>
                <Grid item className="profileBox_buttonContainer">
                  <Link to="/profile">
                    <FancyButton color={colorscheme.yellow} />
                  </Link>
                </Grid>
              </Grid>
            </Grid>
            <Grid item className="profileBox_textBox3">
              <p className="profileBox_departmentText">
                {userState.department}
                <br />
                {userState.year} Year / 
                {userState.semester} Semester
              </p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </StylesProvider>
  );
};

export default ProfileBox;
