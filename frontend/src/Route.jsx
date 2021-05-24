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
import Signup from "./views/Login/Signup";
import PrivateRoute from "./components/PrivateRoute";
import Verify from "./views/Login/Verify";
import Logout from "./views/Login/Logout";
import QuizCreator from "./views/QuizCreator/QuizCreator";
import Ed from "./components/Quill";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/quiz" component={Quiz} />
      <PrivateRoute exact path="/note" component={Notes} />
      <PrivateRoute exact path="/landing" component={Landing} />
      <PrivateRoute exact path="/profile" component={Profile} />
      <PrivateRoute
        exact
        path="/teacherdashboard"
        component={TeacherDashboard}
      />
      <PrivateRoute exact path="/adminForm" component={AdminForm} />
      <PrivateRoute exact path="/admin" component={AdminDashboard} />
      <PrivateRoute exact path="/admin/school" component={SchoolView} />
      <PrivateRoute exact path="/admin/department" component={DepartmentView} />
      <PrivateRoute exact path="/admin/program" component={ProgramView} />
      <PrivateRoute exact path="/admin/group" component={GroupView} />
      <PrivateRoute exact path="/admin/student" component={StudentView} />
      <Route exact path="/reset" component={ResetPassword} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/verify" component={Verify} />
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/test" component={Ed} />
      <Route exact path="/quiz-creator" component={QuizCreator} />
      <Redirect exact from="/" to="landing" />
    </Switch>
  );
};

export default Routes;
