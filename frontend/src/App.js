import React, { useEffect, useState, useMemo, useCallback } from "react";
import Routes from "./Route";
import "./App.css";
import { UserContext } from "./utils/UserContext";
import { get, set } from "idb-keyval";

function App() {
    const [user, setUser_s] = useState(null);

    const setUser = (value) => {
        set("user", value).catch(() => {
            throw "Couldn't set user to IndexDB!";
        });
        setUser_s(value);
    };

    useEffect(() => {
        console.log("writing changes to index db");
        console.log(user);
        get("user")
            .then((value) => {
                if (value) {
                    setUser(value);
                }
            })
            .catch();
    }, [JSON.stringify(user)]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <Routes />
        </UserContext.Provider>
    );
}
export default App;
