import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./views/Login/LoginBox";
import ClassSession from "./views/Dashboard/ClassSession";
import Notes from "./views/Notes/Notes";
import Landing from "./views/Landing/Landing";
import TeacherLanding from "./views/TeacherLanding/TeacherLanding";
import Quiz from "./views/Quiz/Quiz";
import Profile from "./views/Profile/Profile";
import TeacherDashboard from "./views/TeacherDashboard/TeacherDashboard";
import AdminDashboard from "./views/Admin/AdminDashboard";
import SchoolView from "./views/Admin/SchoolView";
import DepartmentView from "./views/Admin/DepartmentView";
import ProgramView from "./views/Admin/ProgramView";
import AdminForm from "./views/Admin/AdminForm";
import CourseView from "./views/Admin/CourseView";
import GroupView from "./views/Admin/GroupView";
import TeacherView from "./views/Admin/TeacherView";
import ResetPassword from "./views/Login/ResetPassword";
import Signup from "./views/Login/Signup";
import StudentRoute from "./components/StudentRoute";
import TeacherRoute from "./components/TeacherRoute";
import AdminRoute from "./components/AdminRoute";
import Verify from "./views/Login/Verify";
import Logout from "./views/Login/Logout";
import QuizCreator from "./views/QuizCreator/QuizCreator";
import QuizCreatorLanding from "./views/QuizCreatorLanding/QuizCreatorLanding";
import NotFound from "./views/404/404";
import ClassSessionCreator from "./views/ClassSessionCreator/ClassSessionCreator";
import HomeRedirector from "./components/HomeRedirector";
import ExploreView from "./views/Admin/ExploreView";
import QuizView from "./views/Quiz/components/QuizView";
import StudentView from "./views/Admin/StudentView";
import TwoFactorLogin from "./components/TwoFactorLogin.jsx";

const Routes = () => {
  return (
    <Switch>
      {/* Student Routes */}
      <StudentRoute exact path="/class/:classID?" component={ClassSession} />
      <StudentRoute exact path="/quiz" component={Quiz} />
      <StudentRoute exact path="/note" component={Notes} />
      <StudentRoute exact path="/landing" component={Landing} />
      <StudentRoute exact path="/profile" component={Profile} />
      <StudentRoute exact path="/quiz/questions" component={QuizView} />
      {/* Teacher Routes */}.{" "}
      <TeacherRoute exact path="/teacher-landing" component={TeacherLanding} />
      <TeacherRoute
        exact
        path="/teacher-dashboard"
        component={TeacherDashboard}
      />
      <TeacherRoute exact path="/quiz-creator" component={QuizCreator} />
      <TeacherRoute
        exact
        path="/quiz-creator-landing"
        component={QuizCreatorLanding}
      />
      <TeacherRoute
        exact
        path="/class-session-create"
        component={ClassSessionCreator}
      />
      <TeacherRoute exact path="/teacher/note" component={Notes} />
      {/*Admin Routes*/}
      <AdminRoute exact path="/adminForm" component={AdminForm} />
      <AdminRoute exact path="/admin" component={AdminDashboard} />
      <AdminRoute exact path="/admin/explore" component={ExploreView} />
      <AdminRoute exact path="/admin/explore/school" component={SchoolView} />
      <AdminRoute
        exact
        path="/admin/explore/department"
        component={DepartmentView}
      />
      <AdminRoute exact path="/admin/explore/Program" component={ProgramView} />
      <AdminRoute exact path="/admin/explore/group" component={GroupView} />
      <AdminRoute exact path="/admin/student" component={StudentView} />
      <AdminRoute exact path="/admin/teacher" component={TeacherView} />
      <AdminRoute exact path="/admin/courses" component={CourseView} />
      {/* Common Routes */}
      <Route exact path="/login" component={Login} />
      <Route exact path="/reset" component={ResetPassword} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/two-fa" component={TwoFactorLogin} />
      <Route exact path="/verify" component={Verify} />
      <Route exact path="/logout" component={Logout} />
      <HomeRedirector />
      <Route exact path="*" component={NotFound} />
    </Switch>
  );
};

export default Routes;
