import React, { useState, useContext, useEffect, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import "./statics/css/discussionBox.css";
import colorscheme from "../../../utils/colors";
import Switch from "@material-ui/core/Switch";
import { BiSend } from "react-icons/bi";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Message from "./Message";
import Image from "../../../components/Image";
import { UserContext } from "../../../utils/Contexts/UserContext";
import defaultProfile from "../../../assets/default-profile.svg";
import configs from "../../../utils/configs.jsx";

const DiscussionBox = ({ classID }) => {
  const { user } = useContext(UserContext);
  const ws = useRef(null);

  useEffect(() => {
    if (classID) {
      ws.current = new WebSocket(
        `${configs.WEBSOCKET_HOST}/api/v1/class_session/ws/${classID}/`
      );
      ws.current.onmessage = (event) => {
        console.log(event);
      };
    }
  }, [classID]);

  const [checked, setChecked] = useState(false);
  const [chat, setChat] = useState([
    {
      id: 1,
      name: "Rushab",
      photo: defaultProfile,
      text: "Hello",
      sentTime: "2021",
    },
    {
      id: 2,
      name: "Arpan",
      photo: defaultProfile,
      text: "Hi",
      sentTime: "2020",
    },
  ]);
  const [message, setMessage] = useState("");
  const discussionFormatter = () => {
    let data = {
      id: user.id,
      name: !checked ? user.full_name : "Anonymous",
      photo: checked
        ? defaultProfile
        : user.profile_image === null
        ? defaultProfile
        : user.profile_image,
      text: message,
      sentTime: "2022",
    };
    return data;
  };
  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  const handleSubmit = () => {
    if (message !== "") {
      const data = discussionFormatter();
      setChat([...chat, data]);
      setMessage("");
    }
  };

  return (
    <>
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="center"
        className="discussionBox_root"
      >
        <Grid item className="discussionBox_chatBox">
          <Grid
            container
            direction="row"
            alignItems="flex-start"
            justify="flex-start"
          >
            <Grid item className="discussionBox_messageRoot">
              <Message messages={chat} />
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
            <Grid item xs={9} className="discussionBox_textFieldRoot">
              <input
                name="chat_input"
                type="text"
                value={message}
                onChange={handleChange}
                placeholder="Enter your message..."
                className="discussionBox_textField"
              />
            </Grid>
            <Grid item xs={1} className="discussionBox_sendButtonContainer">
              <button
                type="submit"
                name="submit"
                style={{
                  border: "none",
                  backgroundColor: colorscheme.white,
                }}
                onClick={handleSubmit}
              >
                <BiSend
                  size={30}
                  color={colorscheme.green3}
                  className="discussionBox_sendButton"
                />
              </button>
            </Grid>

            <Grid item xs={2} className="discussionBox_switchContainer">
              <p className="discussionBox_label">Send Anonymously</p>
              <Switch
                name="isAnonymus"
                checked={checked}
                onChange={() => {
                  setChecked(!checked);
                }}
                className="discussionBox_switch"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default DiscussionBox;
