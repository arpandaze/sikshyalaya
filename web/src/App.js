import React, { useEffect, useState, useMemo } from "react";
import Routes from "./Routes";
import "./App.css";
import { UserContext } from "./utils/Contexts/UserContext";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { WebsocketContext } from "./utils/Contexts/WebsocketContext";
import { AlertContext } from "./components/DashboardLayout/AlertContext";
import { get, set } from "idb-keyval";
import useChat from "./utils/useChat";
import colorscheme from "./utils/colors";

const colorTheme = createMuiTheme({
  palette: {
    primary: {
      main: colorscheme.red4,
    },
    secondary: {
      main: colorscheme.purple2,
    },
  },
});

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
        course: {
          course_code: null,
          course_credit: null,
          course_name: null,
          department_id: null,
          id: null,
        },
      },
    ],
    contact_number: null,
    dob: null,
    join_year: null,
  });
  // const [websocket, setWebsocket] = useState(null);

  const [alert, setAlert] = useState(null);

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

  const alert_context_value = useMemo(
    () => ({ alert, setAlert }),
    [alert, setAlert]
  );

  const [
    chatHistory,
    sendMessage,
    setClassmatesState,
    setClassIDState,
    onlineState,
    classmatesState,
  ] = useChat({ user: user });

  const websocket_context_value = useMemo(
    () => ({
      chatHistory,
      sendMessage,
      setClassmatesState,
      setClassIDState,
      onlineState,
      classmatesState,
    }),
    [
      chatHistory,
      sendMessage,
      setClassmatesState,
      setClassIDState,
      onlineState,
      classmatesState,
    ]
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
        <MuiThemeProvider theme={colorTheme}>
          <AlertContext.Provider value={alert_context_value}>
            <Routes />
          </AlertContext.Provider>
        </MuiThemeProvider>
      </WebsocketContext.Provider>
    </UserContext.Provider>
  );
}
export default App;
