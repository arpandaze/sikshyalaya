import React, { useEffect, useState, useMemo, useCallback } from "react";
import Routes from "./Route";
import "./App.css";
import { UserContext } from "./utils/Contexts/UserContext";
import { CacheContext } from "./utils/Contexts/CacheContext";
import { get, set } from "idb-keyval";

function App() {
  const [user, setUser_s] = useState({
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
        if (value) {
          setUser_s(value);
        }
      })
      .catch(() => {
        setUser_s(JSON.parse(window.localStorage.getItem("user")));
      });
  }, []);

  return (
    <UserContext.Provider value={user_context_value}>
      <Routes />
    </UserContext.Provider>
  );
}
export default App;
