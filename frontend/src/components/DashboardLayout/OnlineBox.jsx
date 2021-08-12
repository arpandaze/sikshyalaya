import React, { useContext, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import "./statics/css/onlineBox.css";
import Online from "./Online";
import { WebsocketContext } from "../../utils/Contexts/WebsocketContext";
import { UserContext } from "../../utils/Contexts/UserContext";
import configs from "../../utils/configs";
import defaultProfile from "../../assets/default-profile.svg";

var end = ["st", "nd", "rd", "th", "th"];
const OnlineBox = ({ miniProfile = true, ...rest }) => {
  const {
    chatHistory,
    sendMessage,
    setClassmatesState,
    setClassIDState,
    onlineState,
    classmatesState,
  } = useContext(WebsocketContext);

  const { user } = useContext(UserContext);

  const [classmates, setClassmates] = useState([]);
  useEffect(() => {
    if (classmatesState) {
      let year = Math.ceil(user.group ? user.group.sem / 2 : 0);
      let cmates = Object.keys(classmatesState).map((item) => {
        return {
          id: item,
          name: classmatesState[item].full_name,
          online:
            item == user.id
              ? true
              : onlineState.includes(parseInt(item))
              ? true
              : false,
          image: classmatesState[item].profile_image
            ? `${configs.PUBLIC_FILES_PATH}/${classmatesState[item].profile_image}`
            : defaultProfile,
          program: user.group.program.name,
          year: year ? String(year) + end[year - 1] : "NaN",
          semester: user.group
            ? user.group.sem % 2 === 1
              ? "I"
              : "II"
            : "NaN",
        };
      });
      setClassmates(cmates);
    }
  }, [classmatesState, JSON.stringify(onlineState)]);
  return (
    <Grid container direction="column" className="onlineBox_root">
      <Grid item className="onlineBox_titleBar">
        <Grid container direction="row" alignItems="center">
          <div className="onlineBox_greenDot"></div>
          <p className="onlineBox_courseTextTitle">Online Users</p>
        </Grid>
      </Grid>
      <Grid item className="onlineBox_userlistContainerOuter">
        <Grid
          container
          direction="column"
          className="onlineBox_userlistContainer"
        >
          {classmates.map((user) => (
            <Grid item className="onlineBox_userList">
              <Online
                id={user.id}
                username={user.name}
                src={user.image}
                year={user.year}
                online={user.online}
                semester={user.semester}
                program={user.program}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OnlineBox;
