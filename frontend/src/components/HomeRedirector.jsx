import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../utils/Contexts/UserContext";
import configs from "../utils/configs";
const HomeRedirector = () => {
  const { user } = useContext(UserContext);
  const userType = user.user_type;

  return (
    <>
      {!userType ? (
        <Redirect exact from="/" to="login" />
      ) : userType === configs.USER_TYPES.ADMIN ? (
        <Redirect exact from="/" to="admin" />
      ) : userType === configs.USER_TYPES.TEACHER ? (
        <Redirect exact from="/" to="teacher-landing" />
      ) : (
        <Redirect exact from="/" to="landing" />
      )}
    </>
  );
};

export default HomeRedirector;
