import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./views/Login/Login";
import Dashboard from "./views/Dashboard/Dashboard";

const Routes = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Redirect from="/" to="dashboard" />
    </Switch>
  );
};

export default Routes;
