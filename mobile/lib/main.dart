import 'package:flutter/material.dart';
import 'package:sikshyalaya/screens/Welcome/welcome_screen.dart';
import 'package:sikshyalaya/screens/Student/student_wrapper.dart';
import 'package:sikshyalaya/theme.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'global/route/route_bloc.dart';

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
    return BlocProvider(
      create: (context) => RouteBloc(),
      child: BlocBuilder<RouteBloc, RouteState>(
        buildWhen: (prev, next) => prev != next,
        builder: (context, state) {
          return MaterialApp(
            /* home: SafeArea(top: true, bottom: true, child: state.page), */
            home: const SafeArea(top: true, bottom: true, child: Student()),
            title: 'Sikshyalaya',
            theme: AppTheme.lightTheme,
            darkTheme: AppTheme.darkTheme,
          );
        },
      ),
    );
  }
}
