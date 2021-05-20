import React, { useEffect, useState, useMemo, useCallback } from "react";
import Routes from "./Route";
import "./App.css";
import { UserContext } from "./utils/Contexts/UserContext";
import { CacheContext } from "./utils/Contexts/CacheContext";
import { get, set } from "idb-keyval";

function App() {
    const [user, setUser_s] = useState(null);
    const [cache, setCache_s] = useState(null);

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
