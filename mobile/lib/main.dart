import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sikshyalaya/constants.dart';
import 'package:sikshyalaya/routes.dart';
import 'package:sikshyalaya/screens/Welcome/welcome_screen.dart';
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
        home: SafeArea(
          top: true,
          bottom: true,
          child: appWrapper(context),
        ),
        title: 'Sikshyalaya',
        theme: AppTheme.lightTheme,
        darkTheme: AppTheme.darkTheme,
        initialRoute: '/welcome',
      ),
    );
  }

  Widget appWrapper(BuildContext context) {
    return BlocListener<AuthBloc, AuthState>(
      listener: (context, state) {
        switch (state.status) {
          case AuthStatus.anonSession:
            Navigator.pushNamedAndRemoveUntil(
              context,
              "/login",
              (route) => false,
            );
            break;

          case AuthStatus.studentSession:
            Navigator.pushNamedAndRemoveUntil(
              context,
              "/student_dashboard",
              (route) => false,
            );
            break;

          case AuthStatus.teacherSession:
            Navigator.pushNamedAndRemoveUntil(
              context,
              "/student_dashboard",
              (route) => false,
            );
            break;
        }
      },
      child: const WelcomeScreen(),
    );
  }
}
