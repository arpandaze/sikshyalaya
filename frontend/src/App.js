import React, { useEffect, useState, useMemo } from "react";
import Routes from "./Route";
import "./App.css";
import { UserContext } from "./utils/Contexts/UserContext";
import { get, set } from "idb-keyval";

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
    contact_number: null,
    dob: null,
    join_year: null,
  });

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
      <Routes />
    </UserContext.Provider>
  );
}
export default App;
