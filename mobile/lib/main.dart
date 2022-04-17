import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sikshyalaya/constants.dart';
import 'package:sikshyalaya/routes.dart';
import 'package:sikshyalaya/theme.dart';

import 'global/authentication/auth_bloc.dart';

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
    return MultiBlocProvider(
      providers: [
        BlocProvider<AuthBloc>(create: (context) => AuthBloc()),
      ],
      child: MaterialApp(
        routes: routes,
        home: const SafeArea(
          top: true,
          bottom: true,
          child: AppWrapper(),
        ),
        title: 'Sikshyalaya',
        theme: AppTheme.lightTheme,
        darkTheme: AppTheme.darkTheme,
        initialRoute: '/splash',
      ),
    );
  }
}

class AppWrapper extends StatelessWidget {
  const AppWrapper({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<AuthBloc, AuthState>(
      buildWhen: (prev, next) => prev != next,
      builder: (context, state) {
        switch (state.status) {
          case AuthStatus.anonSession:
            Timer(const Duration(microseconds: 0), () {
              Navigator.pushNamedAndRemoveUntil(
                context,
                "/login",
                (route) => false,
              );
            });
            break;

          case AuthStatus.studentSession:
            Timer(const Duration(microseconds: 0), () {
              Navigator.pushNamedAndRemoveUntil(
                context,
                "/student_dashboard",
                (route) => false,
              );
            });
            break;

          case AuthStatus.teacherSession:
            Timer(const Duration(microseconds: 0), () {
              Navigator.pushNamedAndRemoveUntil(
                context,
                "/teacher_dashboard",
                (route) => false,
              );
            });
            break;

          case AuthStatus.notLoaded:
            context.read<AuthBloc>().add(LoadAuthStatus());
            break;
        }
        return const Text("Loading");
      },
    );
  }
}
