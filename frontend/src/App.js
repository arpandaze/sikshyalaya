import React, { useEffect, useState, useMemo, useCallback } from "react";
import Routes from "./Route";
import "./App.css";
import { UserContext } from "./utils/UserContext";
import { get, set } from "idb-keyval";

function App() {
    const [user, setUser] = useState(null);

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
