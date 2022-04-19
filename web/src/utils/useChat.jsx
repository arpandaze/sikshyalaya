import { useState, useEffect, useContext } from "react";
import useSocket from "./useSocket";
import { UserContext } from "./Contexts/UserContext";

const ChatMessageTypes = {
  MESSAGE_HISTORY: 1,
  PUBLIC_MESSAGE: 2,
  ANON_MESSAGE: 3,
  USER_JOINED: 4,
  USER_LEFT: 5,
  ACTIVE_USER_LIST: 6,
};

const useChat = ({ classmates, classID, user }) => {
  const [classmatesState, setClassmatesState] = useState(null);
  const [classIDState, setClassIDState] = useState(null);

  const [onlineState, setOnlineState] = useState([]);

  const onMessage = (event) => {
    let data = JSON.parse(event.data);
    let history_message = null;
    if (classmatesState) {
      classmates = classmatesState;
    }
    if (classIDState) {
      classID = classIDState;
    }
    if (data.msg_type === ChatMessageTypes.MESSAGE_HISTORY) {
      console.log(data.data);
      if (data.data) {
        history_message = JSON.parse(data.data);
      } else {
        history_message = [];
      }

      history_message = history_message.map((item) => {
        if (item.msg_type === ChatMessageTypes.PUBLIC_MESSAGE) {
          if (parseInt(item.user) !== user.id) {
            return {
              id: item.user,
              name: classmates[parseInt(item.user)].full_name,
              photo: classmates[parseInt(item.user)].profile_image,
              text: item.data,
              sentTime: item.time,
            };
          } else {
            return {
              id: item.user,
              name: user.full_name,
              photo: user.profile_image,
              text: item.data,
              sentTime: item.time,
            };
          }
        } else if (item.msg_type === ChatMessageTypes.ANON_MESSAGE) {
          return {
            id: item.user,
            name: item.user,
            photo: null,
            text: item.data,
            sentTime: item.time,
          };
        }
      });
      history_message = history_message.filter((item) => {
        if (item) {
          return item;
        }
      });
      return { multi: true, data: history_message };
    } else if (data.msg_type === ChatMessageTypes.PUBLIC_MESSAGE) {
      if (parseInt(data.user) !== user.id) {
        let msgInst = {
          id: parseInt(data.user),
          name: classmates[parseInt(data.user)].full_name,
          photo: classmates[parseInt(data.user)].profile_image,
          text: data.data,
          sentTime: data.time,
        };
        return { multi: false, data: msgInst };
      } else {
        let msgInst = {
          id: user.id,
          name: user.full_name,
          photo: user.profile_image,
          text: data.data,
          sentTime: data.time,
        };
        return { multi: false, data: msgInst };
      }
    } else if (data.msg_type === ChatMessageTypes.ANON_MESSAGE) {
      let msgInst = {
        id: 0,
        name: data.user,
        photo: null,
        text: data.data,
        sentTime: data.time,
      };
      return { multi: false, data: msgInst };
    } else if (data.msg_type === ChatMessageTypes.ACTIVE_USER_LIST) {
      if (data.data) {
        setOnlineState(JSON.parse(data.data));
      }
    } else if (data.msg_type === ChatMessageTypes.USER_JOINED) {
      setOnlineState([...onlineState, parseInt(data.user)]);
    } else if (data.msg_type === ChatMessageTypes.USER_LEFT) {
      let onlineList = onlineState;
      let index = onlineList.indexOf(data.user);
      onlineList.splice(index, 1);
      setOnlineState([...onlineList]);
    }
  };

  const onConnect = (event) => {
    event.currentTarget.send(JSON.stringify({ msg_type: 1 }));
  };

  const [websocket, history, setEndpointState] = useSocket({
    onMessage: onMessage,
    onConnect: onConnect,
    fire:
      ((classIDState || classID) && (classmatesState || classmates)) != null,
  });

  useEffect(() => {
    if (classIDState) {
      setEndpointState(`/api/v1/class_session/ws/${classIDState}/`);
    }
  });

  const sendMessage = ({ message, anon }) => {
    websocket.send(JSON.stringify({ message: message, anon: anon }));
  };

  return [
    history,
    sendMessage,
    setClassmatesState,
    setClassIDState,
    onlineState,
    classmatesState,
  ];
};
export default useChat;
