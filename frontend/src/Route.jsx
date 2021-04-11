import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./views/Login/Login";

const Routes = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Redirect from="/" to="login" />
    </Switch>
  );
};

export default Routes;
