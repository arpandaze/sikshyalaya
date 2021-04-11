import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import logo from "./logo.svg";
import LoginBox from "./components/LoginBox";
import "./App.css";
import theme from "./components/common/colors";

function App() {
  return (
    <div id="container">
      <LoginBox />
    </div>
  );
}
export default App;
