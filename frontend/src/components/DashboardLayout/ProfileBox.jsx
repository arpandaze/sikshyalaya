import React, { useContext, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Image from "../Image";
import { StylesProvider } from "@material-ui/core/styles";
import "./statics/css/profileBox.css";
import defaultProfile from "../../assets/default-profile.svg";
import { UserContext } from "../../utils/Contexts/UserContext";
import configs from "../../utils/configs";
import { useHistory } from "react-router";

var end = ["st", "nd", "rd", "th", "th"];

const ProfileBox = () => {
  const history = useHistory();
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
      let year = Math.ceil(user.group ? user.group.sem / 2 : 0);
      let department = null;
      try {
        department = user.group.program.name;
      } catch (e) {}
      const formattedData = {
        name: user.full_name,
        department: department,
        year: year ? String(year) + end[year - 1] : "NaN",
        semester: user.group ? (user.group.sem % 2 === 1 ? "I" : "II") : "NaN",
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
        onClick={() => {
          history.push({
            pathname: "/profile",
          });
        }}
      >
        <Grid item sm={5} className="profileBox_imageSide">
          <div className="profileBox_profileImage">
            <Image
              src={
                userState.image
                  ? `${configs.PUBLIC_FILES_PATH}/${userState.image}`
                  : defaultProfile
              }
              alt={
                userState.image
                  ? `${configs.PUBLIC_FILES_PATH}/${userState.image}`
                  : defaultProfile
              }
              addStyles="profileBox_image"
            />
          </div>
        </Grid>
        <Grid item sm={7} className="profileBox_textSide">
          <Grid
            container
            direction="column"
            justify="center"
            className="profileBox_textBoxTop"
          >
            <Grid item className="profileBox_textBox1">
              <p className="profileBox_profileText">{userState.name}</p>
            </Grid>
            <Grid item className="profileBox_textBox3">
              {userState.department ? (
                <p className="profileBox_departmentText">
                  {userState.department}
                  <br />
                  {userState.year} Year /{userState.semester} Semester
                </p>
              ) : (
                <p className="profileBox_departmentText">Admin Panel</p>
              )}
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid item sm={1} className="profileBox_buttonContainer">
          <Tooltip title="Logout" disableHoverListener={false} placement="top">
            <Link to="/logout">
              <FancyButton color={colorscheme.red1} />
            </Link>
          </Tooltip>
        </Grid> */}
      </Grid>
    </StylesProvider>
  );
};

export default ProfileBox;
