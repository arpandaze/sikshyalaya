import React, { useState, useContext, useEffect, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import "./statics/css/discussionBox.css";
import colorscheme from "../../../utils/colors";
import { BiSend } from "react-icons/bi";
import Message from "./Message";
import Image from "../../../components/Image";
import { UserContext } from "../../../utils/Contexts/UserContext";
import { WebsocketContext } from "../../../utils/Contexts/WebsocketContext";
import defaultProfile from "../../../assets/default-profile.svg";
import callAPI from "../../../utils/API";
import useAPI from "../../../utils/useAPI";
import useSocket from "../../../utils/useSocket";
import useChat from "../../../utils/useChat";
import configs from "../../../utils/configs";
import { SettingsInputAntennaTwoTone } from "@material-ui/icons";
import Switch from "@material-ui/core/Switch";

const ChatMessageTypes = {
  MESSAGE_HISTORY: 1,
  PUBLIC_MESSAGE: 2,
  ANON_MESSAGE: 3,
  USER_JOINED: 4,
  USER_LEFT: 5,
  ACTIVE_USER_LIST: 6,
};

const DiscussionBox = ({ classID }) => {
  const { user } = useContext(UserContext);
  const { chatHistory, sendMessage, setClassmatesState, setClassIDState } =
    useContext(WebsocketContext);

  const [checked, setChecked] = useState(false);
  const [chat, setChat] = useState([]);
  const [activeUser, setActiveUser] = useState([]);
  const [message, setMessage] = useState("");
  const [listenReady, setListenReady] = useState(false);

  const classmateFormatter = (req) => {
    let classmatesObj = {};
    req.data.student.map((item) => {
      classmatesObj[item.id] = {
        full_name: item.full_name,
        profile_image: item.profile_image,
      };
    });
    setClassmatesState([1, 2, 3]);
    return classmatesObj;
  };

  const [classmates, classmatesComplete] = useAPI(
    {
      endpoint: `/api/v1/group/${user.group.id}/student/`,
      fire: user.group.id,
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
    if (classID) {
      setClassIDState(classID);
    }
  });

  //const ws = useRef(null);
  //const { websocket, setWebsocket } = useContext(WebsocketContext);

  //const onMessage = (event) => {
  //let data = JSON.parse(event.data);
  //let history_message = null;
  //if (data.msg_type === ChatMessageTypes.MESSAGE_HISTORY) {
  //history_message = JSON.parse(data.data);

  //history_message = history_message.map((item) => {
  //if (item.msg_type === ChatMessageTypes.PUBLIC_MESSAGE) {
  //return {
  //id: item.user,
  //name: classmates[parseInt(item.user)].full_name,
  //photo: classmates[parseInt(item.user)].profile_image,
  //text: item.data,
  //sentTime: item.time,
  //};
  //} else if (item.msg_type === ChatMessageTypes.ANON_MESSAGE) {
  //return {
  //id: item.user,
  //name: item.user,
  //photo: null,
  //text: item.data,
  //sentTime: item.time,
  //};
  //}
  //});
  //history_message = history_message.filter((item) => {
  //if (item) {
  //return item;
  //}
  //});
  //return { multi: true, data: history_message };
  //} else if (data.msg_type === ChatMessageTypes.PUBLIC_MESSAGE) {
  //let msgInst = {
  //id: parseInt(data.user),
  //name: classmates[parseInt(data.user)].full_name,
  //photo: classmates[parseInt(data.user)].profile_image,
  //text: data.data,
  //sentTime: data.time,
  //};
  //return { multi: false, data: msgInst };
  //} else if (data.msg_type === ChatMessageTypes.ANON_MESSAGE) {
  //let msgInst = {
  //id: 0,
  //name: data.user,
  //photo: null,
  //text: data.data,
  //sentTime: data.time,
  //};
  //return { multi: false, data: msgInst };
  //} else if (data.msg_type === ChatMessageTypes.ACTIVE_USER_LIST) {
  //console.log(data.data);
  ////setActiveUser([...chat, data.data]);
  //}
  //};

  //const onConnect = (event) => {
  //event.currentTarget.send(JSON.stringify({ msg_type: 1 }));
  //};

  //const [websocket, history, setEndpointState] = useSocket({
  //endpoint: "/api/v1/class_session/ws/" + classID + "/",
  //onMessage: onMessage,
  //onConnect: onConnect,
  //fire: classID && classmatesComplete,
  //});

  //useEffect(() => {
  //if (classID) {
  //if (websocket) {
  //websocket.close();
  //}
  //let ws = new WebSocket(
  //`${configs.WEBSOCKET_HOST}/api/v1/class_session/ws/${classID}/`
  //);
  //setWebsocket(ws);
  //ws.onopen = () => {
  //setListenReady(true);
  //};
  //}
  //}, [classID]);

  //useEffect(() => {
  //if (websocket) {
  //if (websocket.readyState) {
  //const data = JSON.stringify({ msg_type: 1 });
  //websocket.send(data);
  //}
  //}
  //}, [listenReady]);

  //}, [
  //chat.length,
  //JSON.stringify(activeUser),
  //classmatesComplete,
  //listenReady,
  //]);

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
                  <Grid item xs={11} className="discussionBox_textFieldRoot">
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
                  <Grid
                    item
                    xs={1}
                    className="discussionBox_sendButtonContainer"
                  >
                    <button
                      type="submit"
                      name="submit"
                      style={{
                        border: "none",
                        backgroundColor: colorscheme.white,
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
                  </Grid>
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
