import 'package:flutter/widgets.dart';
import 'package:sikshyalaya/screens/Dashboard/student_dashboard.dart';
import 'package:sikshyalaya/screens/Login/login_screen.dart';
import 'package:sikshyalaya/screens/Student/student_wrapper.dart';
import 'package:sikshyalaya/screens/Welcome/welcome_screen.dart';
import 'package:flutter/material.dart';

const Widget startingPage = WelcomeScreen();

const backendBase =
    "http://sikshyalaya.centralindia.cloudapp.azure.com:8080/api/v1";
const fileServerBase =
    "http://sikshyalaya.centralindia.cloudapp.azure.com:8081";
const wsBase =
    "ws://sikshyalaya.centralindia.cloudapp.azure.com:8080/api/v1/class_session/ws";

enum AuthStatus {
  studentSession,
  teacherSession,
  anonSession,
  notLoaded,
}

enum UserTypes { student, teacher }
