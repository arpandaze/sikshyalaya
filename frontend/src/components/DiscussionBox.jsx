import React, { useState, useContext, useEffect, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import "./statics/css/discussionBox.css";
import colorscheme from "../utils/colors";
import { BiSend } from "react-icons/bi";
import Message from "./Message";
import Image from "./Image";
import { UserContext } from "../utils/Contexts/UserContext";
import { WebsocketContext } from "../utils/Contexts/WebsocketContext";
import defaultProfile from "../assets/default-profile.svg";
import callAPI from "../utils/API";
import useAPI from "../utils/useAPI";
import useSocket from "../utils/useSocket";
import useChat from "../utils/useChat";
import configs from "../utils/configs";
import Switch from "@material-ui/core/Switch";

const ChatMessageTypes = {
  MESSAGE_HISTORY: 1,
  PUBLIC_MESSAGE: 2,
  ANON_MESSAGE: 3,
  USER_JOINED: 4,
  USER_LEFT: 5,
  ACTIVE_USER_LIST: 6,
};

const DiscussionBox = ({ classDetails }) => {
  const { user } = useContext(UserContext);
  const { chatHistory, sendMessage, setClassmatesState, setClassIDState } =
    useContext(WebsocketContext);

  const [checked, setChecked] = useState(false);
  const [message, setMessage] = useState("");

  const classmateFormatter = (req) => {
    let classmatesObj = {};
    req.data.student.map((item) => {
      classmatesObj[item.id] = {
        full_name: item.full_name,
        profile_image: item.profile_image,
      };
    });
    classDetails.teachers.map((teacher) => {
      classmatesObj[teacher.id] = {
        full_name: teacher.full_name,
        profile_image: teacher.profile_image,
      };
    });
    return classmatesObj;
  };

  const [classmates, classmatesComplete] = useAPI(
    {
      endpoint: `/api/v1/group/${classDetails.groupID}/student/`,
      fire: classDetails.groupID,
    },
    classmateFormatter,
    null
  );

  const focusTextField = useRef(null);
  const focusField = () => {
    focusTextField.current.focus();
  };

  useEffect(() => {
    if (classmatesComplete) {
      setClassmatesState(classmates);
    }
    if (classDetails.classID) {
      setClassIDState(classDetails.classID);
    }
  });

  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  const handleSubmit = () => {
    if (message !== "") {
      sendMessage({ message: message, anon: checked });
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };

  return (
    <Grid item className="discussionBox_root">
      <Grid
        container
        direction="column"
        className="discussionBox_discussionBoxInside"
      >
        <Grid item>
          <Grid
            container
            direction="row"
            alignItems="center"
            className="discussionBox_discussionBoxTop"
            wrap="nowrap"
          >
            <Grid item>
              <div className="discussionBox_smallBlueBox"></div>
            </Grid>
            <Grid item xs={6}>
              <h1 className="discussionBox_discussionBoxTitle">Discussion</h1>
            </Grid>

            <Grid item xs={5}>
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="center"
              >
                <Grid item>
                  <Switch
                    name="isAnonymus"
                    checked={checked}
                    color="primary"
                    onChange={() => {
                      setChecked(!checked);
                    }}
                  />
                </Grid>
                <Grid>
                  <p
                    style={{
                      margin: "0px",
                      fontSize: "0.8em",
                      color: colorscheme.grey1,
                      fontWeight: "bold",
                    }}
                  >
                    Send Anonymously
                  </p>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid
          container
          direction="column"
          alignItems="center"
          className="discussionBox_discussionBoxBottom"
        >
          <Grid item>
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
              className="discussionBox_discussionBoxContainer"
            >
              <Grid item className="discussionBox_chatBox">
                <Grid
                  container
                  direction="row"
                  alignItems="flex-start"
                  justify="flex-start"
                >
                  <Grid item className="discussionBox_messageRoot">
                    <Message messages={chatHistory} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={11} className="discussionBox_inputField">
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justify="flex-start"
                >
                  <Grid item className="discussionBox_textFieldRoot">
                    <input
                      name="chat_input"
                      type="text"
                      value={message}
                      ref={focusTextField}
                      onChange={handleChange}
                      placeholder="Enter your message..."
                      className="discussionBox_textField"
                      autoComplete="off"
                      onKeyDown={handleKeyPress}
                    />
                  </Grid>
                  {/* <Grid item className="discussionBox_sendButtonContainer">
                    <button
                      type="submit"
                      name="submit"
                      style={{
                        border: "none",
                        background: "transparent",
                      }}
                      onClick={() => {
                        handleSubmit();
                        focusField();
                      }}
                    >
                      <BiSend
                        size={30}
                        color={colorscheme.green3}
                        className="discussionBox_sendButton"
                      />
                    </button>
                  </Grid> */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DiscussionBox;
