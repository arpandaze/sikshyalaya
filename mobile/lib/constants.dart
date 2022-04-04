import 'package:flutter/widgets.dart';
import 'package:sikshyalaya/screens/Dashboard/student_dashboard.dart';
import 'package:sikshyalaya/screens/Login/login_screen.dart';
import 'package:sikshyalaya/screens/Student/student_wrapper.dart';
import 'package:sikshyalaya/screens/Welcome/welcome_screen.dart';
import 'package:flutter/material.dart';

const Widget startingPage = WelcomeScreen();

const backendBase = "http://192.168.1.66:8080/api/v1";

enum AuthStatus {
  studentSession,
  teacherSession,
  anonSession,
}

enum UserTypes { student, teacher }
