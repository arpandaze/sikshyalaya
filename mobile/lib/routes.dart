import 'package:flutter/material.dart';
import 'package:sikshyalaya/screens/Login/login_screen.dart';
import 'package:sikshyalaya/screens/Signup/signup_screen.dart';
import 'package:sikshyalaya/screens/Student/student_wrapper.dart';
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
  '/forgot': (context) => const WelcomeScreen(),
  '/reset': (context) => const WelcomeScreen(),
  '/student_dashboard': (context) => const Student(),
};
