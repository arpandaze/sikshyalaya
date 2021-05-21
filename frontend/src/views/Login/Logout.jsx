import { useEffect } from "react";
import { useAPI } from "../../utils/useAPI";
import { clear } from "idb-keyval";

const Logout = () => {
    const [logout, logoutComplete] = useAPI({
        endpoint: "/api/v1/auth/logout",
    });
    useEffect(() => {
        console.log(logoutComplete);
        if (logoutComplete) {
            clear()
                .then(() => {
                    window.location = "/login";
                })
                .catch(() => {
                    window.localStorage.clear();
                });
        }
    });
    return null;
};

export default Logout;
