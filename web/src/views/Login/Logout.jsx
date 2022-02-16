import { useEffect } from "react";
import useAPI from "../../utils/useAPI";
import { clear } from "idb-keyval";

const Logout = () => {
  const [logout, logoutComplete] = useAPI({
    endpoint: "/api/v1/auth/logout/",
  });
  useEffect(() => {
    if (logoutComplete) {
      clear()
        .then(() => {
          window.location = "/login";
        })
        .catch(() => {
          window.localStorage.clear();
          window.location = "/login";
        });
    }
  });
  return null;
};

export default Logout;
