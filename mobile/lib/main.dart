import 'package:flutter/material.dart';
import 'package:sikshyalaya/screens/Welcome/welcome_screen.dart';
import 'package:sikshyalaya/screens/Student/student_wrapper.dart';
import 'package:sikshyalaya/theme.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  void initState() {
    super.initState();
    currentTheme.addListener(() {
      setState(() {});
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: const SafeArea(top: true, bottom: true, child: Student()),
      title: 'Sikshyalaya',
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
    );
  }
}
