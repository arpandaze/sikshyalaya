import React, { Component, Fragment, useEffect, useState } from "react";
import { Route, Link } from "react-router-dom";
import Button from "./common/button";

const loginBoxStyle = {
  fontFamily: "Segoe UI",
  backgroundColor: "#f14b4b",
  color: "#ffffff",
  fontSize: "1.2em",
};

const LoginBox = () => {
  return (
    <div className="login_box">
      <Button name="Login" colorClass="login_button" />
      <Button name="Continue" colorClass="guest_button" />
    </div>
  );
};

export default LoginBox;
