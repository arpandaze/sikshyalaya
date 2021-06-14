import React, { useEffect, useState, useMemo } from "react";
import Routes from "./Route";
import "./App.css";
import { UserContext } from "./utils/Contexts/UserContext";
import { WebsocketContext } from "./utils/Contexts/WebsocketContext";
import { get, set } from "idb-keyval";
import useChat from "./utils/useChat";

function App() {
  const [user, setUser_s] = useState({
    default_data: true,
    id: null,
    email: null,
    profile_image: null,
    full_name: null,
    address: null,
    group: {
      id: null,
      sem: null,
      program: { name: null, department_id: null, id: null },
      course: [
        {
          course_code: null,
          course_name: null,
          course_credit: null,
          department_id: null,
          id: null,
        },
      ],
    },
    teacher_group: [
      {
        group: {
          program: {
            name: null,
          },
        },
        sem: null,
      },
    ],
    contact_number: null,
    dob: null,
    join_year: null,
  });
  const [websocket, setWebsocket] = useState(null);

  const setUser = (value) => {
    set("user", value).catch(() => {
      window.localStorage.setItem("user", JSON.stringify(value));
    });
    setUser_s(value);
  };

  const user_context_value = useMemo(
    () => ({ user, setUser }),
    [user, setUser]
  );

  const [chatHistory, sendMessage, setClassmatesState, setClassIDState] =
    useChat({});

  const websocket_context_value = useMemo(
    () => ({ chatHistory, sendMessage, setClassmatesState, setClassIDState }),
    [chatHistory, sendMessage, setClassmatesState, setClassIDState]
  );

  useEffect(() => {
    get("user")
      .then((value) => {
        setUser_s(value || null);
      })
      .catch(() => {
        setUser_s(JSON.parse(window.localStorage.getItem("user") || null));
      });
  }, []);

  return (
    <UserContext.Provider value={user_context_value}>
      <WebsocketContext.Provider value={websocket_context_value}>
        <Routes />
      </WebsocketContext.Provider>
    </UserContext.Provider>
  );
}
export default App;
