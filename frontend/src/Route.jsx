import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./views/Login/Login";
import Dashboard from "./views/Dashboard/Dashboard";
import Notes from "./views/Notes/Notes";
import Landing from "./views/Landing/Landing";
import Quiz from "./views/Quiz/Quiz";
import Profile from "./views/Profile/Profile";
import TeacherDashboard from "./views/TeacherDashboard/TeacherDashboard";
import AdminDashboard from "./views/AdminDashboard/AdminDashboard";
import SchoolView from "./views/AdminDashboard/SchoolView";
import DepartmentView from "./views/AdminDashboard/DepartmentView";
import ProgramView from "./views/AdminDashboard/ProgramView";
import GroupView from "./views/AdminDashboard/GroupView";

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
      <Route path="/admin/group" component={GroupView} />
      <Route path="/admin/program" component={ProgramView} />
      <Route path="/admin/department" component={DepartmentView} />
      <Route path="/admin/school" component={SchoolView} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/adminForm" component={AdminForm} />

      <Redirect exact from="/" to="landing" />
    </Switch>
  );
};

export default Routes;
