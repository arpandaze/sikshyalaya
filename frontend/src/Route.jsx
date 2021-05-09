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
      <Route path="/adminForm" component={AdminForm} />
      <Route path="/admin/student" component={StudentView} />
      <Route path="/admin/group" component={GroupView} />
      <Route path="/admin/program" component={ProgramView} />
      <Route path="/admin/department" component={DepartmentView} />
      <Route path="/admin/school" component={SchoolView} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/reset" component={ResetPassword} />

      <Redirect exact from="/" to="landing" />
    </Switch>
  );
};

export default Routes;
