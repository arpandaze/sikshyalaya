import React, { useEffect, useState } from "react";
import Routes from "./Route";
import "./App.css";
import { UserContext } from "./utils/UserContext";
import { get, set } from "idb-keyval";

function App() {
    const [user, setUser] = useState(null);
    useEffect(() => {
        get("user")
            .then((value) => {
                if (value) {
                    setUser(value);
                }
            })
            .catch();
    });
    return (
        <UserContext.Provider value={{ user, setUser }}>
            <Routes />
        </UserContext.Provider>
    );
}
export default App;
