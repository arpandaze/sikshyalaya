import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./views/Login/LoginBox";
import Dashboard from "./views/Dashboard/Dashboard";
import Notes from "./views/Notes/Notes";
import Landing from "./views/Landing/Landing";
import Quiz from "./views/Quiz/Quiz";
import Profile from "./views/Profile/Profile";
import TeacherDashboard from "./views/TeacherDashboard/TeacherDashboard";
import AdminDashboard from "./views/Admin/AdminDashboard";
import SchoolView from "./views/Admin/SchoolView";
import DepartmentView from "./views/Admin/DepartmentView";
import ProgramView from "./views/Admin/ProgramView";
import GroupView from "./views/Admin/GroupView";
import AdminForm from "./views/Admin/AdminForm";
import StudentView from "./views/Admin/StudentView";
import ResetPassword from "./views/Login/ResetPassword";
import ForgotPassword from "./views/Login/ForgotPassword";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/quiz" component={Quiz} />
      <Route exact path="/note" component={Notes} />
      <Route exact path="/landing" component={Landing} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/teacherdashboard" component={TeacherDashboard} />
      <Route exact path="/adminForm" component={AdminForm} />
      <Route exact path="/admin" component={AdminDashboard} />
      <Route exact path="/admin/school" component={SchoolView} />
      <Route exact path="/admin/department" component={DepartmentView} />
      <Route exact path="/admin/program" component={ProgramView} />
      <Route exact path="/admin/group" component={GroupView} />
      <Route exact path="/admin/student" component={StudentView} />
      <Route exact path="/reset" component={ResetPassword} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <Redirect exact from="/" to="landing" />
    </Switch>
  );
};

export default Routes;
