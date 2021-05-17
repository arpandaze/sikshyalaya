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
            throw "Couldn't set user to IndexDB!";
        });
        setUser_s(value);
    };

    const setCache = (value) => {
        set("cache", value).catch(() => {
            throw "Couldn't set user to IndexDB!";
        });
        setCache_s(value);
    };

    const user_context_value = useMemo(
        () => ({ user, setUser }),
        [user, setUser]
    );
    const cache_context_value = useMemo(
        () => ({ cache, setCache }),
        [cache, setCache]
    );

    useEffect(() => {
        get("user")
            .then((value) => {
                if (value) {
                    setUser(value);
                }
            })
            .catch();

        get("cache")
            .then((value) => {
                if (value) {
                    setCache(value);
                }
            })
            .catch();
    }, [JSON.stringify(user), JSON.stringify(cache)]);

    return (
        <UserContext.Provider value={user_context_value}>
            <CacheContext.Provider value={cache_context_value}>
                <Routes />
            </CacheContext.Provider>
        </UserContext.Provider>
    );
}
export default App;
