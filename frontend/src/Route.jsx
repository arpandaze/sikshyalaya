import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./views/Login/Login";
import Dashboard from "./views/Dashboard/Dashboard";
import Notes from "./views/Notes/Notes";
import Landing from "./views/Landing/Landing";
import Quiz from "./views/Quiz/Quiz";
import Profile from "./views/Profile/Profile";
import TeacherDashboard from "./views/TeacherDashboard/TeacherDashboard";

const Routes = () => {
  return (
		<Switch>
			<Route path="/login" component={Login} />
			<Route path="/dashboard" component={Dashboard} />
			<Route path="/quiz" component={Quiz} />
			<Route path="/note" component={Notes} />
			<Route path="/landing" component={Landing} />
			<Route path="/profile" component={Profile} />
			<Route path="/teacherdashboard" component={TeacherDashboard} />

			<Redirect exact from="/" to="landing" />
		</Switch>
  );
};

export default Routes;
