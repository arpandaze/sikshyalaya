import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./views/Login/Login";
import Dashboard from "./views/Dashboard/Dashboard";
import Notes from "./views/Notes/Notes";
import Quiz from "./views/Quiz/Quiz";
import Landing from "./views/Landing/Landing";

const Routes = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/quiz" component={Quiz} />
      <Route path="/note" component={Notes} />
      <Route path="/landing" component={Landing} />
      <Redirect from="/" to="landing" />
    </Switch>
  );
};

export default Routes;
