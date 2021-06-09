import React, { useState, useEffect, useContext, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import "./statics/css/discussionBox.css";
import colorscheme from "../../../utils/colors";
import Image from "../../../components/Image";
import { UserContext } from "../../../utils/Contexts/UserContext";
import "./statics/css/message.css";
import configs from "../../../utils/configs";
import defaultProfile from "../../../assets/default-profile.svg";

const Message = ({ messages }) => {
  const [hovered, setHovered] = useState(false);
  const { user } = useContext(UserContext);
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="flex-start"
      className="message_root"
    >
      <Grid item>
        {messages &&
          messages.length !== 0 &&
          messages.map((msg, index) => (
            <>
              <Grid item>
                <p className="message_name">{msg.name}</p>
              </Grid>
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="flex-start"
              >
                <Grid item className="message_ImageRoot">
                  <Image
                    src={
                      msg.photo
                        ? `${configs.PUBLIC_FILES_PATH}/${msg.photo}`
                        : defaultProfile
                    }
                    addStyles="message_Image"
                  />
                </Grid>
                <Grid item>
                  <Grid container direction="row" wrap="nowrap">
                    <Grid
                      item
                      className="message_Content"
                      style={{
                        backgroundColor:
                          user.id == msg.id
                            ? colorscheme.red41
                            : colorscheme.purple2,
                      }}
                      onMouseEnter={() => {
                        setHovered(true);
                      }}
                      onMouseLeave={() => {
                        setHovered(false);
                      }}
                    >
                      <span style={{ color: colorscheme.white }}>
                        {msg.text}
                      </span>
                      <div ref={messagesEndRef} />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  style={
                    !hovered
                      ? {
                          display: "none",
                        }
                      : {
                          display: "block",
                        }
                  }
                >
                  <p className="message_time">{msg.sentTime}</p>
                </Grid>
              </Grid>
            </>
          ))}
      </Grid>
    </Grid>
  );
};

export default Message;
