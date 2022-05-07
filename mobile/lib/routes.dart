import 'package:sikshyalaya/screens/Assignment/student_assignment_screen.dart';
import 'package:sikshyalaya/screens/Dashboard/student_dashboard.dart';
import 'package:sikshyalaya/screens/Login/TwoFALogin.dart';
import 'package:sikshyalaya/screens/Login/login_screen.dart';
import 'package:sikshyalaya/screens/Login/reset_password.dart';
import 'package:sikshyalaya/screens/Quiz/student_quiz.dart';
import 'package:sikshyalaya/screens/Signup/components/personal_information.dart';
import 'package:sikshyalaya/screens/Signup/signup_screen.dart';
import 'package:sikshyalaya/screens/Teacher-Dashboard/teacher-dashboard.dart';
import 'package:sikshyalaya/screens/Teacher-Quiz/teacher_quiz.dart';
import 'package:sikshyalaya/screens/Welcome/splash.dart';
import 'package:sikshyalaya/screens/Welcome/welcome_screen.dart';

/* class Route{ */
/*   static MaterialPageRoute welcomeScreen = MaterialPageRoute(builder: (context) => const WelcomeScreen()); */
/*   static MaterialPageRoute loginScreen = MaterialPageRoute(builder: (context) => const LoginScreen()); */
/*   static MaterialPageRoute studentDashboard = MaterialPageRoute(builder: (context) => const Student()); */
/*   static MaterialPageRoute signupScreen = MaterialPageRoute(builder: (context) => const SignupScreen()); */
/* } */

final routes = {
  '/splash': (context) => const SplashScreen(),
  '/welcome': (context) => const WelcomeScreen(),
  '/login': (context) => const LoginScreen(),
  '/signup': (context) => const SignupScreen(),
  '/forgot': (context) => const ResetPassword(),
  '/reset': (context) => const WelcomeScreen(),
  '/student_dashboard': (context) => const StudentDashboard(),
  '/teacher_dashboard': (context) => const TeacherDashboard(),
  '/quiz': (context) => const StudentQuiz(),
  '/tquiz': (context) => const TeacherQuiz(),
  '/student_assignment': (context) => const AssignmentScreen(),
};
